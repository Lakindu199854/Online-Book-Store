package com.kade.kade.repository;

import java.util.List;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kade.kade.entity.Book;


@Repository
public interface BookRepository extends JpaRepository<Book,Long>{

    @Query ("SELECT i FROM Book i WHERE i.category.id=:categoryId")
    List<Book> findItemsBycategoryId(@Param ("categoryId") Long categoryId);

    @Query ("SELECT i FROM Book i WHERE i.subcategory.id=:subcategoryId")
    List<Book> findItemsBySubcategoryId(@Param ("subcategoryId") Long subcategoryId);
    
    Book save(Book book);

}
