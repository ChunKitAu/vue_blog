<template>
    <div v-highlight>
        <div
                id="content"
                v-html="readme"
        ></div>
    </div>
</template>

<script>
    export default {
        name: "toc"
    }
</script>

<style scoped>

</style>
