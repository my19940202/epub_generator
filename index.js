const Epub = require("epub-gen");

const option = {
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
};

new Epub(option, "./output/path.epub");
