<template>
    <div id="app" class="entry-content" v-highlight>
        <div id="blog_content" v-html="vhtml"></div>
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
                vhtml: "",
                catalogProps: {
                    container: "#blog_content",
                    watch: true,
                    height: "calc(100% - 100px)",
                    levelList: ["h1", "h2", "h3", "h4", "h5"],
                    title: "Contents"
                }
            };
        },
        mounted() {
            var that = this;
            setTimeout(() => {
                const blogId = this.$route.params.id
                that.$axios.get("/article/"+blogId).then(
                    function (response) {
                        //markdown渲染
                        var MarkdownIt = require("markdown-it")
                        var md = new MarkdownIt()
                        var content = md.render(response.data.data.content)
                        console.log(content)
                        that.vhtml = content
                    },
                    function (error) {
                        console.log(error);
                    }
                )

            }, 2000);
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
