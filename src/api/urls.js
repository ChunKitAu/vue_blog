export const urls = {
    // 获取文章列表
    getArticles: "/article/list",
    //根据id获取文章
    getArticleById:'/article/',


    //获取分类的信息
    getTypeById:'/type/',
    //获取分类下所有文章
    getTypeListById:'/article/type/list/',
    //分页获取所有分类
    getTypes:'/type/list',


    //获取标签信息
    getTagById:'/tag/',
    //获取标签下所有文章
    getTagListById:'/article/tag/list/',
    //分页获取所有标签
    getTags:'/tag/list',


    //github认证
    GithubOAuth:'/oauth/authorize'



}
