package com.iicl.blog.demoblog_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iicl.blog.demoblog_app.model.Blog;


public interface BlogRepository extends JpaRepository<Blog, Long> {
}

