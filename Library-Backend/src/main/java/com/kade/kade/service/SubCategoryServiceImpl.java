package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.Category;
import com.kade.kade.entity.Subcategory;
import com.kade.kade.repository.SubcategoryRepository;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {

    private SubcategoryRepository subcategoryRepository;

    @Autowired
    public SubCategoryServiceImpl(SubcategoryRepository subcategoryRepository){
        this.subcategoryRepository=subcategoryRepository;
    }

    @Override
    public List<Subcategory> getAllSubCategories() {
        return subcategoryRepository.findAll();
    }

    @Override
    public Subcategory getSubcategoryById(Long id) {
       return subcategoryRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Category Not Found"+id));
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

 
 
   
    
}
