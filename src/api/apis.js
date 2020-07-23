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

//认证
export const githubOAuth = () => {
    return http.get(urls.GithubOAuth);
}


