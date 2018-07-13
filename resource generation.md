 Ionic3.x设置启动页与图标

由于手机有很多不同的尺寸与版本，所以图标尺寸也是大小不一，但是如果手动每一个尺寸都制作一个图标，那估计美工会吐血吧，不过幸好，ionic只需要一个图标就可以制作不同尺寸的图标。

　　添加一个ionic项目，进入cli添加一个ionic platform add ios 或 ionic platform add android，ionic会默认给项目添加一个resources的文件夹，里面包含icon(图标)和splash(启动页)。

　　第一步：把resources下的icon和splash换成当前APP的icon和splash，然后把resources下的android或ios文件夹删除。

　　第二部：在cli中，执行ionic resources，会自动生成当前图片对应的icon和splash不同大小的图标和启动夜。

　　　　　　如果就想生成图标或启动页的话，可以执行ionic cordova resources  --icon  或 ionic resources --splash，就可以单独生成图标或启动页。

　　注意：图标的名称必须按照ionic生成的名称，icon或 splash

　　　　　icon图标的大小尽量为1024*1024，并且不能为圆角。

　　　　　splash图片的大小尽量为2732*2732 
