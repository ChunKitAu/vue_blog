<template>
    <div class="home">
        <Banner isHome="true"></Banner>
        <div class="site-content animate">
            <!--文章列表-->
            <main class="site-main" >
                <!--      <section-title v-if="!hideSlogan">推荐</section-title>-->
                <template v-for="item in ArticleList">
                    <AriticleList :post="item" :key="item.id"></AriticleList>
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
    import Banner from '@/components/banner'
    import AriticleList from'@/components/article_list'
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
            Banner,
            AriticleList
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
                        _this.postList.push({post: response.data.data})
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

    .site-content {
        .notify {
            margin: 60px 0;
            border-radius: 3px;

            & > div {
                padding: 20px;
            }
        }


        .search-result {
            padding: 15px 20px;
            text-align: center;
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            color: #828282;
        }
    }

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

        .site-content {
            .notify {
                margin: 30px 0 0 0;
            }

            .search-result {
                margin-bottom: 20px;
                font-size: 16px;
            }
        }
    }

    /******/
</style>
