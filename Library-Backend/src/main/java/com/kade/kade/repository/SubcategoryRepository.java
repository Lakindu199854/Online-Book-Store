package com.kade.kade.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kade.kade.entity.CartItem;
import com.kade.kade.entity.Subcategory;

 @Repository


public interface SubcategoryRepository extends JpaRepository<Subcategory,Long> {
    
    
    Subcategory save(Subcategory subcategory);

    // @Query ("SELECT i FROM Subcategory i WHERE i.category.id=:categoryId")
    //   List<Subcategory> findSubcategoriesByCategoryId(@Param ("categoryId") Long categoryId);
}

 


