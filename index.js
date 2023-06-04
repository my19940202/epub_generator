// 想把多本同人文打包到一起来阅读
const Epub = require("epub-gen");
const {JSDOM} = require("jsdom");
const {collection_url} = require('./conf');
const util = require('util');
const sleep = util.promisify(setTimeout);

let option = {
    title: "桂林风云+河边故事+欧洲行记+今始为君开+阶梯计划", // *Required, title of the book.
    author: "临高启明同人作品集", // *Required, name of the author.
    publisher: "我的电脑", // optional
    cover: "./cover/cover.jpg",
    content: []
};

async function main() {
    const url_list = [];
    // 1. list页面获取每个页面的url
    // jsdom解析列表页 无法获取到滚动后ajax动态加载的页面 于是手动去浏览器上面获取抓取页面url

    // 2. 顺序解析每个页面 获取到html
    for (let idx = 0; idx < collection_url.length; idx++) {
        const {url, name} = collection_url[idx];
        const detail_page = await JSDOM.fromURL(url);
        const detail_document = detail_page.window.document;
        const articleWrapper = detail_document.querySelector(".rich_media_content.js_underline_content");

        // 多余信息, 暂时移除
        // SECTION 多为推广信息;img暂时还无法渲染;BR电子书内容本来就有换行可以去掉
        const useless_names = ['SECTION', 'IMG', 'BR'];
        const article_sub_nodes = articleWrapper.querySelectorAll('*');
        for (let idx = 0; idx < article_sub_nodes.length; idx++) {
            const cur_node = article_sub_nodes[idx];
            const tagName = cur_node.tagName;
            if (useless_names.includes(tagName)
                || cur_node.innerHTML === '&nbsp;'
                || (cur_node.innerHTML && cur_node.innerHTML.includes('为元老院与人民，请不吝赐'))
            ) {
                cur_node.remove();
            }
        }

        const htmlStr = articleWrapper.innerHTML || '';
        option.content.push({title: name, data: htmlStr});

        console.log(`${name} ${idx + 1}`);
        await sleep(Math.round(1000 * Math.random()));
    }

    // 3. 生成epub文件(暂时不支持其中的图片)
    new Epub(option, `./output/test.epub`);
}

main();
