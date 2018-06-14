# MyDemo

## 公共就业服务网

## 项目部署

1. 命令: ng build -d (服务器域名)/dist/ --prod ( http://localhost为项目部署的服务器域名)；
2. 打包成功后，将dist目录下的文件拷贝到public/dist目录，另外需要把assets文件夹放到public目录下；
3. 由于img的src 和 background的url 中路径的问题，需要将 dist 目录下的文件中background的url属性值中包含的dist/去掉；( url(/dist/  => url(/ )
4. 还需要修改laravel中resource/views/hom.blade.php文件中css、js的引入文件名。
