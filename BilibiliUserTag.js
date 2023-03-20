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
                word_list: ["原神", "刻晴", "甘雨", "钟离", "派蒙", "七圣召唤", "八重神子", "纳西妲", "原魔", "丘丘人", "甜甜花", "圣遗物", "神里绫华"],
                logic_and: false,
                tag: "【 原神 】",
                color: "#EB0D0D"
            },
            {
                word_list: ["inecraft", "ojang", "我的世界", "落地水", "生电", "刷怪塔", "红石", "潜影盒", "末影人", "苦力怕", "creeper", "MCJE", "MCBE"],
                logic_and: false,
                tag: "【 Minecraft 】",
                color: "#6CB935"
            },
            {
                word_list: ["抽奖"],
                logic_and: false,
                tag: "【 抽奖 】",
                color: "#D8AC14"
            },
            {
                word_list: ["AI画图", "novelai", "diffusion", "dreambooth", "元素法典", "AI绘画", "deepdanbooru", "naifu", "embedding", "LoRA", "lora"],
                logic_and: false,
                tag: "【 AI画图 】",
                color: "#B729C4"
            },
            {
                word_list: ["ChatGPT", "chatGPT", "chatgpt", "Chatgpt", "OpenAI", "ChatGML", "gpt3", "gpt4", "GPT3", "GPT4"],
                logic_and: false,
                tag: "【 ChatGPT 】",
                color: "#13B247"
            },
            {
                word_list: ["は", "が", "て", "に"],
                logic_and: true,
                tag: "【 日语 】",
                color: "#CD50A0"
            },
            {
                word_list: ["女装"],
                logic_and: false,
                tag: "【 女装 】",
                color: "#E9EC14"
            },
            {
                word_list: ["明日方舟"],
                logic_and: false,
                tag: "【 明日方舟 】",
                color: "#35057A"
            },
            {
                word_list: ["英雄联盟"],
                logic_and: false,
                tag: "【 英雄联盟 】",
                color: "#27524B"
            },
            {
                word_list: ["王者荣耀"],
                logic_and: false,
                tag: "【 王者荣耀 】",
                color: "#62884E"
            },
            {
                word_list: ["幻塔"],
                logic_and: false,
                tag: "【 幻塔 】",
                color: "#697B53"
            },
            {
                word_list: ["鸣潮"],
                logic_and: false,
                tag: "【 鸣潮 】",
                color: "#1B18A0"
            },
            {
                word_list: ["疫情", "隔离", "核酸"],
                logic_and: false,
                tag: "【 疫情 】",
                color: "#465B84"
            },
            {
                word_list: ["Steam", "steam"],
                logic_and: false,
                tag: "【 Steam 】",
                color: "#98B06A"
            },
            {
                word_list: ["流浪地球", "完整的一生", "数字生命", "的寿命只有", "小破球", "的生命只有", "MOSS", "moss", "550w", "550W"],
                logic_and: false,
                tag: "【 流浪地球 】",
                color: "#924c3d"
            },
            {
                word_list: ["github"],
                logic_and: false,
                tag: "【 Github 】",
                color: "#5EBDBF"
            },
            {
                word_list: ["百度云", "pan.baidu.com"],
                logic_and: false,
                tag: "【 百度云 】",
                color: "#531468"
            },
            {
                word_list: ["蓝奏云", "lanzou"],
                logic_and: false,
                tag: "【 蓝奏云 】",
                color: "#048A16"
            },
            {
                word_list: ["阿里云", "aliyun"],
                logic_and: false,
                tag: "【 阿里云 】",
                color: "#8BB162"
            },
            {
                word_list: ["迅雷", "xunlei"],
                logic_and: false,
                tag: "【 迅雷 】",
                color: "#623420"
            },
            {
                word_list: ["CSDN", "csdn"],
                logic_and: false,
                tag: "【 CSDN 】",
                color: "#7CA155"
            },
            {
                word_list: ["pixiv", "p站", "P站"],
                logic_and: false,
                tag: "【 Pixiv 】",
                color: "#771F23"
            },
            {
                word_list: ["gitee"],
                logic_and: false,
                tag: "【 gitee 】",
                color: "#5F135F"
            },
            {
                word_list: ["Youtube", "油管", "youtube"],
                logic_and: false,
                tag: "【 Youtube 】",
                color: "#AC7BB4"
            },
            {
                word_list: ["magnet:"],
                logic_and: false,
                tag: "【 磁力链接 】",
                color: "#485D26"
            },
            {
                word_list: ["油猴脚本"],
                logic_and: false,
                tag: "【 油猴脚本 】",
                color: "#07AD26"
            },
            {
                word_list: ["浏览器扩展"],
                logic_and: false,
                tag: "【 浏览器扩展 】",
                color: "#A3A75F"
            },
            {
                word_list: ["崩坏3", "三崩子", "三蹦子", "崩三", "崩坏三", "崩3"],
                logic_and: false,
                tag: "【 崩坏3 】",
                color: "#4F7A9E"
            },
            {
                word_list: ["半河绿", "满江红"],
                logic_and: false,
                tag: "【 满江红 】",
                color: "#981B0A"
            },
            {
                word_list: ["炉石"],
                logic_and: false,
                tag: "【 炉石传说 】",
                color: "#746D50"
            },
            {
                word_list: ["部落冲突"],
                logic_and: false,
                tag: "【 部落冲突 】",
                color: "#058681"
            },
            {
                word_list: ["皇室战争"],
                logic_and: false,
                tag: "【 皇室战争 】",
                color: "#4A8F55"
            },
            {
                word_list: ["二次元", "动漫", "看番", "新番", "好番", "动画"],
                logic_and: false,
                tag: "【 二次元 】",
                color: "#804A0F"
            },
            {
                word_list: ["初音ミク", "初音未来", "hatsune"],
                logic_and: false,
                tag: "【 初音ミク 】",
                color: "#8D3252"
            },
            {
                word_list: ["洛天依"],
                logic_and: false,
                tag: "【 洛天依 】",
                color: "#150D1C"
            },
            {
                word_list: ["cosplay"],
                logic_and: false,
                tag: "【 cosplay 】",
                color: "#561F5D"
            },
            {
                word_list: ["声优"],
                logic_and: false,
                tag: "【 声优 】",
                color: "#020E4A"
            },
            {
                word_list: ["MAD"],
                logic_and: false,
                tag: "【 MAD 】",
                color: "#3BACBA"
            },
            {
                word_list: ["MMD"],
                logic_and: false,
                tag: "【 MMD 】",
                color: "#2C51BD"
            },
            {
                word_list: ["AMV"],
                logic_and: false,
                tag: "【 AMV 】",
                color: "#A2AAA6"
            },
            {
                word_list: ["手书"],
                logic_and: false,
                tag: "【 手书 】",
                color: "#BC3580"
            },
            {
                word_list: ["漫展"],
                logic_and: false,
                tag: "【 漫展 】",
                color: "#B27E77"
            },
            {
                word_list: ["CLANNAD", "clannad", "cl一生"],
                logic_and: false,
                tag: "【 CLANNAD 】",
                color: "#2E4C79"
            },
            {
                word_list: ["东方", "车万", "越共", "東方"],
                logic_and: false,
                tag: "【 东方 】",
                color: "#9D090E"
            },
            {
                word_list: ["京阿尼", "京都动画", "京都アニメ"],
                logic_and: false,
                tag: "【 京阿尼 】",
                color: "#78B44E"
            },
            {
                word_list: ["手办"],
                logic_and: false,
                tag: "【 手办 】",
                color: "#0A1DBF"
            },
            {
                word_list: ["三体", "罗辑", "脱水", "主不在乎", "黑暗森林", "二向箔", "光粒", "曲率驱动", "云天明", "维德", "智子", "思想钢印"],
                logic_and: false,
                tag: "【 三体 】",
                color: "#08B482"
            },
            {
                word_list: ["Fate", "fate", "saber", "Saber", "吾王剑之所指"],
                logic_and: false,
                tag: "【 Fate 】",
                color: "#8D5012"
            },
            {
                word_list: ["博人传", "比博燃"],
                logic_and: false,
                tag: "【 博人传 】",
                color: "#2DB3AB"
            },
            {
                word_list: ["柯南"],
                logic_and: false,
                tag: "【 柯南 】",
                color: "#9171AB"
            },
            {
                word_list: ["海贼王"],
                logic_and: false,
                tag: "【 海贼王 】",
                color: "#92AC9F"
            },
            {
                word_list: ["JOJO", "jojo"],
                logic_and: false,
                tag: "【 JOJO 】",
                color: "#445A58"
            },
            {
                word_list: ["异世界", "異世界"],
                logic_and: false,
                tag: "【 异世界 】",
                color: "#A62B67"
            },
            {
                word_list: ["鬼灭之刃", "炭之郎", "弥豆子", "水之呼吸", "蝴蝶忍", "血鬼术"],
                logic_and: false,
                tag: "【 鬼灭之刃 】",
                color: "#5065B4"
            },
            {
                word_list: ["新海诚", "你的名字", "天气之子", "秒速五厘米"],
                logic_and: false,
                tag: "【 新海诚 】",
                color: "#133A0C"
            },
            {
                word_list: ["宫崎骏", "千与千寻", "天空之城", "龙猫", "风之谷", "哈尔的移动城堡", "幽灵公主"],
                logic_and: false,
                tag: "【 宫崎骏 】",
                color: "#29824A"
            },
            {
                word_list: ["御坂美琴", "某科学的超电磁炮", "夹击妹抖", "超炮", "炮姐"],
                logic_and: false,
                tag: "【 超炮 】",
                color: "#B94EAF"
            },
            {
                word_list: ["蕾姆", "レム"],
                logic_and: false,
                tag: "【 蕾姆 】",
                color: "#A8288E"
            },
            {
                word_list: ["艾米莉亚", "EMT", "エミリア"],
                logic_and: false,
                tag: "【 艾米莉亚 】",
                color: "#2C4B3E"
            },
            {
                word_list: ["伊蕾娜"],
                logic_and: false,
                tag: "【 伊蕾娜 】",
                color: "#5F547C"
            },
            {
                word_list: ["时崎狂三", "约站", "五河士道"],
                logic_and: false,
                tag: "【 约战 】",
                color: "#A38923"
            },
            {
                word_list: ["罗小黑", "罗小白", "阿根", "灵质空间"],
                logic_and: false,
                tag: "【 罗小黑 】",
                color: "#13468C"
            },
            {
                word_list: ["四宫辉夜", "藤原千花", "书记舞"],
                logic_and: false,
                tag: "【 辉夜 】",
                color: "#0D542D"
            },
            {
                word_list: ["本间芽衣子", "面码", "未闻花名"],
                logic_and: false,
                tag: "【 未闻花名 】",
                color: "#476D46"
            },
            {
                word_list: ["亚丝娜", "刀剑神域"],
                logic_and: false,
                tag: "【 刀剑神域 】",
                color: "#849118"
            },
            {
                word_list: ["雪之下雪乃", "春物", "青春恋爱物语"],
                logic_and: false,
                tag: "【 春物 】",
                color: "#A41B29"
            },
            {
                word_list: ["和泉纱雾"],
                logic_and: false,
                tag: "【 和泉纱雾 】",
                color: "#B44FB8"
            },
            {
                word_list: ["碧蓝航线"],
                logic_and: false,
                tag: "【 碧蓝航线 】",
                color: "#614181"
            },
            {
                word_list: ["崩坏学园"],
                logic_and: false,
                tag: "【 崩坏学园 】",
                color: "#A17723"
            },
            {
                word_list: ["老头环", "艾尔登法环"],
                logic_and: false,
                tag: "【 老头环 】",
                color: "#246010"
            },
            {
                word_list: ["higros"],
                logic_and: false,
                tag: "【 Phigros 】",
                color: "#45749D"
            },
            {
                word_list: ["迷你世界", "迷你屎界"],
                logic_and: false,
                tag: "【 迷你世界 】",
                color: "#33903F"
            },
            {
                word_list: ["世界杯"],
                logic_and: false,
                tag: "【 世界杯 】",
                color: "#634000"
            },
            {
                word_list: ["NBA"],
                logic_and: false,
                tag: "【 NBA 】",
                color: "#BA1A6F"
            },
            {
                word_list: ["vlog", "Vlog"],
                logic_and: false,
                tag: "【 vlog 】",
                color: "#596240"
            },
            {
                word_list: ["Vtuber", "vtuber"],
                logic_and: false,
                tag: "【 Vtuber 】",
                color: "#923C19"
            },
            {
                word_list: ["vits", "VITS"],
                logic_and: false,
                tag: "【 VITS 】",
                color: "#912BE1"
            },
            {
                word_list: ["DIY"],
                logic_and: false,
                tag: "【 DIY 】",
                color: "#71B837"
            },
            {
                word_list: ["冬奥会"],
                logic_and: false,
                tag: "【 冬奥会 】",
                color: "#2B0A09"
            },
            {
                word_list: ["未定事件簿"],
                logic_and: false,
                tag: "【 未定事件簿 】",
                color: "#63B40C"
            },
            {
                word_list: ["泰拉瑞亚"],
                logic_and: false,
                tag: "【 泰拉瑞亚 】",
                color: "#3CAD2A"
            },
            {
                word_list: ["守望先锋"],
                logic_and: false,
                tag: "【 守望先锋 】",
                color: "#0D3150"
            },
            {
                word_list: ["第五人格"],
                logic_and: false,
                tag: "【 第五人格 】",
                color: "#365E74"
            },
            {
                word_list: ["阴阳师"],
                logic_and: false,
                tag: "【 阴阳师 】",
                color: "#4384B3"
            },
            {
                word_list: ["CS:GO", "CSGO", "csgo"],
                logic_and: false,
                tag: "【 CS:GO 】",
                color: "#50B704"
            },
            {
                word_list: ["只狼"],
                logic_and: false,
                tag: "【 只狼 】",
                color: "#5EBB99"
            },
            {
                word_list: ["赛博朋克"],
                logic_and: false,
                tag: "【 赛博朋克 】",
                color: "#AB4CB9"
            },
            {
                word_list: ["星穹铁道"],
                logic_and: false,
                tag: "【 星穹铁道 】",
                color: "#815823"
            },
            {
                word_list: ["公主连结"],
                logic_and: false,
                tag: "【 公主连结 】",
                color: "#4BA030"
            },
            {
                word_list: ["APEX", "apex"],
                logic_and: false,
                tag: "【 APEX 】",
                color: "#B7079F"
            },
            {
                word_list: ["赛马娘"],
                logic_and: false,
                tag: "【 赛马娘 】",
                color: "#294F5E"
            },
            {
                word_list: ["绝区零"],
                logic_and: false,
                tag: "【 绝区零 】",
                color: "#449B83"
            },
            {
                word_list: ["和平精英"],
                logic_and: false,
                tag: "【 和平精英 】",
                color: "#7D3DAF"
            },
            {
                word_list: ["DOTA", "dota"],
                logic_and: false,
                tag: "【 DOTA 】",
                color: "#3403A9"
            },
            {
                word_list: ["魔兽世界"],
                logic_and: false,
                tag: "【 魔兽世界 】",
                color: "#31269D"
            },
            {
                word_list: ["永劫无间"],
                logic_and: false,
                tag: "【 永劫无间 】",
                color: "#31178F"
            },
            {
                word_list: ["明日之后"],
                logic_and: false,
                tag: "【 明日之后 】",
                color: "#543B88"
            },
            {
                word_list: ["Windows", "win10", "win11", "windows", "win7"],
                logic_and: false,
                tag: "【 Windows 】",
                color: "#957F49"
            },
            {
                word_list: ["Linux", "linux"],
                logic_and: false,
                tag: "【 Linux 】",
                color: "#49644B"
            },
            {
                word_list: ["Android", "安卓", "android"],
                logic_and: false,
                tag: "【 Android 】",
                color: "#4B2A58"
            },
            {
                word_list: ["Nvidia", "n卡", "nvidia", "英伟达", "RTX", "GTX"],
                logic_and: false,
                tag: "【 Nvidia 】",
                color: "#094039"
            },
            {
                word_list: ["AMD", "锐龙", "amd"],
                logic_and: false,
                tag: "【 AMD 】",
                color: "#10A06A"
            },
            {
                word_list: ["Intel", "英特尔", "intel"],
                logic_and: false,
                tag: "【 Intel 】",
                color: "#6B7BB3"
            },
            {
                word_list: ["小米"],
                logic_and: false,
                tag: "【 小米 】",
                color: "#B195BA"
            },
            {
                word_list: ["华为", "harmonyOS", "huawei"],
                logic_and: false,
                tag: "【 华为 】",
                color: "#7F6EBD"
            },
            {
                word_list: ["苹果", "iPhone", "iPad", "MacOS", "MacBook", "AirPods"],
                logic_and: false,
                tag: "【 苹果 】",
                color: "#0A4A8D"
            },
            {
                word_list: ["VIVO", "vivo"],
                logic_and: false,
                tag: "【 VIVO 】",
                color: "#B8BDAB"
            },
            {
                word_list: ["联想", "lenovo", "Lenovo"],
                logic_and: false,
                tag: "【 联想 】",
                color: "#6D6978"
            },
            {
                word_list: ["塞尔达"],
                logic_and: false,
                tag: "【 塞尔达 】",
                color: "#6BA4A0"
            },
            {
                word_list: ["荒野大镖客"],
                logic_and: false,
                tag: "【 荒野大镖客 】",
                color: "#308CBD"
            },
            {
                word_list: ["少女前线"],
                logic_and: false,
                tag: "【 少女前线 】",
                color: "#8B3573"
            },
            {
                word_list: ["深空之眼"],
                logic_and: false,
                tag: "【 深空之眼 】",
                color: "#26416A"
            },
            {
                word_list: ["怪物猎人"],
                logic_and: false,
                tag: "【 怪物猎人 】",
                color: "#246C9F"
            },
            {
                word_list: ["刺客信条"],
                logic_and: false,
                tag: "【 刺客信条 】",
                color: "#180D55"
            },
            {
                word_list: ["元气骑士"],
                logic_and: false,
                tag: "【 元气骑士 】",
                color: "#08AFA4"
            },
            {
                word_list: ["米哈游", "mhy", "乆乆乆", "米忽悠"],
                logic_and: false,
                tag: "【 米哈游 】",
                color: "#4D930D"
            },
            {
                word_list: ["地下城与勇士"],
                logic_and: false,
                tag: "【 地下城与勇士 】",
                color: "#6C24AA"
            },
            {
                word_list: ["战双帕米什"],
                logic_and: false,
                tag: "【 战双帕米什 】",
                color: "#AF8B75"
            },
            {
                word_list: ["火影忍者"],
                logic_and: false,
                tag: "【 火影忍者 】",
                color: "#564B4E"
            },
            {
                word_list: ["堡垒之夜"],
                logic_and: false,
                tag: "【 堡垒之夜 】",
                color: "#3E9E54"
            },
            {
                word_list: ["穿越火线"],
                logic_and: false,
                tag: "【 穿越火线 】",
                color: "#7DB25D"
            },
            {
                word_list: ["绝地求生"],
                logic_and: false,
                tag: "【 绝地求生 】",
                color: "#9D127D"
            },
            {
                word_list: ["腾讯", "Tencent", "tencent", "鹅场"],
                logic_and: false,
                tag: "【 腾讯 】",
                color: "#7C1092"
            },
            {
                word_list: ["网易", "netease", "Netease"],
                logic_and: false,
                tag: "【 网易 】",
                color: "#274F37"
            },
            {
                word_list: ["光遇"],
                logic_and: false,
                tag: "【 光遇 】",
                color: "#102E5C"
            },
            {
                word_list: ["DNF"],
                logic_and: false,
                tag: "【 DNF 】",
                color: "#B8113F"
            },
            {
                word_list: ["刀剑乱舞"],
                logic_and: false,
                tag: "【 刀剑乱舞 】",
                color: "#0D1017"
            },
            {
                word_list: ["使命召唤"],
                logic_and: false,
                tag: "【 使命召唤 】",
                color: "#46301A"
            },
            {
                word_list: ["精灵宝可梦"],
                logic_and: false,
                tag: "【 精灵宝可梦 】",
                color: "#362853"
            },
            {
                word_list: ["微软", "icrosoft"],
                logic_and: false,
                tag: "【 微软 】",
                color: "#0E8D5B"
            },
            {
                word_list: ["传说之下"],
                logic_and: false,
                tag: "【 传说之下 】",
                color: "#B24EA3"
            },
            {
                word_list: ["彩虹六号"],
                logic_and: false,
                tag: "【 彩虹六号 】",
                color: "#1D0808"
            },
            {
                word_list: ["星际争霸"],
                logic_and: false,
                tag: "【 星际争霸 】",
                color: "#0D02B0"
            },
            {
                word_list: ["生化危机"],
                logic_and: false,
                tag: "【 生化危机 】",
                color: "#87311A"
            },
            {
                word_list: ["模拟人生"],
                logic_and: false,
                tag: "【 模拟人生 】",
                color: "#10A163"
            },
            {
                word_list: ["糖豆人"],
                logic_and: false,
                tag: "【 糖豆人 】",
                color: "#6C0F62"
            },
            {
                word_list: ["战地"],
                logic_and: false,
                tag: "【 战地 】",
                color: "#1B0950"
            },
            {
                word_list: ["巫师3", "巫师三", "昆特牌"],
                logic_and: false,
                tag: "【 巫师3 】",
                color: "#B23D6B"
            },
            {
                word_list: ["影之诗"],
                logic_and: false,
                tag: "【 影之诗 】",
                color: "#2F8D21"
            },
            {
                word_list: ["鬼泣"],
                logic_and: false,
                tag: "【 鬼泣 】",
                color: "#45393A"
            },
            {
                word_list: ["植物大战僵尸", "pvz"],
                logic_and: false,
                tag: "【 植物大战僵尸 】",
                color: "#59364B"
            },
            {
                word_list: ["红色警戒"],
                logic_and: false,
                tag: "【 红色警戒 】",
                color: "#B37085"
            },
            {
                word_list: ["瘟疫公司"],
                logic_and: false,
                tag: "【 瘟疫公司 】",
                color: "#375E4A"
            },
            {
                word_list: ["三国志"],
                logic_and: false,
                tag: "【 三国志 】",
                color: "#839E92"
            },
            {
                word_list: ["最终幻想"],
                logic_and: false,
                tag: "【 最终幻想 】",
                color: "#30421A"
            },
            {
                word_list: ["斗地主", "十七张牌你能秒我", "卢本伟", "抢地主", "叫地主"],
                logic_and: false,
                tag: "【 斗地主 】",
                color: "#508121"
            },
            {
                word_list: ["愤怒的小鸟"],
                logic_and: false,
                tag: "【 愤怒的小鸟 】",
                color: "#4BA9AD"
            },
            {
                word_list: ["滑雪大冒险"],
                logic_and: false,
                tag: "【 滑雪大冒险 】",
                color: "#279074"
            },
            {
                word_list: ["球球大作战"],
                logic_and: false,
                tag: "【 球球大作战 】",
                color: "#A62D5F"
            },
            {
                word_list: ["黄金矿工"],
                logic_and: false,
                tag: "【 黄金矿工 】",
                color: "#529A81"
            },
            {
                word_list: ["狼人杀"],
                logic_and: false,
                tag: "【 狼人杀 】",
                color: "#5D77B1"
            },
            {
                word_list: ["扫雷"],
                logic_and: false,
                tag: "【 扫雷 】",
                color: "#B62528"
            },
            {
                word_list: ["贪吃蛇"],
                logic_and: false,
                tag: "【 贪吃蛇 】",
                color: "#322F4E"
            },
            {
                word_list: ["黑暗之魂"],
                logic_and: false,
                tag: "【 黑暗之魂 】",
                color: "#AA8A43"
            },
            {
                word_list: ["天涯明月刀"],
                logic_and: false,
                tag: "【 天涯明月刀 】",
                color: "#680021"
            },
            {
                word_list: ["节奏大师"],
                logic_and: false,
                tag: "【 节奏大师 】",
                color: "#2D9AA7"
            },
            {
                word_list: ["象棋"],
                logic_and: false,
                tag: "【 象棋 】",
                color: "#16B132"
            },
            {
                word_list: ["围棋"],
                logic_and: false,
                tag: "【 围棋 】",
                color: "#05B16E"
            },
            {
                word_list: ["音游"],
                logic_and: false,
                tag: "【 音游 】",
                color: "#9D5EBA"
            },
            {
                word_list: ["微博"],
                logic_and: false,
                tag: "【 微博 】",
                color: "#A1664E"
            },
            {
                word_list: ["知乎"],
                logic_and: false,
                tag: "【 知乎 】",
                color: "#1C5F23"
            },
            {
                word_list: ["抖音"],
                logic_and: false,
                tag: "【 抖音 】",
                color: "#923DAA"
            },
            {
                word_list: ["快手"],
                logic_and: false,
                tag: "【 快手 】",
                color: "#87524A"
            },
            {
                word_list: ["Twitter", "twitter", "推特"],
                logic_and: false,
                tag: "【 Twitter 】",
                color: "#458E93"
            },
            {
                word_list: ["XBOX", "xbox"],
                logic_and: false,
                tag: "【 XBOX 】",
                color: "#9D78BE"
            },
            {
                word_list: ["索尼", "Sony", "sony"],
                logic_and: false,
                tag: "【 索尼 】",
                color: "#603737"
            },
            {
                word_list: ["PlayStation", "PS5", "ps5", "ps4", "PS4"],
                logic_and: false,
                tag: "【 PlayStation 】",
                color: "#61BEBD"
            },
            {
                word_list: ["暴雪"],
                logic_and: false,
                tag: "【 暴雪 】",
                color: "#988B89"
            },
            {
                word_list: ["任天堂"],
                logic_and: false,
                tag: "【 任天堂 】",
                color: "#357A22"
            },
            {
                word_list: ["嘉然"],
                logic_and: false,
                tag: "【 嘉然 】",
                color: "#0E076F"
            },
            {
                word_list: ["泛式"],
                logic_and: false,
                tag: "【 泛式 】",
                color: "#A5AEB1"
            },
            {
                word_list: ["凉风", "阅片无数"],
                logic_and: false,
                tag: "【 凉风Kaze 】",
                color: "#BA40A2"
            },
            {
                word_list: ["Lex", "蕾丝"],
                logic_and: false,
                tag: "【 Lex 】",
                color: "#2FAA3C"
            },
            {
                word_list: ["何同学"],
                logic_and: false,
                tag: "【 何同学 】",
                color: "#65AF4A"
            },
            {
                word_list: ["毕导", "小学二年级"],
                logic_and: false,
                tag: "【 毕导 】",
                color: "#65BFBD"
            },
            {
                word_list: ["泠鸢"],
                logic_and: false,
                tag: "【 泠鸢 】",
                color: "#8F4D6F"
            },
            {
                word_list: ["神楽めあ"],
                logic_and: false,
                tag: "【 神楽めあ 】",
                color: "#9C63AD"
            },
            {
                word_list: ["丁真"],
                logic_and: false,
                tag: "【 丁真 】",
                color: "#BB1717"
            },
            {
                word_list: ["籽岷"],
                logic_and: false,
                tag: "【 籽岷 】",
                color: "#8D09A4"
            },
            {
                word_list: ["回形针", "paperclip", "Paperclip"],
                logic_and: false,
                tag: "【 回形针 】",
                color: "#70AE4E"
            },
            {
                word_list: ["老番茄"],
                logic_and: false,
                tag: "【 老番茄 】",
                color: "#A54388"
            },
            {
                word_list: ["罗翔说刑法"],
                logic_and: false,
                tag: "【 罗翔说刑法 】",
                color: "#323A02"
            },
            {
                word_list: ["央视新闻"],
                logic_and: false,
                tag: "【 央视新闻 】",
                color: "#40A992"
            },
            {
                word_list: ["碧诗", "站长"],
                logic_and: false,
                tag: "【 碧诗 】",
                color: "#6AAE2F"
            },
            {
                word_list: ["陈睿", "小陈", "叔叔我"],
                logic_and: false,
                tag: "【 陈睿 】",
                color: "#56B56F"
            },
            {
                word_list: ["花泽香菜"],
                logic_and: false,
                tag: "【 花泽香菜 】",
                color: "#106F9F"
            },
            {
                word_list: ["早见纱织", "纱织姐姐"],
                logic_and: false,
                tag: "【 早见沙织 】",
                color: "#B8148F"
            },
            {
                word_list: ["泽野弘之"],
                logic_and: false,
                tag: "【 泽野弘之 】",
                color: "#A582BE"
            },
            {
                word_list: ["松冈"],
                logic_and: false,
                tag: "【 松冈祯丞 】",
                color: "#522CBA"
            },
            {
                word_list: ["茅野艾衣"],
                logic_and: false,
                tag: "【 茅野艾衣 】",
                color: "#8C8438"
            },
            {
                word_list: ["樱井孝宏"],
                logic_and: false,
                tag: "【 樱井孝宏 】",
                color: "#87178F"
            },
            {
                word_list: ["高桥李依"],
                logic_and: false,
                tag: "【 高桥李依 】",
                color: "#013150"
            },
            {
                word_list: ["水濑祈"],
                logic_and: false,
                tag: "【 水濑祈 】",
                color: "#19AE6C"
            },
            {
                word_list: ["子安武人"],
                logic_and: false,
                tag: "【 子安武人 】",
                color: "#5BBEA2"
            },
            {
                word_list: ["中村悠一"],
                logic_and: false,
                tag: "【 中村悠一 】",
                color: "#1F20A2"
            },
            {
                word_list: ["鬼头明里"],
                logic_and: false,
                tag: "【 鬼头明里 】",
                color: "#942C08"
            },
            {
                word_list: ["丰崎爱生"],
                logic_and: false,
                tag: "【 丰崎爱生 】",
                color: "#464674"
            },
            {
                word_list: ["蔡徐坤", "只因", "你干嘛", "哎呦"],
                logic_and: false,
                tag: "【 蔡徐坤 】",
                color: "#2A97BC"
            },
            {
                word_list: ["新垣结衣"],
                logic_and: false,
                tag: "【 新垣结衣 】",
                color: "#61031A"
            },
            {
                word_list: ["肖战"],
                logic_and: false,
                tag: "【 肖战 】",
                color: "#94B443"
            },
            {
                word_list: ["吴亦凡", "吴签"],
                logic_and: false,
                tag: "【 吴亦凡 】",
                color: "#0137A0"
            },
            {
                word_list: ["周杰伦"],
                logic_and: false,
                tag: "【 周杰伦 】",
                color: "#0D9D24"
            },
            {
                word_list: ["Facebook", "facebook", "脸书"],
                logic_and: false,
                tag: "【 Facebook 】",
                color: "#8C4B67"
            },
            {
                word_list: ["Discord", "discord", "dc频道"],
                logic_and: false,
                tag: "【 Discord 】",
                color: "#1792AF"
            },
            {
                word_list: ["豆瓣"],
                logic_and: false,
                tag: "【 豆瓣 】",
                color: "#116BB5"
            },
            {
                word_list: ["斗鱼"],
                logic_and: false,
                tag: "【 斗鱼 】",
                color: "#081F9E"
            },
            {
                word_list: ["WeGame", "wegame"],
                logic_and: false,
                tag: "【 WeGame 】",
                color: "#5942B7"
            },
            {
                word_list: ["完美世界"],
                logic_and: false,
                tag: "【 完美世界 】",
                color: "#362F66"
            },
            {
                word_list: ["昆仑"],
                logic_and: false,
                tag: "【 昆仑 】",
                color: "#714317"
            },
            {
                word_list: ["优酷"],
                logic_and: false,
                tag: "【 优酷 】",
                color: "#8C544C"
            },
            {
                word_list: ["爱奇艺"],
                logic_and: false,
                tag: "【 爱奇艺 】",
                color: "#78887B"
            }
        ],
        no_tag: "【 普通 】",
        no_color: "#2ad100",
        null_tag: "【 无动态 】",
        null_color: "#2ad1d1"
    }

    //已经查过的用户标签保存到这里，避免重复查询
    var user_has_lookup = []

    const blog = 'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?&host_mid='
    const is_new = document.getElementsByClassName('item goback').length != 0 // 检测是不是新版

    const get_css_style = (show_text, show_color) => {
        return "<b style='color: " + show_color + "'>" + show_text + "</b>"
    }

    const get_title_style = (show_text, show_title, show_color) => {
        return "<b style='color: " + show_color + "' title='"+ show_title +"'>" + show_text + "</b>"
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
                comment_list.innerHTML += get_title_style(hide_tag_title, hide_tag_list, keyword_setting.tag_max_color)
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
                    // let xhr = new XMLHttpRequest()
                    GM_xmlhttpRequest({
                        method: "get",
                        url: blogurl,
                        data: '',
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
                        },
                        onload: function (res) {
                            if (res.status === 200) {
                                //console.log('成功')
                                let st = JSON.stringify(JSON.parse(res.response).data)

                                //添加标签
                                var tag_matches = []
                                var tag_text = []
                                let tag_list_size = keyword_setting.keyword_list.length;
                                if (!st.includes("http")) {
                                    //没有任何动态
                                    tag_matches.push(get_css_style(keyword_setting.null_tag, keyword_setting.null_color))
                                    tag_text.push(keyword_setting.null_tag)
                                }
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
                                console.log(res)
                            }
                        },
                    });
                }
            });
        }
    }, 4000)
})();
