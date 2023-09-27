package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.Category;
import com.kade.kade.entity.Subcategory;
import com.kade.kade.repository.SubcategoryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {

    private SubcategoryRepository subcategoryRepository;
    private CategoryService categoryService;

    @Autowired
    public SubCategoryServiceImpl(SubcategoryRepository subcategoryRepository,CategoryService categoryService){
        this.subcategoryRepository=subcategoryRepository;
        this.categoryService=categoryService;
    }

    @Override
    public List<Subcategory> getAllSubCategories() {
        return subcategoryRepository.findAll();
    }

    @Override
    public Subcategory getSubcategoryById(Long id) {
       return subcategoryRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Subcategory Not Found"+id));
    }

    @Override
    public Subcategory createSubcategory(Subcategory subcategory) {
      return subcategoryRepository.save(subcategory);
    }

    @Override
    public Subcategory updatesSubCategory(Long id, Subcategory subcategory) {
        Subcategory existingCategory=getSubcategoryById(id);
        existingCategory.setDescription(subcategory.getDescription());
        existingCategory.setName(subcategory.getName());
        return subcategoryRepository.save(existingCategory);
    }

    @Override
    public void deleteSubCategory(Long id) {
      subcategoryRepository.deleteById(id);
    }

    // @Override
    // public List<Subcategory> getSubcategoryByCategoryId(Long categoryId){
    //     return subcategoryRepository.findSubcategoriesByCategoryId(categoryId).orElseThrow(()-> new NoSuchElementException("Subcategory Not Found"+categoryId));
    // }
 
 
   
    
}
