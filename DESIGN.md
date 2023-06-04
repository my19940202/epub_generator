# 设计文档

## 1. 输入url
> 初步还是先人工整理
1. [张岱同人](https://mp.weixin.qq.com/mp/homepage?__biz=MzU3Nzg2Njk4MA==&hid=1&sn=848ae69ca5401956d2b865f094418aee&scene=18#wechat_redirect)
2. [远在小河对岸](https://mp.weixin.qq.com/s/z3aD-7cxHgti-VyfeHwaww)
3. [桂林风云](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzAwMDU0NzkzMg==&action=getalbum&album_id=1652919484384362504&scene=173&from_msgid=2458542270&from_itemidx=2&count=3&nolastread=1#wechat_redirect)

```javascript
// jsdom无法模拟页面滚动，目前电脑chrome打开页面 然后执行这段代码，手动获取要抓取的页面
const url_list = []
const aritcleList = document.querySelectorAll('.album__list-item.js_album_item');
for (let index = 0; index < aritcleList.length; index++) {
    url_list.push({
        name: aritcleList[index].dataset.title,
        url: aritcleList[index].dataset.link
    });
}
console.log('url_list', url_list);
```

## 2. 串行解析url后的页面
1. jsdom 
```javascript
JSDOM.fromURL("https://example.com/", options).then(dom => {
  console.log(dom.serialize());
});
```

## 3. 构造epub初始化option里面
```json
{
    title: "epub自动生成包测试", // *Required, title of the book.
    author: "席波波", // *Required, name of the author.
    publisher: "我的电脑", // optional
    cover: "./cover/zelda.jpg",
    content: [
        {
            title: "About the author", // Optional
            author: "John Doe", // Optional
            data: "小说文本HTML" // pass html string
        },
        {
            title: "啦啦啦啦啦",
            data: "小说文本HTML"
        }
    ]
}
```
## 4. epub options生成最终电子书

# 参考
1. [git repo](https://github.com/my19940202/epub_generator)
2. [jsdom解析页面-nodejs16](https://github.com/jsdom/jsdom)
3. [epub gen tool](https://github.com/cyrilis/epub-gen)
4. [学习如何使用vscode调试nodejs程序](https://wizardforcel.gitbooks.io/node-in-debugging/content/4.3.html)