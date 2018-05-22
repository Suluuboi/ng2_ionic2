import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RedditProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// @Injectable()
// export class RedditResponse {
//   constructor(public data: number,
//               public subdata: string,
//               public children: string,
//               public likes: number) {
//   }
// }

@Injectable()
export class RedditProvider {
  settings: any;
  loading: boolean = false;
  posts: Array<any> = [];
  subreddit: string ='gifs';
  page: number = 1;
  perPage: number = 15;
  after: string;
  stopIndex: number;
  sort: string = 'hot';
  moreCount: number = 0;

  constructor(public http: HttpClient) {
    console.log('Hello RedditProvider Provider');
  }

  resetPosts():void{
    this.page=1;
    this.posts=[];
    this.after=null;
    this.fetchData();
  }

  nextPage():void{
    this.page++;
    this.fetchData();
  }

  fetchData():void {
    let url= 'https://www.reddit.com/r/'+ this.subreddit + '/'+this.sort+'/.json?limit='+this.perPage;
    if(this.after){
      url+='&after='+this.after;
    }
    this.loading=true;
    this.http.get(url)
    .subscribe(data=>{
      this.posts = this.posts.concat(data['data']['children']);
      //console.log(this.posts.length);
      //console.log(this.posts);
      let stopIndex = this.posts.length;

      for(let i=this.posts.length-1; i>=stopIndex;i--){
        let post = this.posts[i];
        post.showLoader = false;
        post.alreadyLoaded = false;

        if(post.data.thumbnail = 'nsfw'){
          this.posts[i].data.thumbnail = 'images/nsfw.png';
        }

        if(post.data.url.indexOf('.gifv')>-1||post.data.url.indexOf('.webm')>-1){
          this.posts[i].data.url = post.data.url.replace('.gifv','.mp4');
          this.posts[i].data.url = post.data.url.replace('.webm','.mp4');

          if (typeof(post.data.preview) != "undefined"){
            this.posts[i].data.snapshot = post.data.preview.images[0].source.url.replace(/&amp;/g, '&') ;
            if(this.posts[i].data.snapshot == "undifined"){
              this.posts[i].data.snapshot = "";
            }
          }
          else {
            this.posts[i].data.snapshot = "";
          }
        }
        else {
          this.posts.splice(i,1);
        }
        post.data.url = post.data.secure_media.reddit_video.scrubber_media_url;
      }

      if(data['data']['children'].length === 0|| this.moreCount>20){
        this.moreCount = 0;
        this.loading =false;
      }
      else{
        this.after = this.posts[this.posts.length-1].data.name;
        if (this.posts.length<this.perPage*this.page){
          this.fetchData();
          this.moreCount++;
        }
        else{
          this.loading =false;
          this.moreCount =0;
        }
      }
    },(err)=>{
      console.log("subreddit doesn't exist!");
    }
  );
  }
}
