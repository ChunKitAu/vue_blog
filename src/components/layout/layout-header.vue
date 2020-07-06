<template>
    <div id="layout-header" :class="{'fixed':fixed,'hidden':hidden,'top':top}">
        <div v-show="open" >
            <SideMenu :category="category"></SideMenu>
        </div>
        <div class="site-open-nav">
           <a> <i class="iconfont icon-caidan2" @click="changeOpen"></i></a>
        </div>
        <div class="site-name">
            <router-link to="/">
                <h1>ChunKit</h1>
            </router-link>
        </div>
        <div class="site-menus">
<!--            <div class="menu-item header-search"><header-search/></div>-->
            <div class="menu-item"><router-link to="/"><i class="iconfont icon-fort-awesome"></i> 首页</router-link></div>
            <div class="menu-item hasChild">
                <a href="#"><i class="iconfont icon-caidan2"></i>分类</a>
                <div class="childMenu" v-if="category.length">
                    <div class="sub-menu" v-for="item in category" :key="item.name"><router-link :to="`/category/${item.id}`">{{item.name}}</router-link></div>
                </div>
            </div>
            <div class="menu-item"><router-link to="/tags"><i class="iconfont icon-biaoqian1"></i>标签墙</router-link></div>
            <div class="menu-item"><router-link to="/about"><i class="iconfont icon-biaoqian2"></i>关于</router-link></div>
            <div class="menu-item"><router-link to="/"><i class="iconfont icon-user"></i></router-link></div>
        </div>
    </div>
</template>

<script>
    import SideMenu from "../header_side_menu";
    export default {
        name: "layout-header",
        components: {
            SideMenu,
        },
        data() {
            return {
                open:false,
                lastScrollTop: 0,
                fixed: false,
                hidden: false,
                top:false,
                category: []
            }
        },
        mounted(){
            window.addEventListener('scroll', this.watchScroll)
            this.getCategorys()

            document.addEventListener('click',ev => {
                let thisClassName = ev.target.className;
                console.log(thisClassName);
                if(thisClassName != "iconfont icon-caidan2" ){
                    this.open = false;
                }
            })

        },
        beforeDestroy () {
            window.removeEventListener("scroll", this.watchScroll)
        },
        methods: {
            watchScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop === 0){
                    this.top = true;
                    this.fixed = false;
                } else if (scrollTop>=this.lastScrollTop){
                    this.fixed = false;
                    this.hidden = true;
                    this.top = false;
                } else {
                    this.fixed = true
                    this.hidden = false
                    this.top = false;
                }
                this.lastScrollTop = scrollTop
            },
            getCategorys() {
                var _this = this;
                _this.$axios.get("/type/list").then(
                    function (response) {
                        _this.category = response.data.data
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            },

            changeOpen(){
                var _this = this;
                _this.open = ! _this.open;
                console.log(_this.open)
            }
        }
    }
</script>

<style scoped lang="less">
    #layout-header {
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 70px;
        padding: 0 80px;
        display: inline;
        justify-content: space-between;
        align-items: center;
        transition: .3s all ease;
        -webkit-transition: .3s all ease;
        -moz-transition: .3s all linear;
        -o-transition: .3s all ease;
        -ms-transition: .3s all ease;

        &:hover {
            background-color: #ffffff;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            opacity: 0.9 !important;
        }

        &.top{
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
        }
        &.hidden{
            background-color: #FFFFFF;
            opacity: 0.9;
            /*top: -100px;*/
        }
        &.fixed{
            background-color: #FFFFFF;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }
    @media (max-width: 960px){
        #layout-header{
            padding: 0 20px;
        }
    }
    @media (max-width: 768px){
        #layout-header{
            padding: 0 10px;
        }
    }

    .site-name {
        float:left;
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        margin-top: 20px;
        @media (max-width: 768px){
            display: none;
        }
    }
    .site-open-nav{
        margin-top: 20px;
        display: none;
        @media (max-width: 768px){
            display: inline-block;
        }
    }

    .site-menus {
        float: right;
        display: flex;
        align-items: center;
        .menu-item {
            min-width: 60px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            position: relative;
            a{
                padding: 12px 10px;
                color: #545454;
                font-weight: 500;
                font-size: 16px;
                &:hover {
                    color: rgb(254, 150, 0);
                    border-bottom: solid;
                    border-bottom-width: 4px;
                    border-bottom-color: rgb(254, 150, 0);
                }
            }
            &:not(:last-child) {
                margin-right: 15px;
            }
            &.hasChild:hover .childMenu{
                opacity:1;
                visibility: visible;
                transform: translateY(-5px);
            }
        }
        @media (max-width: 768px){
            display:none;
        }


        .childMenu{
            width: 130px;
            background-color: #FDFDFD;
            border-radius: 3px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 55px;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transition: .7s all ease;
            -webkit-transition: .6s all ease;
            -moz-transition: .6s all linear;
            -o-transition: .6s all ease;
            -ms-transition: .6s all ease;
            &:before,&:after{
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 8px solid white;
                top: -8px;
                left: 20px;
            }
            &:before {
                top: -9px;
                border-bottom: 8px solid #ddd;
            }
            .sub-menu{
                height: 40px;
                line-height: 40px;
                position: relative;
                &:not(:last-child):after{
                    /*position: absolute;*/
                    content: '';
                    width: 50%;
                    height: 1px;
                    color: #ff6d6d;
                    bottom: 0;
                    left: 25%;
                    z-index: 99;
                }
            }
        }
    }
</style>
