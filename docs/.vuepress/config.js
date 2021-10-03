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
                title: "Installation",
                path: "/guide/installation.md",
                collapsable: true,
                sidebarDepth: 1,
            },
            {
                title: "Usages",
                path: "/guide/usages.md",
                collapsable: true,
                sidebarDepth: 1,
            },
            {
                title: "Augment configuration factory",
                path: "/guide/augment-configuration-factory.md",
                collapsable: true,
                sidebarDepth: 1,
            },
            {
                title: "Write a configuration loader",
                path: '/guide/write-a-loader.md',
                collapsable: true,
                sidebarDepth: 1
            },
            {
                title: "Write a configuration parser",
                path: '/guide/write-a-parser.md',
                collapsable: true,
                sidebarDepth: 1
            },
            {
                title: "Write a configuration validator",
                path: '/guide/write-a-validator.md',
                collapsable: true,
                sidebarDepth: 1
            }
        ]
    },
    plugins: [['vuepress-plugin-code-copy', true]]
}
