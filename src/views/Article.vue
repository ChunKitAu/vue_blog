<template>
    <div class="articles">
        <banner v-bind:imgUrl="blog.picture"></banner>
        <div class="site-content animate">
            <main class="site-main">
                <article class="hentry">
                    <!-- 文章头部 -->
                    <header class="entry-header">
                        <!-- 标题输出 -->
                        <h1 class="entry-title">{{blog.title}}
                            <!-- 阅读次数 -->
                            <div class="post-like">
                                <i class="iconfont iconeyes"></i>
                                <span class="count">{{blog.views}}</span>
                            </div>
                        </h1>
                        <hr>
                        <div class="breadcrumbs">
                            <div id="crumbs">最后更新时间：{{blog.updateTime}}</div>
                        </div>

                    </header>

                    <!-- 正文输出 -->
                    <ArticleContent :vhtml="blog.content"></ArticleContent>

                    <!-- 文章底部 -->
                    <ArticleButtom></ArticleButtom>

                    <!--声明-->
                    <div class="open-message">
                        <p>声明：ChunKit's 博客|版权所有，违者必究|如未注明，均为原创|本网站采用<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">BY-NC-SA</a>协议进行授权</p>
                        <p>转载：转载请注明原文链接 </p>
                    </div>
<!--                    todo: 评论-->
                    <!--评论-->
<!--                    <div class="comments">-->
<!--                        <comment v-for="item in comments" :key="item.comment.id" :comment="item.comment">-->
<!--                            <template v-if="item.reply.length">-->
<!--                                <comment v-for="reply in item.reply" :key="reply.id" :comment="reply"></comment>-->
<!--                            </template>-->
<!--                        </comment>-->
<!--                    </div>-->
                </article>
            </main>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import ArticleButtom from '@/components/article_buttom'
    import ArticleContent from   '@/components/article_content'

    export default {
        name: 'articles',
        data(){
            return{
                id:"",
                showDonate: false,
                blog:"",
                comments: [],
                imgUrl:"",
            }
        },
        components: {
            Banner,
            ArticleButtom,
            ArticleContent,
        },
        methods: {
            //获取文章
            getAticle(){
                var _this = this;
                const blogId = this.$route.params.id
                _this.$axios.get("/article/"+blogId).then(
                    function (response) {
                        //markdown渲染
                        var MarkdownIt = require("markdown-it")
                        var md = new MarkdownIt()
                        _this.blog = response.data.data
                        var content = md.render(response.data.data.content)
                        _this.blog.content = content
                        _this.imgUrl = response.data.data.picture
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },

            getComment(){
            }
        },
        mounted() {
            var _this = this;
            this.getAticle();
            setTimeout(() => {
                document.title = this.blog.title
            },300)
        }
    }
</script>
<style scoped lang="less">
    .site-content {
        .site-main {
            padding: 80px 0 0 0;
        }
    }
    article.hentry {
        .entry-header {
            .entry-title {
                font-size: 23px;
                font-weight: 600;
                color: #737373;
                margin: 0.67em 0;

                &:before {
                    content: "#";
                    margin-right: 6px;
                    color: #d82e16;
                    font-size: 20px;
                    font-weight: 600;
                }
            }

            hr {
                height: 1px;
                border: 0;
                background: #EFEFEF;
                margin: 15px 0;
            }

            .breadcrumbs {
                font-size: 14px;
                color: #D2D2D2;
                text-decoration: none;
                margin-bottom: 30px;
            }
        }

        .entry-content {}
        .post-like {
            float: right;
            margin: 7px 0 0 20px;
        }
        .open-message {
            margin: 50px 0;
            position: relative;
            background: #2B2B2B;
            padding: 10px 30px;
            border-radius: 3px;
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
    }
</style>
