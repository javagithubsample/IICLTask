package com.iicl.blog.demoblog_app.service;

import org.springframework.stereotype.Service;

import com.iicl.blog.demoblog_app.exception.ResourceNotFoundException;
import com.iicl.blog.demoblog_app.model.Blog;
import com.iicl.blog.demoblog_app.repository.BlogRepository;

import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    public BlogServiceImpl(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @Override
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id " + id));
    }

    @Override
    public Blog updateBlog(Long id, Blog updatedBlog) {
        Blog blog = getBlogById(id);
        blog.setTitle(updatedBlog.getTitle());
        blog.setContent(updatedBlog.getContent());
        blog.setAuthor(updatedBlog.getAuthor());
        return blogRepository.save(blog);
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = getBlogById(id);
        blogRepository.delete(blog);
    }
}
