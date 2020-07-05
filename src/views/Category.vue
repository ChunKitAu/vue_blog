<template>
    <div class="home">
        <banner :message="toBannerMessage"></banner>
        <div class="site-content animate">
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
    import Banner from '@/components/banner'
    import AriticleList from'@/components/article_list'

    export default {
        name: 'Category',
        props: ['cate', 'words','tagId'],
        data() {
            return {
                toBannerMessage:'',
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
            var _this = this;
            if(_this.tag_Id){
                _this.getTagList();
                _this.getTagName();
                setTimeout(() => {
                    document.title = '标签：'+_this.tagName
                    _this.toBannerMessage = '标签：'+_this.tagName+'-相关文章'
                },300)

            }else if(_this.category){
                _this.getCategoryList();
                _this.getCategoryName();
                setTimeout(() => {
                    document.title = '分类：'+_this.categoryName
                    _this.toBannerMessage = '分类：'+_this.categoryName+'-相关文章'
                },300)

            }
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

    }

    /******/
</style>
