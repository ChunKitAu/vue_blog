<template>
    <div id="banner">
        <div class="banner-img" :style="{'background-image': `url(${imgUrl})`}">
            <template v-if="isTags">
                <div class="pattern-header">
                    <h1>标签墙</h1>
                </div>
            </template>
            <template v-if="message">
                <div class="focusinfo">
                    <div class="pattern-header">
                        <h1>{{message}}</h1>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        props: {
            imgUrl: {
                type: String,
                default: 'http://qiniu2.19t.wang/img_24.jpg'
            },
            isTags: {
                type: [Boolean, String],
                default: false
            },
            message: {
                type: [String],
                default: ''
            }
        },
    }
</script>

<style scoped lang="less">
    #banner {
        position: relative;
        margin-top: 70px;
        width: 100%;
        height: 400px ;
        .banner-img {
            width: inherit;
            height: 400px;
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
    }

    .focusinfo {
        position: relative;
        max-width: 800px;
        padding: 0 10px;
        top: 49.3%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        text-align: center;
        z-index: 99;
        -webkit-transition: .4s ease all;
        -moz-transition: .4s ease all;
        -o-transition: .4s ease all;
        transition: .4s ease all;
        @media (max-width: 768px){
            display: none;
        }

    }

    .pattern-header {
        position: absolute;
        top: 45%;
        left: 0px;
        right: 0px;
        text-align: center;
        color: rgb(255, 255, 255);
        z-index: 1;
        font-size: 70px;
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
