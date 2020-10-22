<template>
    <div class="sideMenu " @click.stop>
        <div class="m-avatar">
            <img alt="" src="https://avatars2.githubusercontent.com/u/49512581?s=60&v=4">
        </div>
        <p class="name ellipsis">ChunKit.Au</p>
        <p class="info ellipsis">Tomorrow may be cruel, but, I want see</p>
        <ul class="menu">
            <li class="item flex-items"><router-link to="/"><i class="iconfont icon-fort-awesome"></i> 首页</router-link></li>
            <li class="item flex-items" > <HeaderSearch></HeaderSearch></li>
            <li ><span class="item flex-items"><i class="iconfont icon-caidan2"></i><span>分类</span></span>
                <ul class="sub-menu">
                    <li class="item flex-items" v-for="item in category" :key="item.name"><router-link :to="`/category/${item.id}`">{{item.name}}</router-link></li>
                </ul>
            </li>
            <li class="item flex-items"><router-link to="/tags"><i class="iconfont icon-archive"></i>标签墙</router-link></li>
            <li class="item flex-items"><router-link to="/about"><i class="iconfont icon-biaoqian2"></i>关于</router-link></li>
        </ul>
    </div>
</template>

<script>
    import HeaderSearch from "@/components/header_search/header_search";
    export default {
        name: "home_open",
        components: {
            HeaderSearch,
        },
        props:{
            category: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
    }
</script>

<style scoped lang="less">

    .sideMenu {
        position: fixed;
        left: 0px;
        bottom: 0px;
        top: 0px;
        background-color: rgb(255, 255, 255);
        width: 55%;
        z-index: 99;
        transition-duration: 0.5s;
        overflow-y: scroll;
        transform: translateX(0px) translateY(0px);
        .m-avatar {
            width: 100%;
            height: auto;
            text-align: center;
            padding: 30px 0px 20px;
            img{
                width: 90px;
                height: 90px;
                max-width: 90px;
                border-radius: 100%;
            }
        }
        .name {
            margin-bottom: 10px;
            text-align: center;
            font-size: 13px;
            color: rgb(51, 51, 51);
            padding: 0px 15px;
        }
        .info {
            margin-bottom: 10px;
            text-align: center;
            font-size: 13px;
            color: rgb(51, 51, 51);
            position: relative;
            padding: 0px 15px 15px;
        }
        .menu {
            position: relative;
            .item {
                position: relative;
                color: rgb(51, 51, 51);
                font-size: 14px;
                padding: 10px 15px;
            }
        }
        ul, li {
            margin: 0px;
        }
        ol, ul {
            list-style: none;
        }
        .sub-menu {
            padding-left: 15px;
        }
    }

    .ellipsis {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .flex-items {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
    }
</style>
