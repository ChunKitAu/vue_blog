import HttpRequest from "./http";
import { urls } from "./urls";
const http = HttpRequest.getInstance();

//文章
export const getArticles = (data) => {
    return http.get(urls.getArticles, data);
}

export const getArticleById = (id) => {
    return http.get(urls.getArticleById + id);
}
export const getRecommendArticle = () => {
    return http.get(urls.getRecommendArticle );
}



//分类
export const getTypeById = (id) => {
    return http.get(urls.getTypeById + id);
}

export const getTypeListById = (id,data) => {
    return http.get(urls.getTypeListById + id,data);
}
export const getTypes = (data) => {
    return http.get(urls.getTypes,data);
}

//标签
export const getTagById = (id) => {
    return http.get(urls.getTagById + id);
}

export const getTagListById = (id,data) => {
    return http.get(urls.getTagListById + id,data);
}
export const getTags = (data) => {
    return http.get(urls.getTags,data);
}


//评论
export const getAllCommentByBlogId = (id) => {
    return http.get(urls.getAllCommentByBlogId+ id);
}
export const postComment = (data) => {
    return http.post(urls.postComment,data);
}

//认证
export const githubOAuth = () => {
    return http.get(urls.GithubOAuth);
}

//搜索
export const getSearchList = (data) => {
    return http.get(urls.getSearchList,data);
}


