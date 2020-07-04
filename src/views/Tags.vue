<template>
    <div>
        <banner isTags="true" imgUrl="https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"></banner>
        <br><br>
        <div class="tag_div">
            <template v-for="item in tags">
                <tag :tag="item" :key="item.id"></tag>
            </template>
        </div>

    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Tag from '@/components/tag'
    export default {
        name: "Tags",
        components:{
            Banner,
            Tag
        },
        data(){
            return {
                tags: [],
            }
        },
        methods:{
            getTags(){
                var _this = this;
                _this.$axios.get("/tag/list",{params:{ page:1,size:100}}).then(
                    function (response) {
                        _this.tags = response.data.data
                    },
                    function (error) {
                        console.log(error);
                    }
                )
            }
        },
        created() {
          this.getTags();
        }
    }
</script>

<style scoped>
    .tag_div{
        min-height: 600px;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
