<template>
    <div class="tagsWrapper">
        <banner :isTags="true"></banner>
        <div class="mainWrapper">
            <template v-for="item in tags">
                <tag :tag="item" :key="item.id"></tag>
            </template>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import Tag from '@/components/tag'
    import {getTags} from'@/api/apis'

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
                getTags({ page:1,size:100}).then(res=>{
                    _this.tags = res.data.data
                })
            }
        },
        created() {
          this.getTags();
        }
    }
</script>

<style scoped lang="less">
    .mainWrapper{
        min-height:600px;
        max-width: 900px;
        padding: 0 10px;
        margin-left: auto;
        margin-right: auto;
        padding-top:50px;
        background-color: rgba(255,255,255,.8);
        animation: main 1s;
        @keyframes main {
            0% {
                opacity: 0;
                transform: translateY(50px)
            }
            100% {
                opacity: 1;
                transform: translateY(0)
            }
        }
        .example{
            height:52px;
            line-height:52px;
            text-align: center;
            i{
                background-color: #FE9600;
            }
        }
        .tags-list{
            span{
                padding: 2px 20px;
                margin-right:15px;
                margin-bottom:15px;
            }
            a{
                line-height:22px;
            }
            p{
                width: 100%;
                padding: 20px 0;
                text-align: center;
                margin: 40px 0 80px;
                display: inline-block;
                color: #989898;
                font-size: 15px;
            }
        }
        @media(max-width:768px){
            padding-top:30px;
            min-height:400px;
            .page-header{
                margin-bottom: 30px;
                h1{
                    font-size: 16px;
                    font-weight: 400;
                    border: 1px dashed #ddd;
                    padding:10px;
                    color: #828282;
                }
            }
        }
    }

</style>
