package com.iicl.blog.demoblog_app.service;

import java.util.List;
import com.iicl.blog.demoblog_app.model.Blog;

public interface BlogService {
    Blog createBlog(Blog blog);
    List<Blog> getAllBlogs();
    Blog getBlogById(Long id);
    Blog updateBlog(Long id, Blog blog);
    void deleteBlog(Long id);
}

