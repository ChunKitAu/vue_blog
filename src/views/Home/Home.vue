<template>
    <div class="home">
        <HomeBanner></HomeBanner>
        <div class="site-content animate">
            <!--文章列表-->
            <main class="site-main" id="blog_list">
<!--                      <section-title v-if="!hideSlogan">推荐</section-title>-->
                <template v-for="(item,index) in ArticleList">
                    <HoneArticleList :post="item" :index="index"></HoneArticleList>
                </template>
            </main>
        </div>
        <!--加载更多-->

        <div class="more" v-show="hasNextPage">
            <div class="more-btn" @click="loadMore">More</div>
        </div>
        <div class="no_more" v-show="!hasNextPage">
            <div>没有了</div>
        </div>
    </div>
</template>

<script>
    import HomeBanner from '@/components/home/home_banner'
    import HoneArticleList from "@/components/home/home_article_list";
    import {getArticles} from "@/api/apis";

    export default {
        name: 'Home',
        data() {
            return {
                ArticleList: [],
                currPage: 1,
                hasNextPage: false
            }
        },
        components: {
            HomeBanner,
            HoneArticleList
        },
        methods: {
            fetchList() {
                var _this = this;
                getArticles({
                    page: _this.currPage,
                    size: 10
                }).then(res=>{
                    _this.ArticleList = res.data.data
                    if (_this.currPage < res.data.data[0].totalPage)
                        _this.hasNextPage = true
                    else
                        _this.hasNextPage = false
                })
            },
            loadMore() {
                var _this = this;
                _this.currPage = _this.currPage + 1
                getArticles({
                    page: _this.currPage,
                    size: 10
                }).then(res=>{
                    res.data.data.forEach((item, index) => {
                        _this.ArticleList.push(item)
                    })
                    if (_this.currPage < res.data.data[0].totalPage)
                        _this.hasNextPage = true
                    else
                        _this.hasNextPage = false
                })
            }
        },
        mounted() {
            // this.fetchFocus();
            this.fetchList();
        }

    }
</script>

<style scoped lang="less">
    .top-feature {
        width: 100%;
        height: auto;
        margin-top: 30px;

        .feature-content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            position: relative;

            .feature-item {
                width: 32.9%;
            }
        }
    }

    .site-main {
        padding-top: 80px;

        &.search {
            padding-top: 0;
        }
    }

    .more {
        margin: 50px 0;

        .more-btn {
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;

            &:hover {
                color: #8fd0cc;
                border: 1px dashed #8fd0cc;
            }
        }
    }


    .no_more{
        display: block;
        height: 1px;
        width: 100%;
        margin: 24px 0;
        background-color: #dcdfe6;
        position: relative;
        div{
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            position: absolute;
            background-color: #fff;
            padding: 0 20px;
            color: #303133;
            font-weight: 500;
            font-size: 14px;
        }
    }

    /******/
    @media (max-width: 800px) {
        .top-feature {
            display: none;
        }

        .site-main {
            padding-top: 40px;
        }

    }

    /******/
</style>
