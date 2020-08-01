<template>
    <div class="BannerWrapper">
        <!-- 波浪效果-->
        <div class="waveWrapper waveAnimation">
            <div class="waveWrapperInner bgTop">
                <div class="wave waveTop"></div>
            </div>
            <div class="waveWrapperInner bgMiddle">
                <div class="wave waveMiddle"></div>
            </div>
            <div class="waveWrapperInner bgBottom">
                <div class="wave waveBottom"></div>
            </div>
        </div>
        <!--下拉-->
        <div class="headertop-down animated">
            <span @click="headertop_down"><i class="iconfont icon-chevron_down"></i></span>
        </div>
        <div class="center" :style="{'background-image': `url(${imgUrl})`}">
            <!--博主信息-->
            <div class="focusinfo">
                <!-- 头像 -->
                <div class="header-tou">
                    <img :src="websiteInfo.avatar">
                </div>
                <h1 class="glitch">ChunKit.Au</h1>
                <!-- 简介 -->
                <div class="header-info">
                    <p class="ellipsis"><i class="iconfont icon-baojiaquotation2"></i>{{websiteInfo.slogan}} <i
                            class="iconfont icon-baojiaquotation"></i></p>
                    <!-- 社交信息 -->
                    <div class="top-social_v2">
                        <li v-for="item in socials" :key="item.id" :title="item.title">
                            <a :href="item.href" target="_blank" :style="{'color':item.color}">
                                <i class="iconfont" :class="item.icon"></i>
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                websiteInfo: {
                    avatar: "http://qiniu2.19t.wang/img_30.jpg",
                    desc: "一个It技术的探索者",
                    domain: "https://www.19t.wang",
                    name: "My′blog",
                    notice: "my blog",
                    slogan: "Tomorrow may be cruel, but, I want see."
                },
                socials: [
                    {
                        color: "#1AB6FF ",
                        href: "http://wpa.qq.com/msgrd?v=3&uin=570137511&site=qq&menu=yes",
                        icon: "icon-QQ",
                        id: 1,
                        title: "QQ",
                    },
                    {
                        color: "black",
                        href: "https://github.com/ChunKitAu",
                        icon: "icon-github",
                        id: 2,
                        title: "GitHub"
                    },
                ],
            }
        },
        props: {
            imgUrl: {
                type: String,
                default: 'http://qiniu2.19t.wang/img_bg_'+Math.floor(Math.random()*4+1)+'.jpg'
            },
        },
        created() {

        },
        methods: {
            //跳转到文章列表处
            headertop_down() {
                const content = document.getElementById('hook').offsetTop;
                this.scrollAnimation(0, content);
            },
            //跳转
            scrollAnimation(currentY, targetY) {
                // 计算需要移动的距离
                let needScrollTop = targetY - currentY;
                let _currentY = currentY;
                setTimeout(() => {
                    // 一次调用滑动帧数，每次调用会不一样
                    const dist = Math.ceil(needScrollTop / 10);
                    _currentY += dist;
                    window.scrollTo(_currentY, currentY);
                    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
                    if (needScrollTop > 10 || needScrollTop < -10) {
                        this.scrollAnimation(_currentY, targetY)
                    } else {
                        window.scrollTo(_currentY, targetY)
                    }
                }, 1)
            },
        }
    }
</script>

<style scoped lang="less">

    .BannerWrapper {
        position: relative;
        overflow: hidden;
        height: auto;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 3;
            background-attachment: fixed;
        }

        //波浪效果
        @keyframes move_wave {
            0% {
                transform: translateX(0) translateZ(0) scaleY(1)
            }
            50% {
                transform: translateX(-25%) translateZ(0) scaleY(0.55)
            }
            100% {
                transform: translateX(-50%) translateZ(0) scaleY(1)
            }
        }

        .waveWrapper {
            overflow: hidden;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
        }

        .waveWrapperInner {
            position: absolute;
            width: 100%;
            overflow: hidden;
            height: 100%;
            bottom: -1px;
        }

        .bgTop {
            z-index: 15 !important;
            opacity: 0.5;
        }

        .bgMiddle {
            z-index: 10 !important;
            opacity: 0.75;
        }

        .bgBottom {
            z-index: 5 !important;
        }

        .wave {
            position: absolute;
            left: 0;
            width: 200%;
            height: 100%;
            background-repeat: repeat no-repeat;
            background-position: 0 bottom;
            transform-origin: center bottom;
        }

        .waveTop {
            background-size: 50% 100px;
        }

        .waveAnimation .waveTop {
            animation: move-wave 3s;
            -webkit-animation: move-wave 3s;
            -webkit-animation-delay: 1s;
            animation-delay: 1s;
        }

        .waveMiddle {
            background-size: 50% 120px;
        }

        .waveAnimation .waveMiddle {
            animation: move_wave 10s linear infinite;
        }

        .waveBottom {
            background-size: 50% 100px;
        }

        .waveAnimation .waveBottom {
            animation: move_wave 15s linear infinite;
        }

        .waveTop {
            background-image: url('../../../assets/images/wave-top.png');
        }

        .waveMiddle {
            background-image: url('../../../assets/images/wave-mid.png');
        }

        .waveBottom {
            background-image: url('../../../assets/images/wave-bot.png');
        }


        //下拉
        .headertop-down {
            position: absolute;
            bottom: 80px;
            left: 50%;
            cursor: pointer;
            z-index: 90;
            animation: float 2s linear infinite;

            i {
                font-size: 32px;
                color: #fff;
                -ms-transform: scale(1.5, 1);
                -webkit-transform: scale(1.5, 1);
                transform: scale(1.5, 1)
            }
        }


        @-webkit-keyframes float {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }

            50% {
                -webkit-transform: translateY(-6px);
                transform: translateY(-6px)
            }

            100% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }
        }

        @keyframes float {
            0% {
                -webkit-transform: translateY(0);
                -ms-transform: translateY(0);
                transform: translateY(0)
            }

            50% {
                -webkit-transform: translateY(-6px);
                -ms-transform: translateY(-6px);
                transform: translateY(-6px)
            }

            100% {
                -webkit-transform: translateY(0);
                -ms-transform: translateY(0);
                transform: translateY(0)
            }
        }
        @media (max-width: 768px) {
            .waveWrapper {
                display: none
            }
        }
    }

    .center {
        width: 100%;
        height: 730px;
        margin: 0;
        padding: 0;
        background-position: top center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        z-index: -1;
    }


    .focusinfo {
        position: relative;
        max-width: 800px;
        padding: 0 10px;
        top: 49.3%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        text-align: center;
        z-index: 50;
        -webkit-transition: .4s ease all;
        -moz-transition: .4s ease all;
        -o-transition: .4s ease all;
        transition: .4s ease all;
        @media (max-width: 768px) {
            display: none;
        }

        .header-tou {
            img {
                box-shadow: inset 0 0 10px #000;
                padding: 5px;
                opacity: 1;
                transform: rotate(0);
                transition: all ease 1s;
                width: 130px;
                height: 130px;
                border-radius: 100%;
            }
        }

        .header-tou img:hover {
            transform: rotate(360deg);
        }

        .glitch {
            font-family: 'Ubuntu', sans-serif;
            position: relative;
            color: #fff;
            mix-blend-mode: lighten;
            margin: auto;
            font-size: 80px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .glitch:before, .glitch:after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0);
            clip: rect(0, 0, 0, 0);
        }

        .glitch:before {
            left: -1px;
            text-shadow: 1px 0 #ff3f1a;
        }

        .glitch:after {
            left: 1px;
            text-shadow: -1px 0 #00a7e0;
        }

        .glitch:hover:before {
            text-shadow: 4px 0 #ff3f1a;
            animation: glitch-loop-1 .8s infinite ease-in-out alternate-reverse;
        }

        .glitch:hover:after {
            text-shadow: -5px 0 #00a7e0;
            animation: glitch-loop-2 .8s infinite ease-in-out alternate-reverse;
        }

        @-webkit-keyframes glitch-loop-1 {
            0% {
                clip: rect(36px, 9999px, 9px, 0)
            }

            25% {
                clip: rect(25px, 9999px, 99px, 0)
            }

            50% {
                clip: rect(50px, 9999px, 102px, 0)
            }

            75% {
                clip: rect(30px, 9999px, 92px, 0)
            }

            100% {
                clip: rect(91px, 9999px, 98px, 0)
            }
        }

        @keyframes glitch-loop-1 {
            0% {
                clip: rect(36px, 9999px, 9px, 0)
            }

            25% {
                clip: rect(25px, 9999px, 99px, 0)
            }

            50% {
                clip: rect(50px, 9999px, 102px, 0)
            }

            75% {
                clip: rect(30px, 9999px, 92px, 0)
            }

            100% {
                clip: rect(91px, 9999px, 98px, 0)
            }
        }

        @-webkit-keyframes glitch-loop-2 {
            0% {
                top: -1px;
                left: 1px;
                clip: rect(65px, 9999px, 119px, 0)
            }

            25% {
                top: -6px;
                left: 4px;
                clip: rect(79px, 9999px, 19px, 0)
            }

            50% {
                top: -3px;
                left: 2px;
                clip: rect(68px, 9999px, 11px, 0)
            }

            75% {
                top: 0;
                left: -4px;
                clip: rect(95px, 9999px, 53px, 0)
            }

            100% {
                top: -1px;
                left: -1px;
                clip: rect(31px, 9999px, 149px, 0)
            }
        }

        @keyframes glitch-loop-2 {
            0% {
                top: -1px;
                left: 1px;
                clip: rect(65px, 9999px, 119px, 0)
            }

            25% {
                top: -6px;
                left: 4px;
                clip: rect(79px, 9999px, 19px, 0)
            }

            50% {
                top: -3px;
                left: 2px;
                clip: rect(68px, 9999px, 11px, 0)
            }

            75% {
                top: 0;
                left: -4px;
                clip: rect(95px, 9999px, 53px, 0)
            }

            100% {
                top: -1px;
                left: -1px;
                clip: rect(31px, 9999px, 149px, 0)
            }
        }

        .header-info {
            position: relative;
            width: 63%;
            margin: auto;
            font-size: 16px;
            color: #eaeadf;
            background: rgba(0, 0, 0, .5);
            padding: 15px;
            margin-top: 22px;
            letter-spacing: 0;
            line-height: 30px;
            border-radius: 10px;
            box-sizing: initial;
            white-space: nowrap;
        }

        .header-info:before {
            content: "";
            position: absolute;
            top: -30px;
            left: 50%;
            margin-left: -15px;
            border-width: 15px;
            border-style: solid;
            border-color: transparent transparent rgba(0, 0, 0, .5) transparent;
        }

        .header-info p {
            margin: 0;
            font-family: 'Ubuntu', sans-serif;
            font-weight: 700;

            span {
                margin: 0 10px;
            }
        }

        .top-social_v2 {
            height: 35px;
            margin-bottom: -10px;
            list-style: none;
            display: inline-block;
        }

        .top-social_v2 li {
            height: 35px;
            float: left;
            margin: 0 6px;
        }
        position: relative;
    }

    .top-social_v2 li {
        .img-box {
            position: absolute;
            border-radius: 6px;
            transition: .7s all ease;
            width: 121px;
            height: 121px;
            padding: 4px;
            background: rgba(0, 0, 0, .4);
            top: 40px;
            left: 50%;
            transform: translate3d(0, 50px, 0) translateX(-50%);
            opacity: 0;

            &:before {
                content: "";
                position: absolute;
                top: -30px;
                left: 50%;
                margin-left: -15px;
                border-width: 15px;
                border-style: solid;
                border-color: transparent transparent rgba(0, 0, 0, .4) transparent;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        .text-box {
            position: absolute;
            border-radius: 4px;
            transition: .7s all ease;
            background: rgba(0, 0, 0, .4);
            top: 40px;
            left: 50%;
            transform: translate3d(0, 50px, 0) translateX(-50%);
            opacity: 0;

            &:before {
                content: "";
                position: absolute;
                top: -30px;
                left: 50%;
                margin-left: -15px;
                border-width: 15px;
                border-style: solid;
                border-color: transparent transparent rgba(0, 0, 0, .4) transparent;
            }

            p {
                color: #ffffff;
                font-weight: normal;
                font-size: 12px;
                padding: 2px 5px;
            }
        }
    }

    .top-social_v2 li:hover .img-box {
        transform: translate3d(0, 16px, 0) translateX(-50%);
        opacity: 1;
        visibility: visible;
    }

    .top-social_v2 li:hover .text-box {
        transform: translate3d(0, 16px, 0) translateX(-50%);
        opacity: 1;
        visibility: visible;
    }

    .top-social_v2 li:hover .text-box {
        display: block;
    }

    .top-social_v2 img {
        height: 35px;
        width: 35px;
        padding: 6px;
        background: 0 0;
    }

    .flipx {
        -moz-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        transform: scaleX(-1);
    }


    .ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

</style>
