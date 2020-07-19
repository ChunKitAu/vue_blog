<template>
        <span v-bind:style="randomRgb(tag.id)">
            <router-link :to="`/tag/${tag.id}`"><i class="iconfont icon-biaoqian"></i>  {{tag.name}}({{tag.num}})</router-link>
        </span>
</template>

<script>
    export default {
        name: "tag",
        props: {
            tag: {
                type: Object
            }
        },
        methods:{
            randomRgb(item) {
                let R = Math.floor(Math.random() * 255);
                let G = Math.floor(Math.random() * 255);
                let B = Math.floor(Math.random() * 255);
                return {
                    width: (item.num / item.total * 100) + '%', // 进度条
                    background: 'rgb(' + R + ',' + G + ',' + B + ')'
                };
            }
        }
    }
</script>

<style scoped>
    span{
        margin-right: 15px;
        margin-bottom: 15px;
        padding: 2px 20px;
        background-color:rgb(114, 102, 186);
        color:#fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        -webkit-font-feature-settings: "tnum";
        font-feature-settings: "tnum","tnum";
        display: inline-block;
        height: auto;
        white-space: nowrap;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        cursor: default;
        opacity: 1;
        -webkit-transition: all .3s cubic-bezier(.78,.14,.15,.86);
        transition: all .3s cubic-bezier(.78,.14,.15,.86);
    }
</style>
