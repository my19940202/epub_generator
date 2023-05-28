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
            data: "<h2>Charles Lutwidge Dodgson</h2>"
            +"<div lang=\"en\">Better known by the pen name Lewis Carroll...</div>" // pass html string
        },
        {
            title: "啦啦啦啦啦",
            data: "<p> 哈哈哈嘻嘻嘻</p>"
        }
    ]
};

new Epub(option, "./output/path.epub");
