<template>
    <div class="articles">
        <!-- 文章头部显示 -->
        <div class="ArticleTop">
            <div class='pattern-attachment-img'>
                <img class='lazyload' :src="blog.picture" alt=""/>
            </div>
            <div class='single-header'>
                <h1 class='entry-title'>{{blog.title}}</h1>
                <p class='entry-census'>
                    <!--                    <span class="bull">·</span>-->
                    <span>最后修改时间：{{blog.createTime}}</span>
                    <span class="bull">·</span>
                    <span>{{blog.views}}次阅读</span>
                </p>
            </div>
        </div>
        <!-- 文章正文-->
        <div class="content">

            <!--文章-->
            <div class="article_content my-box-shadow">
                <div id="blog_content"  v-html="blog.content" v-highlight/>
                <!-- todo:赞赏-->
                <!--声明-->
                <div class="open-message">
                    <p>声明：ChunKitAu|版权所有，违者必究|如未注明，均为原创|本网站采用<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">BY-NC-SA</a>协议进行授权</p>
                    <p>转载：转载请注明原文链接 - <a href="/"></a></p>
                </div>

                <!--评论-->
                <div class="CommentsWrapper">
                    <h3 class='comments-list-title'>Comments | <span class="noticom">评论 </span></h3>
                    <div>
                        <ul class='commentwrap' v-for="item in this.comments">
                            <Comment :comment="item" @changeCommentValue="getCommentValue"></Comment>
                            <template v-if="item.childComment">
                                <comment v-for="child in item.childComment"  :comment="child" :isChild="true" @changeCommentValue="getCommentValue"></comment>
                            </template>
                        </ul>
                    </div>
                    <div class="CommentTextarea" v-if="blog.commentabled" >
                        <!--输入框-->
                        <textarea
                                placeholder="你是我一生只会遇见一次的惊喜 ..."
                                name="comment"
                                class="commentbody"
                                id="comment"
                                rows="5" tabIndex="4"
                                v-model="commentValue"
                        />
                        <!--提交按钮-->
                        <div class='form-submit'>
                            <input type="submit" class="submit" value="BiuBiuBiu~"
                                   @click="postComment"
                            />
                        </div>
                    </div>
                    <p v-if="!blog.commentabled" class='text'>此处评论已关闭</p>
                </div>
            </div>

            <!-- 目录容器 -->
            <div class="article-dir-list" id="article-dir"></div>
        </div>
        </div>
</template>
<script>
    import {getArticleById,getAllCommentByBlogId,postComment} from "@/api/apis";
    import Banner from '@/components/banner'
    import ArticleButtom from '@/components/ariticle/article_buttom'
    import Comment from "@/components/comment";
    import marked from "marked";

    import katelog from "@/utils/katelog.min.js"

    export default {
        name: 'articles',
        data() {
            return {
                id: 0,
                blog: "",
                comments: [],
                imgUrl: "",
                commentValue:'',
                parentCommentId:'',
                menus: [],
            }
        },
        components: {
            Banner,
            ArticleButtom,
            Comment
        },
        methods: {
            //获取文章
            getAticle() {
                var _this = this;
                getArticleById(_this.id).then(res => {
                    //markdown渲染
                    _this.blog = res.data.data;
                    var content = marked(res.data.data.content);
                    _this.blog.content = content;
                    _this.imgUrl = res.data.data.picture;

                    document.title = _this.blog.title
                })
            },
            getComment() {
                var _this = this;
                getAllCommentByBlogId(_this.id).then(res=>{
                    _this.comments =res.data.data;
                })
            },

            setCatelog(){

            },

            getCommentValue(val){
                var _this =this;
                _this.commentValue = '@'+val.parentUserName+':';
                _this.parentCommentId = val.parentCommentId;
            },

            postComment(){
                var _this = this;
                if(this.$store.getters.token){
                    var content ;
                    if(_this.parentCommentId === ''){
                        content = _this.commentValue;
                    }else {
                        var s =  _this.commentValue.split(':');
                        content = s[1];
                    }
                    postComment({
                        parentCommentId:_this.parentCommentId === ''? 0 :_this.parentCommentId,
                        content:content,
                        blogId:_this.id,
                    }).then(res =>{
                        _this.getComment();
                    });
                }else {
                    alert("请先登陆!");
                }

            },
        },
        mounted() {
            var _this = this;
            _this.id = this.$route.params.id;
            setTimeout(() => {
                _this.getAticle();
                _this.getComment();
                _this.setCatelog();
            }, 500);

        },
        updated() {
            new katelog({
                contentEl: 'blog_content',
                catelogEl: 'article-dir',
                linkClass: 'k-catelog-link',
                linkActiveClass: 'k-catelog-link-active',
                supplyTop: 20,
                selector: ['h1', 'h2'],
                active: function (el) {
                }
            });
        },
        destroyed() {
        },
    }
</script>
<style lang="less">
    //头部文章标题
    .ArticleTop {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, .3);
        }

        .pattern-attachment-img {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            background-origin: border-box;
            width: 100%;
            height: 350px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                pointer-events: none;
            }
        }

        .single-header {
            max-width: 900px;
            padding: 0 10px;
            margin-left: 15%;
            margin-right: auto;
            text-align: left;
            top: auto;
            bottom: 20px;
            position: absolute;
            left: 0;
            right: 0;
            color: #fff;
            text-shadow: 2px 2px 10px #000;
            z-index: 1;

            .entry-title {
                font-size: 32px;
                width: 100%;
                color: #fff;
                font-weight: bold;
            }

            .entry-census {
                color: #fff;
                font-size: 14px;
                padding: 18px 0 0;
                line-height: 39px;

                span {
                    color: #fff;
                    font-size: 14px;

                    img {
                        width: 35px;
                        height: 35px;
                        border-radius: 100%;
                        float: left;
                        margin-right: 12px;
                    }
                }

                .bull {
                    margin: 0 5px;
                }
            }
        }

        @media (max-width: 768px) {
            .pattern-attachment-img {
                height: 280px;
            }

            .single-header {
                .entry-title {
                    font-size: 24px;
                }

                .entry-census {
                    padding: 0;
                }
            }
        }
    }
    .articles{
        .content{
            width: 90%;
            margin: 25px auto;
            //左侧目录
            .article-dir-list {
                margin-left: 15px;
                font-size: 14px;
                display: inline-block;
                width: 22%;
                position: sticky;
                top: 50px;
                color: #606266;
                padding: 15px;
                height: 500px;
                /*box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);*/
                overflow-x: hidden;
                overflow-y: hidden;
                &::-webkit-scrollbar {
                    display: none;
                }
                div {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .article-dir-link {
                    cursor: pointer;
                    height: 25px;
                    line-height: 25px;
                }
                .left-dir ul,
                li {
                    margin: 10px 0;
                }
                .k-catelog-level-1 {
                    text-indent: 0;
                }
                .k-catelog-level-2 {
                    text-indent: 1.5em;
                }
                .k-catelog-level-3 {
                    text-indent: 3em;
                }
                .k-catelog-level-4 {
                    text-indent: 4.5em;
                }
               .k-catelog-link-active {
                    font-weight: 900;
                    color: #fe9600;
                    animation: blink 1s linear infinite;
                    /* 其它浏览器兼容性前缀 */
                    -webkit-animation: blink 1.2s linear infinite;
                    -moz-animation: blink 1.2s linear infinite;
                    -ms-animation: blink 1.2s linear infinite;
                    -o-animation: blink 1.2s linear infinite;
                }

                @media (max-width: 800px){
                    display: none;
                }
            }

            /*右侧文章内容样式 具体修改style.less 文件 */
            .article_content {
                margin-left: 10%;
                display: inline-block ;
                vertical-align: top;
                width: 65%;
                font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
                padding: 8px 25px 15px 25px;
                @media (max-width: 800px){
                    margin-left: 0.1%;
                    width: 100%;
                }

            }
            #blog_content {
                .hljs {
                    color: #a9b7c6;
                    background: #282c33;
                    overflow-x: auto;
                    border-radius: 10px;
                    font-size: 15px;
                    font-family: "Source Code Pro", Consolas, Menlo, Monaco, "Courier New", monospace !important;
                }
            }

            //声明
            .open-message {
                margin: 50px 0;
                position: relative;
                background: #2B2B2B;
                padding: 10px 30px;
                border-radius: 5px;
                font-size: 14px;
                color: #fff;
                &:after {
                    content: "";
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid #2B2B2B;
                    position: absolute;
                    top: -8px;
                    left: 48%;
                }
                p {
                    margin: 10px 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                a {
                    color: #A0DAD0;
                    padding: 0 5px;
                }
            }

            //  评论
            .CommentsWrapper {
                padding-top: 40px;

                .comments-list-title {
                    width: 100%;
                    margin: 0 auto;
                    margin-bottom: 40px;
                    color: #7d7d7d;
                    font-weight: 400;

                    span {
                        font-size: 13px;
                        font-weight: 400;
                        color: #909090;
                    }
                }

                .commentwrap {
                    margin: 0 auto 30px;

                }

                .pagination {
                    margin: 20px 0;

                    .ant-pagination-item {
                        border: none;
                        font-family: inherit;
                        font-size: 15px;
                    }

                    .ant-pagination-item a {
                        font-family: inherit;
                        font-size: 15px;
                    }

                    .ant-pagination-item-active a {
                        color: #FE9600;
                    }

                    .ant-pagination-item:focus a, .ant-pagination-item:hover a {
                        color: #FE9600;
                    }

                    .ant-pagination-next, .ant-pagination-prev {
                        color: #FE9600;
                        font-family: inherit;
                        font-size: 15px;
                    }

                    .ant-pagination-next span, .ant-pagination-prev span {
                        color: #FE9600;
                        font-family: inherit;
                        font-size: 15px;
                    }

                    .ant-pagination-next:hover span, .ant-pagination-prev:hover span {
                        color: #FE9600;
                    }

                    .ant-pagination-disabled span {
                        color: rgba(0, 0, 0, 0.25);
                    }

                    .ant-pagination-disabled:hover span {
                        color: rgba(0, 0, 0, 0.25);
                    }
                }

                .text {
                    font-size: 14px;
                    padding: 20px 0;
                }

            }
            //回复框
            .CommentTextarea {
                position: relative;
                .commentbody {
                    width: 100%;
                    background: transparent url("https://view.moezx.cc/images/2018/03/24/comment-bg.png") no-repeat scroll right center / contain;
                    padding: 21px 21px 20px;
                    font-size: 14px;
                    display: block;
                    height: 180px;
                    margin-bottom: 10px;
                    color: rgb(83, 90, 99);
                    border: 1px solid rgb(221, 221, 221);
                    resize: vertical;
                    border-radius: 6px;
                    outline: currentcolor none medium;
                };

                .commentbody:focus {
                    border: 1px solid #FE9600;
                }

                .form-submit {
                    clear: both;
                    display: block;
                    overflow: hidden;
                    margin: 20px 0;

                    input {
                        background: #fff;
                        border-radius: 6px;
                        width: 100%;
                        margin: 0;
                        padding: 15px 25px;
                        text-transform: none;
                        color: #535a63;
                        -webkit-transition: all .1s ease-out;
                        -moz-transition: all .1s ease-out;
                        transition: all .1s ease-out;
                        box-shadow: none;
                        border: 1px solid #ccc;
                        text-shadow: none;
                    }

                    input:hover {
                        border: 1px solid #fe9600;
                        border-color: #FE9600;
                        color: #FE9600;
                    }
                }

            }
        }
    }



</style>
