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
    import AriticleList from'@/components/ariticle/article_list'

    import {getTypeById,getTypeListById,getTagById,getTagListById} from '@/api/apis'

    export default {
        name: 'Category',
        data() {
            return {
                toBannerMessage:'',
                categoryName:'',
                tagName:'',
                features: [],
                ariticleList: [],
                currPage: 1,
                hasNextPage: false,

                tgaId:'',
                typeId:'',
                searchWords:"",
            }
        },
        components: {
            Banner,
            AriticleList,
        },
        computed: {
            getSearchWords() {
                return this.$route.params.words
            },
            getCategory() {
                return this.$route.params.cate
            },
            getTagId(){
                return this.$route.params.tagId
            }
        },
        methods: {
            //获取当前分类的信息
            getCategoryName(categoryId){
                var _this = this;
                getTypeById(categoryId).then(res=>{
                    _this.categoryName = res.data.data.name;
                })
            },
            //获取当前分类的所有文章
            getCategoryList(categoryId) {
                var _this = this;
                getTypeListById(categoryId,{ page:_this.currPage,size:10}).then(res=>{
                        _this.ariticleList = res.data.data;
                        if(_this.currPage < res.data.data[0].totalPage)
                            _this.hasNextPage = true;
                        else
                            _this.hasNextPage = false
                    })
            },
            //获取当前标签的信息
            getTagName(tagId){
                var _this = this;
                getTagById(tagId).then(res=>{
                    _this.tagName = res.data.data.name
                })
            },
            //获取当前标签的所有文章
            getTagList(tagId){
                var _this = this;
                getTagListById(tagId,{ page:_this.currPage,size:10}).then(res=>{
                    _this.ariticleList = res.data.data
                    if(_this.currPage < res.data.data[0].totalPage)
                        _this.hasNextPage = true
                    else
                        _this.hasNextPage = false
                })
            },
            //加载更多
            loadMore() {
                var _this = this;
                _this.currPage = _this.currPage + 1;
                if(_this.getTagId){
                    getTagListById(_this.getTagId,{
                        page:_this.currPage,size:10
                    }).then(res=>{
                        res.data.data.forEach((item,index)=>{
                            _this.ariticleList
                                .push(item)
                        });
                        if(_this.currPage < res.data.data[0].totalPage)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    })
                }else if(_this.getCategory) {
                    getTypeListById(_this.getCategory,{
                        page:_this.currPage,size:10
                    }).then(res=>{
                        res.data.data.forEach((item,index)=>{
                            _this.ariticleList
                                .push(item)
                        });
                        if(_this.currPage < res.data.data[0].totalPage)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    })
                }
            }
        },
        mounted() {
            var _this = this;
            if(_this.getTagId){
                _this.getTagList(_this.getTagId);
                _this.getTagName(_this.getTagId);
                setTimeout(() => {
                    document.title = '标签：'+_this.tagName;
                    _this.toBannerMessage = _this.tagName;
                },300)
            }else if(_this.getCategory){
                _this.getCategoryList(_this.getCategory);
                _this.getCategoryName(_this.getCategory);
                setTimeout(() => {
                    document.title = '分类：'+_this.categoryName;
                    _this.toBannerMessage = _this.categoryName;
                },300)
            }
        },
        watch:{
            //监听相同路由下参数变化的时候，从而实现异步刷新
            "$route": function(){
                var _this = this;
                if(_this.getTagId){
                    _this.getTagList(_this.getTagId);
                    _this.getTagName(_this.getTagId);
                    setTimeout(() => {
                        document.title = '标签：'+_this.tagName;
                        _this.toBannerMessage = _this.tagName;
                    },300)
                }else if(_this.getCategory){
                    _this.getCategoryList(_this.getCategory);
                    _this.getCategoryName(_this.getCategory);
                    setTimeout(() => {
                        document.title = '分类：'+_this.categoryName;
                        _this.toBannerMessage = _this.categoryName;
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
