// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CoreAppProvider } from '../../../providers/app';
import { CoreFileProvider } from '../../../providers/file';
import { CoreLoggerProvider } from '../../../providers/logger';
import { CoreInitDelegate } from '../../../providers/init';
import { CoreSitesProvider } from '../../../providers/sites';
import { CoreDomUtilsProvider } from '../../../providers/utils/dom';
import { CoreUtilsProvider } from '../../../providers/utils/utils';
import { CoreSharedFilesProvider } from './sharedfiles';
import { CoreFileUploaderProvider } from '../../fileuploader/providers/fileuploader';

/**
 * Helper service to share files with the app.
 */
@Injectable()
export class CoreSharedFilesHelperProvider {
    protected logger;

    constructor(logger: CoreLoggerProvider, private alertCtrl: AlertController, private translate: TranslateService,
            private utils: CoreUtilsProvider, private sitesProvider: CoreSitesProvider, private modalCtrl: ModalController,
            private fileUploaderProvider: CoreFileUploaderProvider, private initDelegate: CoreInitDelegate,
            private sharedFilesProvider: CoreSharedFilesProvider, private domUtils: CoreDomUtilsProvider,
            private fileProvider: CoreFileProvider, private appProvider: CoreAppProvider) {
        this.logger = logger.getInstance('CoreSharedFilesHelperProvider');
    }

    /**
     * Ask a user if he wants to replace a file (using originalName) or rename it (using newName).
     *
     * @param {string} originalName Original name.
     * @param {string} newName New name.
     * @return {Promise<string>} Promise resolved with the name to use when the user chooses. Rejected if user cancels.
     */
    askRenameReplace(originalName: string, newName: string) : Promise<string> {
        const deferred = this.utils.promiseDefer(),
            alert = this.alertCtrl.create({
                title: this.translate.instant('core.sharedfiles.sharedfiles'),
                message: this.translate.instant('core.sharedfiles.chooseactionrepeatedfile', {$a: newName}),
                buttons: [
                    {
                        text: this.translate.instant('core.sharedfiles.rename'),
                        handler: () => {
                            deferred.resolve(newName);
                        }
                    },
                    {
                        text: this.translate.instant('core.sharedfiles.replace'),
                        handler: () => {
                            deferred.resolve(originalName);
                        }
                    }
                ]
            });

        alert.present();
        return deferred.promise;
    }

    /**
     * Go to the choose site view.
     *
     * @param {string} filePath File path to send to the view.
     */
    goToChooseSite(filePath: string) : void {
        let navCtrl = this.appProvider.getRootNavController();
        navCtrl.push('CoreSharedFilesChooseSitePage', {filePath: filePath});
    }

    /**
     * Open the view to select a shared file.
     *
     * @param  {string[]} [mimetypes] List of supported mimetypes. If undefined, all mimetypes supported.
     * @return {Promise<any>} Promise resolved when a file is picked, rejected if file picker is closed without selecting a file.
     */
    pickSharedFile(mimetypes?: string[]) : Promise<any> {
        return new Promise((resolve, reject) => {
            let modal = this.modalCtrl.create('CoreSharedFilesListPage', {mimetypes: mimetypes, isModal: true, pick: true});
            modal.present();

            modal.onDidDismiss((file: any) => {
                if (!file) {
                    // User cancelled.
                    reject();
                    return;
                }

                const error = this.fileUploaderProvider.isInvalidMimetype(mimetypes, file.fullPath);
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        path: file.fullPath,
                        treated: false
                    });
                }
            })
        });
    }

    /**
     * Checks if there is a new file received in iOS and move it to the shared folder of current site.
     * If more than one site is found, the user will have to choose the site where to store it in.
     * If more than one file is found, treat only the first one.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    searchIOSNewSharedFiles() : Promise<any> {
        return this.initDelegate.ready().then(() => {
            let navCtrl = this.appProvider.getRootNavController();
            if (navCtrl && navCtrl.getActive().id == 'CoreSharedFilesChooseSite') {
                // We're already treating a shared file. Abort.
                return Promise.reject(null);
            }

            return this.sharedFilesProvider.checkIOSNewFiles().then((fileEntry) => {
                return this.sitesProvider.getSitesIds().then((siteIds) => {
                    if (!siteIds.length) {
                        // No sites stored, show error and delete the file.
                        this.domUtils.showErrorModal('core.sharedfiles.errorreceivefilenosites', true);
                        return this.sharedFilesProvider.deleteInboxFile(fileEntry);
                    } else if (siteIds.length == 1) {
                        return this.storeSharedFileInSite(fileEntry, siteIds[0]);
                    } else {
                        this.goToChooseSite(fileEntry.fullPath);
                    }
                });
            });
        });
    }

    /**
     * Store a shared file in a site's shared files folder.
     *
     * @param {any} fileEntry Shared file entry.
     * @param {string} [siteId]  Site ID. If not defined, current site.
     * @return {Promise<any>} Promise resolved when done.
     */
    storeSharedFileInSite(fileEntry: any, siteId?: string) : Promise<any> {
        siteId = siteId || this.sitesProvider.getCurrentSiteId();

        // First of all check if there's already a file with the same name in the shared files folder.
        const sharedFilesDirPath = this.sharedFilesProvider.getSiteSharedFilesDirPath(siteId);
        return this.fileProvider.getUniqueNameInFolder(sharedFilesDirPath, fileEntry.name).then((newName) => {
            if (newName == fileEntry.name) {
                // No file with the same name. Use the original file name.
                return newName;
            } else {
                // Repeated name. Ask the user what he wants to do.
                return this.askRenameReplace(fileEntry.name, newName);
            }
        }).then((name) => {
            return this.sharedFilesProvider.storeFileInSite(fileEntry, name, siteId).catch(function(err) {
                this.domUtils.showErrorModal(err || 'Error moving file.');
            }).finally(() => {
                this.sharedFilesProvider.deleteInboxFile(fileEntry);
                this.domUtils.showAlertTranslated('core.success', 'core.sharedfiles.successstorefile');
            });
        });
    }
}
