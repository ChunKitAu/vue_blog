<template>
    <div id="app" class="entry-content" v-highlight>
        <div id="blog_content" v-html="blog"></div>
        <side-catalog class="catalog" v-bind="catalogProps"></side-catalog>
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
                blog:String,
                catalogProps: {
                    container: "#blog_content",
                    watch: true,
                    height: "calc(100% - 100px)",
                    levelList: ["h1", "h2", "h3", "h4", "h5"],
                    title: "Contents"
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
        }
    };
</script>

<style scoped>
    p {
        text-indent: 2em;
    }
    .catalog {
        position: fixed;
        width: 300px;
        right: 0;
        top: 100px;
        /* height: calc(100% - 100px); */
    }
</style>
