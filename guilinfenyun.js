// 生成桂林风云的epub-作为初版-便于参考
const Epub = require("epub-gen");
const {JSDOM} = require("jsdom");
const {guilinfenyun_list} = require('./conf');
const util = require('util');
const sleep = util.promisify(setTimeout);

let option = {
    title: "桂林风云", // *Required, title of the book.
    author: "项天鹰", // *Required, name of the author.
    publisher: "我的电脑", // optional
    cover: "./cover/guilin.jpg",
    content: []
};

async function main() {
    const url_list = [];
    // 1. list页面获取每个页面的url
    const list_page = await JSDOM.fromURL(guilinfenyun_list[0], {pretendToBeVisual: true});
    const list_document = list_page.window.document;
    const aritcleList = list_document.querySelectorAll('.album__list-item.js_album_item');
    for (let index = 0; index < aritcleList.length; index++) {
        url_list.push(aritcleList[index].dataset.link);
    }
    // 页面动态加载list， 第11条无法通过jsdom获取
    url_list.push('http://mp.weixin.qq.com/s?__biz=MzAwMDU0NzkzMg==&mid=2458542271&idx=3&sn=e41c480cfc02b80f7d997045ed5e9390&chksm=8d998d8cbaee049a8a3a4bbba1fe579f539ab46091dcfca84c231b5b558e90fd0c705826bfee#rd');

    // 2. 顺序解每个页面 获取到html
    for (let idx = 0; idx < url_list.length; idx++) {
        const page_url = url_list[idx];
        const detail_page = await JSDOM.fromURL(page_url);
        const detail_document = detail_page.window.document;
        const articleWrapper = detail_document.querySelector(".rich_media_content.js_underline_content");

        // 多余信息, 暂时移除
        const userless_section = articleWrapper.querySelectorAll('section, img, p[style~="white-space: normal;"]');
        for (let idx = 0; idx < userless_section.length; idx++) {
            userless_section[idx].remove();
        }
        const htmlStr = (articleWrapper.innerHTML || '') .replace(/data-src/g, 'src')

        option.content.push({
            title: `第${idx + 1}节`,
            data: htmlStr
        });

        console.log(`sleep await ${idx + 1}`);
        await sleep(1000);
    }

    // 3. 生成epub文件(暂时不支持其中的图片)
    new Epub(option, `./output/桂林风云.epub`);
}

main();
