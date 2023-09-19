package com.kade.kade.service;

import java.util.List;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.Book;


@Service
public interface BookService {
    List<Book> getAllBooks();
    Book getBookById(Long id);
    Book createBook(Book book);
    Book updateBook(Long id,Book book);
    void deleteBook(Long id);
    List<Book> getBookByCategoryId(Long categoryId);
    List<Book> getBookBySubcategoryId(Long subcategoryId);

     
}
