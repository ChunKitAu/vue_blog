<template>
    <div id="banner" class="home-banner">
        <div class="banner-img" :style="{'background-image': `url(${imgUrl})`}">
            <template>
                <br>
                <!--博主信息-->
                <div class="focusinfo">
                    <!-- 头像 -->
                    <div class="header-tou">
                        <img :src="websiteInfo.avatar">
                    </div>
                    <div class="header-name">
                        <p>ChunKit.Au</p>
                    </div>
                    <!-- 简介 -->
                    <div class="header-info">
                        <p>{{websiteInfo.slogan}}</p>
                        <!-- 社交信息 -->
                        <div class="top-social">
                            <div v-for="item in socials" :key="item.id" :title="item.title">
                                <a :href="item.href" target="_blank" :style="{'color':item.color}">
                                    <i class="iconfont" :class="item.icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <!--左右倾斜-->
                <div class="slant-left"></div>
                <div class="slant-right"></div>
            </template>
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
                        icon: "iconqq",
                        id: 1,
                        title: "QQ",
                    },
                    {
                        color: "black",
                        href: "https://github.com/ChunKitAu",
                        icon: "icongithub",
                        id: 2,
                        title: "GitHub"
                    },
                ],
            }
        },
        props: {
            imgUrl: {
                type: String,
                default: 'http://qiniu2.19t.wang/img_24.jpg'
            },
        },
        created() {

        },
        methods: {
            // getSocial(){
            //     this.$store.dispatch('getSocials').then(data =>{
            //         this.socials = data
            //     })
            // },
            // getWebSiteInfo(){
            //     this.$store.dispatch('getSiteInfo').then(data =>{
            //         console.log(data)
            //         this.websiteInfo = data
            //     })
            // }
        }
    }
</script>

<style scoped lang="less">

    #banner {
        position: relative;
        margin-top: 70px;
        width: 100%;
        height: 600px !important;
        .banner-img {
            width: inherit;
            height: 600px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            transition: all 0.2s linear;
            overflow: hidden;

            &:hover {
                //变大
                /*transform: scale(1.1, 1.1);*/
                /*filter: contrast(130%);*/
            }
        }

        &.home-banner {
            width: 100%;
            height: 600px;
            background-attachment: fixed;
            background-size: cover;
            z-index: 1;
            margin: 0px;
            padding: 0px;
            background-position: center top;
            background-repeat: no-repeat;

            .banner-img {
                background-position: center center;
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-size: cover;
                z-index: -1;
                transition: unset;

                &:hover {
                    transform: unset;
                    filter: unset;
                }
            }

            .slant-left {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 100px solid #FFF;
                border-right: 800px solid transparent;
                left: 0;
                top: 500px;
                bottom: 0;
            }

            .slant-right {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 100px solid #FFF;
                border-left: 800px solid transparent;
                right: 0;
                top: 500px;
                bottom: 0;
            }
        }
    }

    .header-name{
        font-family: Ubuntu, sans-serif;
        position: relative;
        color: rgb(255, 255, 255);
        mix-blend-mode: lighten;
        font-size: 80px;
        text-transform: uppercase;
        font-weight: bold;
        margin: auto;
    }
    .header-tou{
        font-size: 100%;
        vertical-align: baseline;
        margin: 0px;
        padding: 0px;
        border-width: 0px;
        border-style: initial;
        border-color: initial;
        border-image: initial;
        img{
            box-shadow: rgb(0, 0, 0) 0px 0px 10px inset;
            opacity: 1;
            transform: rotate(0deg);
            width: 130px;
            height: 130px;
            padding: 5px;
            border-radius: 100%;
            //旋转360度
            transition: all 2s ease 0s;
            -webkit-transition: All 0.4s ease-in-out;
            -moz-transition: All 0.4s ease-in-out;
            -o-transition: All 0.4s ease-in-out;
        }
        img:hover {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
        }
    }

    .focusinfo {
        position: relative;
        max-width: 800px;
        padding: 0 10px;
        top: 350px;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        text-align: center;

        .header-info {
            position: relative;
            width: 63%;
            font-size: 16px;
            color: rgb(234, 234, 223);
            letter-spacing: 0px;
            line-height: 30px;
            box-sizing: initial;
            white-space: nowrap;
            margin: 22px auto auto;
            background: rgba(0, 0, 0, 0.5);
            padding: 15px;
            border-radius: 10px;
            p{
                font-family: Ubuntu, sans-serif;
                font-weight: 700;
                margin: 0px;
            }
        }

        .top-social {
            height: 35px;
            margin-bottom: -10px;
            display: inline-block;
            list-style: none;
            div {
                float: left;
                margin-right: 10px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                width: 32px;
                border-radius: 100%;
            }
        }
    }
    @media (max-width: 960px) {
        #banner {
            height: 400px;
        }
    }

    @media (max-width: 800px) {
        #banner {
            display: none;
        }
    }
</style>
