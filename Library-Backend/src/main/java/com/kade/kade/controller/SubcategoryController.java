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
import com.kade.kade.entity.Subcategory;
import com.kade.kade.entity.User;
import com.kade.kade.service.CategoryService;
import com.kade.kade.service.SubCategoryService;


@CrossOrigin(origins="*")

@RestController 
@RequestMapping("/subcategories")
public class SubcategoryController {
    private SubCategoryService subcategoryService;

    @Autowired
    public SubcategoryController(SubCategoryService subcategoryService){
        this.subcategoryService=subcategoryService;
    }
    
    @GetMapping
    public ResponseEntity<List<Subcategory>> getAllcategories(){
        List<Subcategory> subcategories = subcategoryService.getAllSubCategories();
        return ResponseEntity.status(HttpStatus.OK).body(subcategories);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Subcategory>getUserById(@PathVariable Long id){
        try{
            Subcategory subcategory=subcategoryService.getSubcategoryById(id);
            return ResponseEntity.status(HttpStatus.OK).body(subcategory);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        
    }
//  @GetMapping("/{categoryId}")
//     public ResponseEntity <List<Subcategory>>getSubcategoriesByCategoryId(@PathVariable Long categoryId){
//         try{
//             List <Subcategory> subcategories=subcategoryService.getSubcategoryByCategoryId(categoryId);
//             return ResponseEntity.status(HttpStatus.OK).body(subcategories);
//         }catch(Exception e){
//              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//         }
        
//     }


    @PostMapping
    public ResponseEntity<Subcategory> saveSubCaatogory(@RequestBody Subcategory subcategory){
        try{
            Subcategory categoryCreated=subcategoryService.createSubcategory(subcategory);
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryCreated);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

   
     @PutMapping("/{id}")
      public ResponseEntity <Subcategory> updateSubCategory(@PathVariable Long id,@RequestBody Subcategory subcategory){
        try{
            Subcategory subcategoryUpdated = subcategoryService.updatesSubCategory(id,subcategory);
            return ResponseEntity.status(HttpStatus.OK).body(subcategoryUpdated);

        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 

        }
   
    }

}
