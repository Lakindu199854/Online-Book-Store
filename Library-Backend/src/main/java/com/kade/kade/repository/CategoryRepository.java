package com.kade.kade.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kade.kade.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    
}
