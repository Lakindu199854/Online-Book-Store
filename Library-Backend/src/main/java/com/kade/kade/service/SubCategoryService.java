package com.kade.kade.service;

import java.util.List;

import com.kade.kade.entity.Subcategory;

public interface SubCategoryService {
   List<Subcategory> getAllSubCategories();
    Subcategory getSubcategoryById(Long id);
    Subcategory createSubcategory(Subcategory subcategory);
    Subcategory updatesSubCategory(Long id,Subcategory subcategory);
    // Subcategory getSubcategoryByCategoryId(Long categoryId);
    void deleteSubCategory(Long id); 
}
