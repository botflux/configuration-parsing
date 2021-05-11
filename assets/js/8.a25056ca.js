(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{364:function(t,a,s){"use strict";s.r(a);var n=s(44),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"getting-started"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[t._v("#")]),t._v(" Getting started")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://travis-ci.com/botflux/configuration-parsing",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://travis-ci.com/botflux/configuration-parsing.svg?branch=main",alt:"Build Status"}}),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://coveralls.io/github/botflux/configuration-parsing?branch=main",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://coveralls.io/repos/github/botflux/configuration-parsing/badge.svg?branch=main",alt:"Coverage Status"}}),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://GitHub.com/botflux/configuration-parsing/issues/",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://img.shields.io/github/issues/botflux/configuration-parsing.svg",alt:"GitHub issues"}}),s("OutboundLink")],1),t._v(" "),s("a",{attrs:{href:"https://github.com/botflux/configuration-parsing/blob/main/LICENSE",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:"https://img.shields.io/github/license/botflux/configuration-parsing.svg",alt:"GitHub license"}}),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),s("p",[s("code",[t._v("configuration-parsing")]),t._v(" helps you loading, parsing, and validating your configuration. This package aims to create a workflow to manage all your application's configuration\nno matter what format or source you are using.")]),t._v(" "),s("h2",{attrs:{id:"simple-example"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#simple-example"}},[t._v("#")]),t._v(" Simple example")]),t._v(" "),s("p",[t._v("For example, you can load, parse and validate a json configuration file as following:")]),t._v(" "),s("div",{staticClass:"language-typescript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-typescript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" fromLoadable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" loaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" parsers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" FileLoaderOptions "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@configuration-parsing/core'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" joiConfigurationValidator "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@configuration-parsing/validator-joi'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Joi "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'joi'")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyAppConfig")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* fields */")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" appConfigSchema "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Joi"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* your schema */")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" configurationFactory "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Load from file system")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token generic-function"}},[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fromLoadable")]),s("span",{pre:!0,attrs:{class:"token generic class-name"}},[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("MyAppConfig"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" FileLoaderOptions"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")])])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("loaders"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("file")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Parse using JSON.parse")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parsingWith")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parsers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("json")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Validate with the passed joi schema")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("validatingWith")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("joiConfigurationValidator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("appConfigSchema"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" myConfiguration "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" configurationFactory"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" location"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path/to/my/config.json'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"architecture"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#architecture"}},[t._v("#")]),t._v(" Architecture")]),t._v(" "),s("p",[t._v("This package is split in 3 main components:")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("ConfigurationLoading")]),t._v(" is in charge of loading configurations from various place using various protocols.")]),t._v(" "),s("li",[s("strong",[t._v("ConfigurationParsing")]),t._v(" is in charge of parsing configurations, each parser know how to parse a specific configuration format.")]),t._v(" "),s("li",[s("strong",[t._v("ConfigurationValidation")]),t._v(" is in charge of validating parsed configuration. This component makes sure that the configuration is valid.")])])])}),[],!1,null,null,null);a.default=r.exports}}]);