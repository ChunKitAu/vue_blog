<template>
    <div class="blog-item post-list-show" :class="index%2==0?'right':'left'">
        <div class='post-thumb'>
            <router-link :to="`/article/${post.id}`">
                <img :src="post.picture"/>
            </router-link>
        </div>
        <div class='post-content-wrap'>
            <div class='post-content'>
                <div class='post-date'>
                    <i class='iconfont icon-biaoqian'/>
                    发布于 {{post.createTime | parseTime}}
                </div>

                <router-link class="post-title" :to="`/article/${post.id}`"><h3>{{post.title}}</h3></router-link>

                <div class='post-meta'>
                        <span>
                            <i class='iconfont icon-eye'/>
                            {{post.views}} 热度
                        </span>
                         <span class='comments-number'>
                            <i class='iconfont icon-pinglun'/>
                            {{post.comments}}  评论
                        </span>
                </div>

                <div class='float-content'>
                    <p>{{post.summary}}</p>
                    <div class='post-bottom'>
                        <router-link :to="`/article/${post.id}`">
                            <i class="iconfont icon-caidan-gengduo"></i>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "home_article_list",
        props: {
            post: {
                type: Object
            },
            index:''
        }
    }
</script>

<style scoped lang="less">
    .blog-item {
        width: 100%;
        height: 300px;
        position: relative;
        margin: 30px 0;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0);
        box-shadow: 0 1px 20px -6px rgba(0, 0, 0, .5);
        opacity: 0;
        transition: box-shadow .3s ease;
        @media (min-width: 768px) {
            &:hover {
                box-shadow: 0 5px 10px 5px rgba(110, 110, 110, .4);
            }

            &:hover img {
                transform: scale(1.1);
            }
        }

        .post-thumb {
            float: right;
            width: 55%;

            a {
                height: 300px;
                position: relative;
                display: block;
                background-repeat: no-repeat;
                background-size: cover;
                overflow: hidden;
                border-radius: 0 10px 10px 0;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: none;
                    transition: all .6s;
                    filter: blur(0px);
                }
            }
        }
    }

    .post-content-wrap {
        position: relative;
        display: inline-block;
        float: right;
        padding-right: 30px;
        padding-left: 0;
        width: 40%;
        margin: 30px 10px 0;

        .post-date, .post-meta, .post-meta a {
            color: #888;
            font-size: 14px;
        }

        i {
            margin-right: 5px;
            color: #989898;
            font-size: 14px;
        }

        .post-title {
            display: block;
            margin: 18px 0;

            h3 {
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                word-wrap: break-word;
                font-size: 16px;
                font-weight: bold;
                color: #504e4e;
                transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;
            }

            &:hover h3 {
                color: #FE9600;
            }
        }

        .comments-number {
            margin: 0 10px;
        }

        .float-content {
            position: relative;
            width: 100%;
            right: 0;
            margin: 0;
            padding: 0;
            z-index: 50;
            color: rgba(0, 0, 0, .66);

            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                height: 69px;
                overflow: hidden;
                margin: 16px 0 22px 0;
                font-size: 15px;
                color: rgba(0, 0, 0, .66);
                line-height: 23px;
            }

            i {
                font-size: 25px;
                color: #666;

                &:hover {
                    color: #FE9600;
                }
            }
        }
    }

    .right {
        .post-thumb {
            float: left;

            a {
                border-radius: 10px 0 0 10px;
            }
        }

        .post-content-wrap {
            float: left;
            padding-left: 30px;
            padding-right: 0;
            text-align: right;
            margin: 30px 10px 10px 0;
        }
    }

    .post-list-show {
        animation: post-list-show .5s;
        -webkit-animation: post-list-show .5s;
        opacity: 1;
    }

    @keyframes post-list-show {
        0% {
            opacity: 0;
            -webkit-transform: translateY(80px);
            transform: translateY(80px)
        }
        100% {
            opacity: 1;
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
    }

    @media (max-width: 768px) {
        .blog-item {
            margin: 0;
            height: auto;
            padding: 0;
            border: 0;
            box-shadow: none;

            .post-thumb {
                width: 100%;
                left: 0;
                clear: initial;

                a {
                    height: 210px;
                    border-radius: 10px;
                }
            }

            .post-content-wrap {
                clear: initial;
                width: 100%;
                left: 0;
                text-align: left;
                margin: 0;
                padding: 20px;
                float: none;
                box-shadow: none;
                border-top: 0;

                .post-title {
                    margin: 10px 0;
                    font-size: 14px;
                }

                .float-content {
                    p {
                        margin: 10px 0;
                        font-size: 14px;
                    }
                }
            }
        }
    }

</style>
