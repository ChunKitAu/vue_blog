<template>
    <div class="home">
        <banner isHome="true"></banner>
        <div class="site-content animate">
            <!--通知栏-->
            <div class="notify">
                <div class="search-result" >
                    <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
                    <span v-else-if="category">分类 "{{categoryName}}" 相关文章</span>
                    <span v-else-if="tag_Id">标签 "{{tagName}}" 相关文章</span>
                </div>
            </div>
            <!--文章列表-->
            <main class="site-main" >
                <template v-for="item in ariticleList">
                    <AriticleList :post="item" :key="item.id"></AriticleList>
                </template>
            </main>

            <!--加载更多-->
            <div class="more" v-show="hasNextPage">
                <div class="more-btn" @click="loadMore">More</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/pre/banner'
    import sectionTitle from '@/components/pre/section-title'
    import AriticleList from'@/components/pre/article_list'

    export default {
        name: 'Category',
        props: ['cate', 'words','tagId'],
        data() {
            return {
                categoryName:'',
                tagName:'',
                features: [],
                ariticleList: [],
                currPage: 1,
                hasNextPage: false
            }
        },
        components: {
            Banner,
            sectionTitle,
            AriticleList,
        },
        computed: {
            searchWords() {
                return this.$route.params.words
            },
            category() {
                return this.$route.params.cate
            },
            tag_Id(){
                return this.$route.params.tagId
            }
        },
        methods: {
            //获取当前分类的信息
            getCategoryName(){
                var _this = this;
                const categoryId = this.$route.params.cate
                _this.$axios.get("/type/"+categoryId).then(
                    function (response) {
                        _this.categoryName = response.data.data.name
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },
            //获取当前分类的所有文章
            getCategoryList() {
                var _this = this;
                const cateId = this.$route.params.cate
                _this.$axios.get("/article/type/list/"+cateId,{params:{ page:_this.currPage,size:10}}).then(
                    function (response) {
                        _this.ariticleList = response.data.data
                        if(_this.currPage < response.data.data[0].totalPgae)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },
            //获取当前标签的信息
            getTagName(){
                var _this = this;
                const tagId = this.$route.params.tagId
                _this.$axios.get("/tag/"+tagId).then(
                    function (response) {
                        _this.tagName = response.data.data.name
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },
            //获取当前标签的所有文章
            getTagList(){
                var _this = this;
                const tagId = this.$route.params.tagId
                _this.$axios.get("/article/tag/list/"+tagId,{params:{ page:_this.currPage,size:10}}).then(
                    function (response) {
                        _this.ariticleList = response.data.data
                        if(_this.currPage < response.data.data[0].totalPgae)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },
            //加载更多
            loadMore() {
                var _this = this;
                _this.currPage = _this.currPage + 1
                _this.$axios.get("/article/list",{params:{ page:_this.currPage,size:10}}).then(
                    function (response) {
                        _this.postList.push({post:response.data.data})
                        if(_this.currPage < response.data.data[0].totalPgae)
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
            if(this.tag_Id){
                this.getTagList();
                this.getTagName();
            }else if(this.category){
                this.getCategoryList();
                this.getCategoryName();
            }
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

    .more{
        margin: 50px 0;
        .more-btn{
            width: 100px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #ADADAD;
            border: 1px solid #ADADAD;
            border-radius: 20px;
            margin: 0 auto;
            cursor: pointer;
            &:hover{
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
