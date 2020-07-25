<template>
    <li class='comment' :class="{'child':isChild}">
        <div class='commentinfo flex-items'>
            <img :src="comment.avatar===''?'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture':comment.avatar" alt=""/>
            <div class='commeta cell'>
                <h2>{{comment.userName}} <span v-if="comment.parentUserName">| @{{comment.parentUserName}} </span></h2>
                <h3>{{comment.createTime}}</h3>
            </div>
            <a @click="setValue(comment.userName,comment.id)" class='comment-reply-link'>Reply</a>
        </div>
        <div class='body'>
            <p> {{comment.content}}</p>
        </div>
        <hr/>
    </li>
</template>

<script>
    export default {
        name: "comment",
        props:{
            comment:{
                type:Object,
            },
            isChild:{
                type: Boolean,
                default:false,
            },
        },
        methods:{
            setValue(parentUserName,parentCommentId){
                this.$emit('changeCommentValue',{
                    parentUserName : parentUserName,
                    parentCommentId : parentCommentId,
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .comment {
        .commentinfo {
            img {
                width: 40px;
                height: 40px;
                border-radius: 100%;
                box-shadow: 0 1px 10px -6px rgba(0, 0, 0, .5);
                margin-right: 15px;
            }

            .commeta {
                h2 {
                    color: #FE9600;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 20px;
                }

                h3 {
                    line-height: 20px;
                    font-size: 12px;
                    letter-spacing: 0px;
                    text-transform: none;
                    color: rgba(0, 0, 0, .35);
                }
            }

            .cell{
                -moz-box-flex: 1;
                flex: 1 1 0%;
                width: 0px;
            }

            .comment-reply-link {
                font-size: 12px;
                display: block;
                margin-left: 10px;
                float: right;
                text-transform: uppercase;
                color: #fff;
                height: 20px;
                background-color: #FE9600;
                line-height: 20px;
                padding: 0 6px;
                border-radius: 3px;
                opacity: 0;
                transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;
            }
        }

        &:hover .comment-reply-link {
            opacity: .9;
        }

        .body {
            line-height: 32px;
            color: #63686d;
            border-bottom: 1px solid rgba(0, 0, 0, .05);
            position: relative;

            p {
                font-size: 14px;
                line-height: 30px;
                margin-top: 10px;
                padding-bottom: 20px;
                padding-left: 3px;
                color: #63686d;

                span {
                    font-size: 12px;
                    color: #909090;
                    margin-right: 3px;
                }
            }
        }

        hr {
            height: 0;
            width: 100%;
            background: #eee;
            border: 0;
            margin: 10px 0
        }
    }
    .child{
        padding-left: 50px;
    }
    .flex-items {
        -moz-box-align: initial;
        align-items: initial;
        display: flex;
    }
</style>
