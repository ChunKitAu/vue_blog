<template>
    <div id="banner">
        <div class='pattern-center-blank'/>
        <div class="top">
            <div class="pattern-attachment-img">
                <img class='lazyload' src='https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture' alt=""/>
            </div>
            <template v-if="isTags">
                <div class="pattern-header">
                    <h1>标签墙</h1>
                </div>
            </template>
            <template v-if="message">
                <div class="pattern-header">
                    <h1>{{message}}</h1>
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
        .pattern-center-blank{
            padding-top: 75px;
            background-color: #fff;
        }
        @media(max-width:768px){
            .pattern-center-blank{
                padding-top: 50px;
            }
        }
    }

    .top{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        &:before{
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0,0,0,.3);
        }
        &:after{
            content: '';
            width: 150%;
            height: 4.375rem;
            background: #fff;
            left: -25%;
            bottom: -2.875rem;
            border-radius: 100%;
            position: absolute;
        }
        .pattern-attachment-img{
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            background-origin: border-box;
            width: 100%;
            height: 400px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                pointer-events: none;
            }
        }
        .pattern-header {
            position: absolute;
            top: 45%;
            left: 0;
            right: 0;
            text-align: center;
            color: #fff;
            z-index: 20;
            h1{
                color: #fff;
                font-size: 40px;
                font-weight: 500;
                width: 80%;
                margin: auto;
                padding: 0;
                border: 0;
            }
        }
        @media(max-width:768px){
            .pattern-attachment-img{
                height:280px;
            }
            .pattern-header {
                top:40%;
                h1{
                    font-size:24px;
                }
            }
        }
    }
</style>
