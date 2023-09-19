package com.kade.kade.controller;


import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kade.kade.entity.Category;
import com.kade.kade.entity.User;
import com.kade.kade.service.CategoryService;


@CrossOrigin(origins="*")

@RestController 
@RequestMapping("/categories")
public class CategoryController {
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService=categoryService;
    }
    
    @GetMapping
    public ResponseEntity<List<Category>> getAllcategories(){
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.status(HttpStatus.OK).body(categories);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category>getUserById(@PathVariable Long id){
        try{
            Category category=categoryService.getcategoryById(id);
            return ResponseEntity.status(HttpStatus.OK).body(category);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        
    }

    @PostMapping
    public ResponseEntity<Category> saveCaatogory(@RequestBody Category category){
        try{
            Category categoryCreated=categoryService.createcategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryCreated);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

   
     @PutMapping("/{id}")
      public ResponseEntity <Category> updateCategory(@PathVariable Long id,@RequestBody Category category){
        try{
            Category categoryUpdated = categoryService.updateCategory(id,category);
            return ResponseEntity.status(HttpStatus.OK).body(categoryUpdated);

        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 

        }
   
    }

}
