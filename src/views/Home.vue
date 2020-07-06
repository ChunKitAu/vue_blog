<template>
    <div class="home" >
        <HomeBanner ></HomeBanner>
        <div class="site-content animate">
            <!--文章列表-->
            <main class="site-main" id="blog_list">
                <!--      <section-title v-if="!hideSlogan">推荐</section-title>-->
                <template v-for="(item,index) in ArticleList">
                    <HoneArticleList :post="item" :index="index"></HoneArticleList>
                </template>
            </main>
        </div>
        <!--加载更多-->
        <div class="more" v-show="hasNextPage">
            <div class="more-btn" @click="loadMore">More</div>
        </div>

    </div>
</template>

<script>
    import HomeBanner from '@/components/home_banner.vue'
    import HoneArticleList  from "../components/home_article_list";
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
                _this.$axios.get("/article/list", {
                    params: {
                        page: _this.currPage,
                        size: 10
                    }
                }).then(
                    function (response) {
                        _this.ArticleList = response.data.data
                        if (_this.currPage < response.data.data[0].totalPgae)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },
            loadMore() {
                var _this = this;
                _this.currPage = _this.currPage + 1
                _this.$axios.get("/article/list", {
                    params: {
                        page: _this.currPage,
                        size: 10
                    }
                }).then(
                    function (response) {
                        response.data.data.forEach((item,index)=>{
                            _this.ArticleList.push(item)
                        })
                        if (_this.currPage < response.data.data[0].totalPgae)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    },
                    function (error) {
                        console.log(error);
                    }
                )
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
