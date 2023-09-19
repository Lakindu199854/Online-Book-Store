package com.kade.kade.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kade.kade.entity.Book;
import com.kade.kade.entity.User;
import com.kade.kade.service.BookService;
import com.kade.kade.service.UserService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/books")
public class BooksController {
    private BookService bookService;

    @Autowired
    public BooksController(BookService bookService){
        this.bookService=bookService; 
    }

    @GetMapping
    public List <Book>getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity <Book> getBooksById(@PathVariable Long id){
        try{
            Book book = bookService.getBookById(id);
            return ResponseEntity.status(HttpStatus.OK).body(book);
        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 
        }
    }

    @PostMapping
    public ResponseEntity <Book> saveBook(@RequestBody Book book){
        try{
            Book bookCreated =bookService.createBook(book);
            return ResponseEntity.status(HttpStatus.OK).body(bookCreated);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 

        }
    }

     @PutMapping("/{id}")
      public ResponseEntity <Book> updateBooks(@PathVariable Long id,@RequestBody Book book){
        try{
            Book booksUpdate = bookService.updateBook(id,book);
            return ResponseEntity.status(HttpStatus.OK).body(booksUpdate);

        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 

        }
   
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> deleteBook(@PathVariable Long id){
         try{
           bookService.deleteBook(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 

        }
    }

     @GetMapping("/categories/{categoryId}/books")
    public ResponseEntity <List<Book>> getBookBycategoryId(@PathVariable Long categoryId){
    return ResponseEntity.status(HttpStatus.OK).body(bookService.getBookByCategoryId(categoryId));

    }

     @GetMapping("/subcategories/{subcategoryId}/books")
    public ResponseEntity <List<Book>> getBookBySubCategoryId(@PathVariable Long subcategoryId){
    return ResponseEntity.status(HttpStatus.OK).body(bookService.getBookBySubcategoryId(subcategoryId));

    }



    
}
