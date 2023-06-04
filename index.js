const Epub = require("epub-gen");
const {JSDOM} = require("jsdom");
const args = process.argv;
const [, , type] = args;

let option = {
    title: "张岱同人作品集", // *Required, title of the book.
    author: "xibobo", // *Required, name of the author.
    publisher: "我的电脑", // optional
    cover: "./cover/cover.jpg",
    content: [
        {
            title: "About the author", // Optional
            author: "John Doe", // Optional
            data: "小说文本HTML" // pass html string
        }
    ]
};


// jsdom测试内容抓取
const test_url = 'https://mp.weixin.qq.com/s?__biz=MzU3Nzg2Njk4MA==&mid=2247483995&idx=1&sn=9091c66d7044c34571bc8a71425954ad&scene=19';
JSDOM.fromURL(test_url, {resources: 'usable'}).then(dom => {
    const document = dom.window.document;
    const articleWrapper = document.querySelector(".rich_media_content.js_underline_content");
    
    const htmlStr = (articleWrapper.innerHTML || '') .replace(/data-src/g, 'src')
    option.content = [{
        title: "第一张", // Optional
        author: "波尔布特", // Optional
        data: htmlStr
    }];

    new Epub(option, `./output/张岱同人.${+new Date()}.epub`);
});

