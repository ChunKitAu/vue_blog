import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue'),
    meta: { title: '首页'}
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/Article/Article.vue'),
    meta: { title: '文章'}
  },
    {
      path: '/category/:cate',
      name: 'Category',
      component: () => import('../views/Type_Tag_Search/Type_Tag_Search.vue'),
      meta: { title: '分类', params: 'cate'}
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/Tags/Tags.vue'),
      meta: { title: '分类'}
    },
    {
      path: '/tag/:tagId',
      name: 'Tag',
      component: () => import('../views/Type_Tag_Search/Type_Tag_Search.vue'),
      meta: { title: '标签', params: 'tagId'}
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//设置loading 和title
router.beforeEach((to, from, next) => {
  let title = 'MyBlog'
  if (to.meta.params){
    title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
  }else {
    title = `${to.meta.title} - ${title}`
  }
  document.title = title
  store.dispatch('setLoading', true);
  next();
})
router.afterEach((to, from) => {
  // 最多延迟 关闭 loading
  setTimeout(() => {
    store.dispatch('setLoading', false);
  }, 1500)
})
export default router
