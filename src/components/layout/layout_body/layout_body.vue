<template>
    <div id="layout-body">
        <vueCanvasNest :config="{color:'0,0,0', count: 200,opacity:0.9}" :el="'#layout-body'"></vueCanvasNest>
        <router-view></router-view>
    </div>
</template>

<script>
    import vueCanvasNest from 'vue-canvas-nest'

    export default {
        name: "layout-body",
        data(){
          return{
              minHeight: 600
          }
        },
        components: {
            vueCanvasNest
        }
    }
</script>

<style scoped>
#layout-body{
    /* header = 80px */
    min-height: -moz-calc(100vh - 80px);
    min-height: -webkit-calc(100vh - 80px);
    min-height: calc(100vh - 80px);
}
</style>
