<template>
    <div class="post-footer">
        <div class="donate" @click="showDonate=!showDonate">
            <p>赏</p>
            <ul class="donate_inner" :class="{'show':showDonate}">
                <li class="wedonate"><img src="http://cdn.fengziy.cn/gblog/wexin_pay.png"><p>微信</p></li>
                <li class="alidonate"><img src="http://cdn.fengziy.cn/gblog/ali_pay.jpg"><p>支付宝</p></li>
            </ul>
        </div>
    </div>

</template>

<script>
    //todo : 赞赏图片位置
    export default {
        name: "section-title",
        data(){
            return{
                showDonate:false
            }
        }
    }
</script>

<style scoped lang="less">
    .post-footer {
        width: 100%;
        padding: 20px 10px;
        margin-top: 30px;
        height: 65px;
        position: relative;
        text-align: center;
        i{
            font-size: 18px;
            margin-right: 5px;
        }
        .post-like {
            float: right;
            margin: 7px 0 0 20px;
        }
        .donate {
            position: relative;
            width: 40px;
            height: 40px;
            font-size: 18px;
            color: rgb(255, 255, 255);
            text-align: center;
            display: inline-block;
            cursor: pointer;
            padding: 7px;
            border-radius: 100%;
            background: rgb(211, 72, 54);
            &:hover{
                border: 1px solid goldenrod;
                p{
                    color: goldenrod;
                }
            }
            p {
                font-size: 20px;
                vertical-align: baseline;
                margin: 0px;
                padding: 0px;
                border-width: 0px;
                border-style: initial;
                border-color: initial;
                border-image: initial;
            }
            .donate_inner {
                display: none;
                margin: 0;
                list-style: none;
                position: absolute;
                left: 80px;
                top: -40px;
                background: #FFF;
                padding: 10px;
                border: 1px solid #ddd;
                box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
                border-radius: 3px;
                z-index: 999;
                &.show{
                    display: block;
                }
                li {
                    float: left;
                }
                img {
                    width: 100px;
                }
                p {
                    text-align: center;
                    font-size: 15px;
                    color: #D2D2D2;
                    line-height: 1rem;
                }
            }

            .donate_inner:after, .donate_inner:before {
                content: "";
                position: absolute;
                left: 0;
                bottom: 45%;
                margin-left: -8px;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-right: 8px solid #fff;
            }
            .donate_inner:before {
                left: -1px;
                border-right: 8px solid #ddd;
            }
        }
    }
</style>
