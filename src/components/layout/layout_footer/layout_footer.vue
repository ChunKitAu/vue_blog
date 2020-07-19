<template>
    <div id="layout-footer">
        <div class="copyright">
            © 2020  <a target="_blank" class="out-link" href="https://19t.wang">ChunKitAu</a>
            <br>
             <a target="_blank" class="out-link" href="#">粤ICP备19161974号-1</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layout-footer",
    }
</script>

<style scoped lang="less">
#layout-footer{
    padding: 2%;
    border-top: 1px solid #F7F7F7;
    font-size: 13px;
    color: #9c9c9c;
    a.out-link:hover{
        color: #ff6d6d;
    }
    .copyright{
        text-align: center;
    }
}
</style>
