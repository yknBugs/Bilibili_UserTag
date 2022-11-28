// ==UserScript==
// @name         b站评论区用户标注标签
// @namespace    ykn
// @version      1.0
// @description  B站评论区自动根据用户的动态标注相应的标签，依据是动态里是否有特定的关键词
// @author       ykn
// @match        https://www.bilibili.com/video/*
// @match        https://t.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://www.bilibili.com/read/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @connect      bilibili.com
// @grant        GM_xmlhttpRequest
// @license MIT
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';

    var i = 0
    var j = 0
    var k = 0

    //关键词设置
    var keyword_setting = {
        tag_max_show: 3,
        tag_max_prefix: "【 ",
        tag_max_suffix: " 个标签 】",
        tag_max_color: "#ae3a9a",
        keyword_list: [
            {
                word_list: ["原神"],
                logic_and: false,
                tag: "【 原神 】",
                color: "#eb0d0d"
            },
            {
                word_list: ["我的世界","inecraft","ojang"],
                logic_and: false,
                tag: "【 Minecraft 】",
                color: "#28bfbd"
            },
            {
                word_list: ["抽奖"],
                logic_and: false,
                tag: "【 抽奖 】",
                color: "#2f656b"
            },
            {
                word_list: ["英雄联盟"],
                logic_and: false,
                tag: "【 英雄联盟 】",
                color: "#50608e"
            },
            {
                word_list: ["明日方舟"],
                logic_and: false,
                tag: "【 明日方舟 】",
                color: "#50608e"
            },
            {
                word_list: ["王者荣耀"],
                logic_and: false,
                tag: "【 王者荣耀 】",
                color: "#50608e"
            },
            {
                word_list: ["崩坏"],
                logic_and: false,
                tag: "【 崩坏 】",
                color: "#50608e"
            },
            {
                word_list: ["星穹铁道"],
                logic_and: false,
                tag: "【 星穹铁道 】",
                color: "#50608e"
            },
            {
                word_list: ["绝区零"],
                logic_and: false,
                tag: "【 绝区零 】",
                color: "#50608e"
            },
            {
                word_list: ["未定事件簿"],
                logic_and: false,
                tag: "【 未定事件簿 】",
                color: "#50608e"
            },
            {
                word_list: ["米哈游"],
                logic_and: false,
                tag: "【 米哈游 】",
                color: "#50608e"
            },
            {
                word_list: ["鸣潮"],
                logic_and: false,
                tag: "【 鸣潮 】",
                color: "#50608e"
            },
            {
                word_list: ["少女前线"],
                logic_and: false,
                tag: "【 少女前线 】",
                color: "#50608e"
            },
            {
                word_list: ["碧蓝航线"],
                logic_and: false,
                tag: "【 碧蓝航线 】",
                color: "#50608e"
            },
            {
                word_list: ["深空之眼"],
                logic_and: false,
                tag: "【 深空之眼 】",
                color: "#50608e"
            },
            {
                word_list: ["阴阳师"],
                logic_and: false,
                tag: "【 阴阳师 】",
                color: "#50608e"
            },
            {
                word_list: ["赛马娘"],
                logic_and: false,
                tag: "【 赛马娘 】",
                color: "#50608e"
            },
            {
                word_list: ["公主连结"],
                logic_and: false,
                tag: "【 公主连结 】",
                color: "#50608e"
            },
            {
                word_list: ["higros"],
                logic_and: false,
                tag: "【 Phigros 】",
                color: "#50608e"
            },
            {
                word_list: ["和平精英"],
                logic_and: false,
                tag: "【 和平精英 】",
                color: "#50608e"
            },
            {
                word_list: ["魔兽世界"],
                logic_and: false,
                tag: "【 魔兽世界 】",
                color: "#50608e"
            },
            {
                word_list: ["守望先锋"],
                logic_and: false,
                tag: "【 守望先锋 】",
                color: "#50608e"
            },
            {
                word_list: ["CSGO","csgo"],
                logic_and: false,
                tag: "【 CSGO 】",
                color: "#50608e"
            },
            {
                word_list: ["APEX","apex"],
                logic_and: false,
                tag: "【 APEX 】",
                color: "#50608e"
            },
            {
                word_list: ["DOTA","dota"],
                logic_and: false,
                tag: "【 DOTA 】",
                color: "#50608e"
            },
            {
                word_list: ["老头环","艾尔登法环"],
                logic_and: false,
                tag: "【 老头环 】",
                color: "#50608e"
            },
            {
                word_list: ["只狼"],
                logic_and: false,
                tag: "【 只狼 】",
                color: "#50608e"
            },
            {
                word_list: ["赛博朋克"],
                logic_and: false,
                tag: "【 赛博朋克 】",
                color: "#50608e"
            },
            {
                word_list: ["微软", "icrosoft"],
                logic_and: false,
                tag: "【 微软 】",
                color: "#50608e"
            },
            {
                word_list: ["XBOX", "xbox"],
                logic_and: false,
                tag: "【 XBOX 】",
                color: "#50608e"
            },
            {
                word_list: ["索尼"],
                logic_and: false,
                tag: "【 索尼 】",
                color: "#50608e"
            },
            {
                word_list: ["PlayStation"],
                logic_and: false,
                tag: "【 PlayStation 】",
                color: "#50608e"
            },
            {
                word_list: ["任天堂"],
                logic_and: false,
                tag: "【 任天堂 】",
                color: "#50608e"
            },
            {
                word_list: ["塞尔达"],
                logic_and: false,
                tag: "【 塞尔达 】",
                color: "#50608e"
            },
            {
                word_list: ["怪物猎人"],
                logic_and: false,
                tag: "【 怪物猎人 】",
                color: "#50608e"
            },
            {
                word_list: ["永劫无间"],
                logic_and: false,
                tag: "【 永劫无间 】",
                color: "#50608e"
            },
            {
                word_list: ["地下城与勇士"],
                logic_and: false,
                tag: "【 地下城 】",
                color: "#50608e"
            },
            {
                word_list: ["堡垒之夜"],
                logic_and: false,
                tag: "【 堡垒之夜 】",
                color: "#50608e"
            },
            {
                word_list: ["绝地求生"],
                logic_and: false,
                tag: "【 绝地求生 】",
                color: "#50608e"
            },
            {
                word_list: ["嘉然"],
                logic_and: false,
                tag: "【 嘉然 】",
                color: "#50608e"
            },
            {
                word_list: ["泠鸢"],
                logic_and: false,
                tag: "【 泠鸢 】",
                color: "#50608e"
            },
            {
                word_list: ["Vtuber", "vtuber"],
                logic_and: false,
                tag: "【 Vtuber 】",
                color: "#50608e"
            },
            {
                word_list: ["泛式"],
                logic_and: false,
                tag: "【 泛式 】",
                color: "#50608e"
            },
            {
                word_list: ["凉风Kaze"],
                logic_and: false,
                tag: "【 凉风 】",
                color: "#50608e"
            },
            {
                word_list: ["丁真"],
                logic_and: false,
                tag: "【 丁真 】",
                color: "#50608e"
            },
            {
                word_list: ["老师好我叫何同学"],
                logic_and: false,
                tag: "【 何同学 】",
                color: "#50608e"
            },
            {
                word_list: ["小米"],
                logic_and: false,
                tag: "【 小米 】",
                color: "#50608e"
            },
            {
                word_list: ["华为"],
                logic_and: false,
                tag: "【 华为 】",
                color: "#50608e"
            },
            {
                word_list: ["苹果", "iPhone", "MacOS"],
                logic_and: false,
                tag: "【 苹果 】",
                color: "#50608e"
            },
            {
                word_list: ["VIVO", "vivo"],
                logic_and: false,
                tag: "【 VIVO 】",
                color: "#50608e"
            }
        ],
        no_tag: "【 普通 】",
        no_color: "#2ad100"
    }

    //已经查过的用户标签保存到这里，避免重复查询
    var user_has_lookup = []

    const blog = 'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?&host_mid='
    const is_new = document.getElementsByClassName('item goback').length != 0 // 检测是不是新版

    const get_css_style = (show_text, show_color) => {
        return "<b style='color: " + show_color + "'>" + show_text + "</b>"
    }

    const save_lookup_result = (user, tag_list, tag_text_list) => {
        user_has_lookup.push({user: user, tag_list: tag_list, tag_text_list: tag_text_list})
    }

    const get_pid = (c) => {
        if (is_new) {
            return c.dataset['userId']
        } else {
            return c.children[0]['href'].replace(/[^\d]/g, "")
        }
    }

    const get_comment_list = () => {
        if (is_new) {
            let lst = new Set()
            for (let c of document.getElementsByClassName('user-name')) {
                lst.add(c)
            }
            for (let c of document.getElementsByClassName('sub-user-name')) {
                lst.add(c)
            }
            return lst
        } else {
            return document.getElementsByClassName('user')
        }
    }

    const render_tag = (comment_list, tag_list, tag_text_list) => {
        let tag_list_size = tag_list.length
        if (tag_list_size == 0) {
            //没有标签
            if (comment_list.textContent.includes(keyword_setting.no_tag) == false) {
                comment_list.innerHTML += get_css_style(keyword_setting.no_tag, keyword_setting.no_color)
            }
        } else {
            //有标签，按顺序依次显示
            let tag_max_show = keyword_setting.tag_max_show
            if (tag_max_show < tag_list_size) {
                tag_list_size = tag_max_show
            }

            for (k = 0; k < tag_list_size; k++) {
                if (comment_list.textContent.includes(tag_text_list[k]) == false) {
                    comment_list.innerHTML += tag_list[k]
                }
            }

            //超出显示数量限制范围的折叠
            if (tag_list_size < tag_list.length && comment_list.textContent.includes(keyword_setting.tag_max_suffix) == false) {
                let hide_tag_title = keyword_setting.tag_max_prefix + tag_list.length + keyword_setting.tag_max_suffix
                let hide_tag_list = tag_text_list[0]
                for (k = 1; k < tag_list.length; k++) {
                    hide_tag_list += tag_text_list[k]
                }
                comment_list.innerHTML += "<b style='color: " + keyword_setting.tag_max_color + "' title='"+ hide_tag_list +"'>" + hide_tag_title + "</b>"
            }
        }
    }

    let jiance = setInterval(() => {
        let commentlist = get_comment_list()
        if (commentlist.length != 0) {
            commentlist.forEach(c => {
                let pid = get_pid(c)

                //找已经查过的用户避免重复查询
                let search_succeed = false
                for (i = 0; i < user_has_lookup.length; i++) {
                    if (user_has_lookup[i].user == pid) {
                        search_succeed = true
                        render_tag(c, user_has_lookup[i].tag_list, user_has_lookup[i].tag_text_list)
                        i = user_has_lookup.length
                    }
                }


                if (search_succeed == false) {
                    let blogurl = blog + pid
                    GM_xmlhttpRequest({
                        method: "get",
                        url: blogurl,
                        data: '',
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
                        },
                        onload: function (res) {
                            if (res.status === 200) {
                                let st = JSON.stringify(JSON.parse(res.response).data)

                                //添加标签
                                var tag_matches = []
                                var tag_text = []
                                let tag_list_size = keyword_setting.keyword_list.length;
                                for (i = 0; i < tag_list_size; i++) {
                                    let keyword_size = keyword_setting.keyword_list[i].word_list.length
                                    if (keyword_size == 1) {
                                        //关键词只有一个
                                        if (st.includes(keyword_setting.keyword_list[i].word_list[0])) {
                                            tag_matches.push(get_css_style(keyword_setting.keyword_list[i].tag, keyword_setting.keyword_list[i].color))
                                            tag_text.push(keyword_setting.keyword_list[i].tag)
                                        }
                                    } else if (keyword_setting.keyword_list[i].logic_and == false) {
                                        //多个关键词or连接(满足一个关键词就加tag)
                                        for (j = 0; j < keyword_size; j++) {
                                            if (st.includes(keyword_setting.keyword_list[i].word_list[j])) {
                                                tag_matches.push(get_css_style(keyword_setting.keyword_list[i].tag, keyword_setting.keyword_list[i].color))
                                                tag_text.push(keyword_setting.keyword_list[i].tag)
                                                j = keyword_size;
                                            }
                                        }
                                    } else {
                                        //多个关键词and连接(全部满足才加tag)
                                        let word_all_matches = true
                                        for (j = 0; j < keyword_size; j++) {
                                            if (!st.includes(keyword_setting.keyword_list[i].word_list[j])) {
                                                word_all_matches = false
                                                j = keyword_size;
                                            }
                                        }
                                        if (word_all_matches) {
                                            tag_matches.push(get_css_style(keyword_setting.keyword_list[i].tag, keyword_setting.keyword_list[i].color))
                                            tag_text.push(keyword_setting.keyword_list[i].tag)
                                        }
                                    }
                                }
                                render_tag(c, tag_matches, tag_text)
                                save_lookup_result(pid, tag_matches, tag_text)
                            } else {
                                console.log('失败')
                            }
                        },
                    });
                }
            });
        }
    }, 4000)
})();
