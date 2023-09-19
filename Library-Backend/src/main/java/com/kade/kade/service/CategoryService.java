package com.kade.kade.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kade.kade.entity.Category;

@Service
public interface CategoryService {
    List<Category> getAllCategories();
    Category getcategoryById(Long id);
    Category createcategory(Category category);
    Category updateCategory(Long id,Category category);
    void deleteCategory(Long id);
}
