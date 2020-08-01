<template>
    <div class="HomeWrapper">
        <HomeBanner></HomeBanner>
        <div class="MainWrapper " id="content">
            <div class="FeatureWrapper">
                <div class="FeatureTitle" id="hook">
                    <h1><i class='iconfont icon-anchor'/><span> START:DASH!!</span></h1>
                </div>
                <Feature :data="recommentArticle"></Feature>
            </div>

            <div class="HomeList" >
                <div class="FeatureTitle">
                    <h1><i class='iconfont icon-envira'/><span> Discovery:</span></h1>
                </div>
                <!--文章列表-->
                <main  id="blog_list">
                    <template v-for="(item,index) in ArticleList">
                        <HoneArticleList :post="item" :index="index"></HoneArticleList>
                    </template>
                </main>

                <!--加载更多-->
                <div class="more" v-show="hasNextPage">
                    <div class="more-btn" @click="loadMore">More</div>
                </div>
                <div class="no_more" v-show="!hasNextPage">
                    <div>没有了</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HomeBanner from '@/components/home/home_banner'
    import HoneArticleList from "@/components/home/home_article_list";
    import Feature from "../../components/home/Feature/Feature";
    import {getArticles, getRecommendArticle} from "@/api/apis";

    export default {
        name: 'Home',
        data() {
            return {
                recommentArticle: [],
                ArticleList: [],
                currPage: 1,
                hasNextPage: false
            }
        },
        components: {
            HomeBanner,
            HoneArticleList,
            Feature
        },
        methods: {
            fetchList() {
                var _this = this;
                getArticles({
                    page: _this.currPage,
                    size: 10
                }).then(res => {
                    _this.ArticleList = res.data.data
                    if (_this.currPage < res.data.data[0].totalPage)
                        _this.hasNextPage = true
                    else
                        _this.hasNextPage = false
                })
            },

            getRecommendArticles() {

                getRecommendArticle().then(res => {
                    this.recommentArticle = res.data.data;
                })
            },
            loadMore() {
                var _this = this;
                _this.currPage = _this.currPage + 1
                getArticles({
                    page: _this.currPage,
                    size: 10
                }).then(res => {
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
            this.getRecommendArticles();
        }

    }
</script>

<style scoped lang="less">
    .MainWrapper{
        width:100%;
        max-width: 900px;
        padding: 0 10px;
        margin-left: auto;
        margin-right: auto;
        background-color: rgba(255,255,255,.8);
        animation: main 1s;
        @keyframes main {
            0% {
                opacity: 0;
                transform: translateY(50px)
            }
            100% {
                opacity: 1;
                transform: translateY(0)
            }
        }
    }
    .HomeList{
        width: 100%;
    }

    .HomeWrapper {
        width: 100%;
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

    .no_more {
        display: block;
        height: 1px;
        width: 100%;
        margin: 24px 0;
        background-color: #dcdfe6;
        position: relative;

        div {
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


    .FeatureWrapper {
        width: 100%;
        height: auto;

        @media (max-width: 768px) {
            display: none;
        }


    }

    .FeatureTitle {
        width: 100%;
        height: auto;
        margin-top: 55px;
        display: inline-block;

        h1 {
            color: #666;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
            line-height: 24px;
            padding-bottom: 5px;
            margin-bottom: 30px;
            border-bottom: 1px dashed #ececec;
        }

        @media ( max-width: 768px ) {
            margin-top: 15px;
            h1 {
                margin-bottom: 15px;
            }
        }
    }

</style>
