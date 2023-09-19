package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.Category;
import com.kade.kade.repository.CategoryRepository;

@Service
public class CategoryServiceImp implements CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImp(CategoryRepository categoryRepository){
        this.categoryRepository=categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
       
    }

    @Override
    public Category getcategoryById(Long id) {
       return categoryRepository.findById(id).orElseThrow(()-> new NoSuchElementException("User Not Found"+id));
    }

    @Override
    public Category createcategory(Category category) {
      return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory=getcategoryById(id);
        existingCategory.setDescription(category.getDescription());
        existingCategory.setName(category.getName());
        existingCategory.setId(category.getId());
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
      categoryRepository.deleteById(id);
    }
    
}
