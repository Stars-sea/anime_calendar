# 📺 Anime Calendar

使用 [Wails](https://github.com/wailsapp/wails) 构建的新番提醒程序  
~~(此项目作为自己学习新语言的练习项目, 可能多少有不足, 谅解)~~

React 控件库: [Ant Design](https://ant.design/)

CSS 框架: [Tailwind CSS](https://www.tailwindcss.cn/)

使用的 API: [Bangumi API](https://github.com/bangumi/api)  
API 文档: <https://bangumi.github.io/api/>

应用程序图标来自 [@Lusiro - iconfont](https://www.iconfont.cn/user/detail?uid=46101&nid=f13abJwF2nW9)

## Develop

关于 Wails 的使用, 参考[这个](https://wails.io/zh-Hans/docs/gettingstarted/installation/)

使用以下命令开始上手开发:

```bash
$ git clone https://github.com/Stars-sea/anime_calendar.git
$ cd anime_calendar
$ go mod tidy

$ cd frontend
$ npm i
```

---

关于 Golang 与前端之间的代码同步, 可以使用 wails 命令行运行

```bash
$ wails generate module
$ wails dev
```

## LICENCE

程序依照 MIT 协议开源
