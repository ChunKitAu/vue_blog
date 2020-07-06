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
            getCategoryName(categoryId){
                var _this = this;
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
            getCategoryList(categoryId) {
                var _this = this;
                _this.$axios.get("/article/type/list/"+categoryId,{params:{ page:_this.currPage,size:10}}).then(
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
            getTagName(tagId){
                var _this = this;
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
            getTagList(tagId){
                var _this = this;
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
                        response.data.data.forEach((item,index)=>{
                            _this.ariticleList
                                .push(item)
                        })
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
                _this.getTagList(this.$route.params.tagId);
                _this.getTagName(this.$route.params.tagId);
                setTimeout(() => {
                    document.title = '标签：'+_this.tagName
                    _this.toBannerMessage = _this.tagName
                },300)
            }else if(_this.category){
                _this.getCategoryList(this.$route.params.cate);
                _this.getCategoryName(this.$route.params.cate);
                setTimeout(() => {
                    document.title = '分类：'+_this.categoryName
                    _this.toBannerMessage = _this.categoryName
                },300)
            }
        },
        watch:{
            //监听相同路由下参数变化的时候，从而实现异步刷新
            "$route": function(){
                console.log(1)
                var _this = this;
                if(_this.tag_Id){
                    _this.getTagList(_this.tag_Id);
                    _this.getTagName(_this.tag_Id);
                    setTimeout(() => {
                        document.title = '标签：'+_this.tagName
                        _this.toBannerMessage = _this.tagName
                    },300)
                }else if(_this.category){
                    _this.getCategoryList(_this.category);
                    _this.getCategoryName(_this.category);
                    setTimeout(() => {
                        document.title = '分类：'+_this.categoryName
                        _this.toBannerMessage = _this.categoryName
                    },300)
                }
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
