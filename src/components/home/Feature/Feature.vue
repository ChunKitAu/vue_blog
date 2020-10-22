<template>
    <div class="top-feature-row" >
        <div class="top-feature-item" v-for="item in data">
            <router-link :to="`/article/${item.id}`">
                <div class="img-box">
                    <img :src='item.picture' alt=""/>
                </div>
                <div class='info'>
                    <h3 class='ellipsis'>{{item.title}}</h3>
                    <p class='ellipsis-two'>{{item.summary}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Feature",
        props: {
            data: {
                type: Array,
            },
        },
    }
</script>

<style scoped lang="less">
    .top-feature-row {
        display: flex;
        margin-left: -8px;
        margin-right: -8px;

        .top-feature-item {
            position: relative;
            height: 160px;
            box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
            overflow: hidden;
            border-radius: 10px;

            box-sizing: border-box;
            width: 32.5%;
            flex: 0 0 auto;
            float: left;

            margin-left: 4px;
            margin-right: 4px;
            a {
                display: block;
                height: 100%;
            }

            .img-box {
                transition: all .35s ease-in-out;
                transform: scale(1);
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            &:hover .img-box {
                transform: scale(1.2);
            }

            &:hover .info {
                visibility: visible;
                opacity: 1;
                h3 {
                    transform: translateX(0);
                }

                p {
                    transform: translateX(0);
                }
            }

            .info {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                text-align: center;
                backface-visibility: hidden;
                background: #333;
                background: rgba(0, 0, 0, .6);
                visibility: hidden;
                opacity: 0;
                transition: all .35s ease-in-out;

                h3 {
                    text-transform: uppercase;
                    color: #fff;
                    text-align: center;
                    font-size: 17px;
                    padding: 10px;
                    background: #111;
                    margin: 40px 0 0;
                    transition: all .35s ease-in-out;
                    transform: translateX(-100%);
                }

                p {
                    font-style: italic;
                    font-size: 12px;
                    position: relative;
                    color: #bbb;
                    padding: 0 20px;
                    text-align: center;
                    transition: all .35s .1s linear;
                    transform: translateX(100%);
                    margin-top: 15px;
                    height: 40px;
                    line-height: 20px;
                }
            }
        }
    }

    .ellipsis{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .ellipsis-two{
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>
