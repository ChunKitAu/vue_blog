<template>
    <div class="home">
        <banner :message="toBannerMessage"></banner>
        <div class="site-content animate">
            <div class="page-header">
                <h1 class="page-title" v-if="searchValue" >" {{searchValue}} "搜索结果:</h1>
                <h1 class="page-title" v-else-if="toBannerMessage">" {{toBannerMessage}} "相关文章:</h1>
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
            <div class="no_more" v-show="!hasNextPage">
                <div>No  More</div>
            </div>

        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import AriticleList from'@/components/ariticle/article_list'
    import {getTypeById,getTypeListById,getTagById,getTagListById,getSearchList} from '@/api/apis'

    export default {
        name: 'Category',
        data() {
            return {
                toBannerMessage:'',
                categoryName:'',
                tagName:'',
                ariticleList: [],
                currPage: 1,
                hasNextPage: false,
                tgaId:'',
                typeId:'',
                searchValue:"",
            }
        },
        components: {
            Banner,
            AriticleList,
        },
        computed: {
            getSearchWords() {
                return this.$route.params.searchValue
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
                    if(res.data.data){
                        if(_this.currPage === 1){
                            _this.ariticleList = res.data.data;
                        }else{
                            res.data.data.forEach((item,index)=>{
                                _this.ariticleList.push(item)
                            });
                        };

                        if(_this.currPage < res.data.data[0].totalPage)
                            _this.hasNextPage = true;
                        else
                            _this.hasNextPage = false
                    }
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
                    if(res.data.data){
                        if(_this.currPage === 1){
                            _this.ariticleList = res.data.data;
                        }else{
                            res.data.data.forEach((item,index)=>{
                                _this.ariticleList.push(item)
                            });
                        };
                        if(_this.currPage < res.data.data[0].totalPage)
                            _this.hasNextPage = true
                        else
                            _this.hasNextPage = false
                    }
                })
            },
            //获取搜索结果
            getSearchLists(searchValue){
                var _this = this;
                getSearchList({
                    current:_this.currPage,
                    size:10,
                    keyWord:searchValue
                }).then(res=>{
                    if(res.data.data.content){
                        if(_this.currPage === 1){
                            _this.ariticleList = res.data.data.content;
                        }else{
                            res.data.data.content.forEach((item,index)=>{
                                _this.ariticleList.push(item)
                            });
                        };
                        if(_this.currPage < res.data.data.totalPages)
                            _this.hasNextPage = true;
                        else
                            _this.hasNextPage = false;
                    }
                });
            },

            //加载更多
            loadMore() {
                var _this = this;
                _this.currPage = _this.currPage + 1;
                if(_this.getTagId){
                    _this.getTagList(_this.getTagId);
                }else if(_this.getCategory) {
                    _this.getCategoryList(_this.getCategory);
                }else if(_this.getSearchWords){
                    _this.getSearchWords(_this.getSearchWords);
                }
            },

            //初始化数据
            initData(){
                var _this = this;
                _this.searchValue = "";
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
                }else if(_this.getSearchWords){
                    _this.searchValue =_this.getSearchWords;
                    _this.getSearchLists(_this.getSearchWords);
                    setTimeout(() => {
                        document.title = '搜索：'+_this.searchValue;
                        _this.toBannerMessage = _this.searchValue;
                    },300)
                }
            }
        },
        mounted() {
            this.initData();
        },
        watch:{
            //监听相同路由下参数变化的时候，从而实现异步刷新
            "$route": function(){
                this.initData();
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

    .page-header{
        position: relative;
        text-align: center;
        margin-bottom: 50px;
        color: #9C9C9C;
        h1{
            font-size: 20px;
            font-weight: 400;
            border: 1px dashed #ddd;
            padding: 15px;
            color: #828282;
        }
    }

</style>
