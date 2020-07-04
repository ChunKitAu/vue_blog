<template>
    <div id="app" v-cloak>
        <loading></loading>
        <layout-header></layout-header>
        <layout-body></layout-body>
        <layout-footer></layout-footer>
    </div>
</template>
<script>
    import loading from "./components/pre/loading";
    import layoutHeader from '@/components/pre/layout/layout-header.vue'
    import layoutBody from '@/components/pre/layout/layout-body'
    import layoutFooter from '@/components/pre/layout/layout-footer'

    export default {
        name: "app",
        components: {
            layoutHeader,
            layoutBody,
            layoutFooter,
            loading
        }
    }
</script>
<style lang="less">
    #app {
        font-size: 17px;
        color: #6f6f6f;
    }
</style>
