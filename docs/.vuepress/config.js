module.exports = {
    title: "Configuration parsing",
    description: "Load, parse, validate your configuration.",
    base: "/configuration-parsing/",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Installation", link: '/guide/installation.md' },
            { text: "Guide", link: '/guide/' },
            { text: "Github", link: "https://github.com/botflux/configuration-parsing" },
        ],
        displayAllHeaders: true,
        sidebar: [
            {
                title: "Guide",
                path: "/guide/",
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    "/guide/",
                    "/guide/installation.md",
                    "/guide/usages.md",
                    "/guide/write-a-loader.md",
                    "/guide/write-a-parser.md",
                    "/guide/write-a-validator.md",
                ]
            }
        ]
    }
}
