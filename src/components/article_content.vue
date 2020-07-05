<template>
    <div id="app" class="entry-content" v-highlight>
        <div id="blog_content" v-html="blog"></div>
        <side-catalog class="catalog" v-bind="catalogProps"  v-bind:class="{ 'isFixed': catalogFixed,  }">
            <template #default="{level, isActive}">
                <i :class="['line-style', isActive ? 'line-style--active' : '']"></i>
            </template>
        </side-catalog>
    </div>
</template>

<script>
    import "vue-side-catalog/lib/vue-side-catalog.css";
    import SideCatalog from "vue-side-catalog";
    export default {
        name: "app",
        components: {
            SideCatalog
        },
        data() {
            return {
                catalogFixed:false,
                blog:String,
                catalogProps: {
                    container: "#blog_content",
                    watch: true,
                    height: "calc(100% - 100px)",
                    levelList: ["h1", "h2", "h3", "h4", "h5"],
                    iconLeft: true,
                    lineLeft: 0
                }
            };
        },
        props:{
            vhtml: String,
        },
        mounted() {
            var that = this;
            setTimeout(() => {
                that.blog = that.vhtml
            },1000)
            window.addEventListener('scroll', this.handleScroll)
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
        methods:{
            handleScroll () {
                var _this = this
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                // 400
                if (scrollTop > 400) {
                    _this.catalogFixed = true
                } else {
                    _this.catalogFixed = false
                }


            },
        },

    };
</script>

<style scoped lang="less">
    p {
        text-indent: 2em;
    }
    &.isFixed{
        position: fixed !important;
        width: 300px !important;
        right: 0 !important;
        top: 80px !important;
    }
    .catalog {
        position: absolute;
        width: 300px;
        right: 0;
        top: 480px;
        /* height: calc(100% - 100px); */
    }
    .line-style {
        display: inline-block;
        height: 20px;
        width: 3px;
        background: transparent;
        color: rgb(254, 150, 0);
    }
    .line-style--active {
        color: rgb(254, 150, 0);
        background: currentColor;
    }
</style>
