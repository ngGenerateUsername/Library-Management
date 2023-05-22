package com.example.workspace.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workspace.models.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{

}
