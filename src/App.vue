<template>
    <div id="app" v-cloak>
        <loading></loading>
        <layout-header></layout-header>
        <layout-body></layout-body>
        <layout-footer></layout-footer>
    </div>
</template>
<script>
    import loading from "@/components/loading";
    import layoutHeader from '@/components/layout/layout_header'
    import layoutBody from '@/components/layout/layout_body'
    import layoutFooter from '@/components/layout/layout_footer'
    export default {
        name: "app",
        components: {
            layoutHeader,
            layoutBody,
            layoutFooter,
            loading,
        }
    }
</script>
<style lang="less">
    #app {
        font-size: 17px;
        color: #6f6f6f;
    }
</style>
