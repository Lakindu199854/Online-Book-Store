package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kade.kade.entity.Book;
import com.kade.kade.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository){
        this.bookRepository=bookRepository;
    }

    @Override
    public List<Book> getAllBooks() {
       return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {
       return bookRepository.findById(id).orElseThrow(()-> new NoSuchElementException("User Not Found"+id));
    }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
       bookRepository.deleteById(id);
    }

    @Override
    public Book updateBook(Long id, Book book) {
       Book existingBook=getBookById(id);

       if(existingBook != null){
       
         
         existingBook.setName(book.getName());
         existingBook.setAuthor(book.getAuthor());
         existingBook.setPrice(book.getPrice());
         existingBook.setDescription(book.getDescription());
         existingBook.setCategory(book.getCategory());
         
         return bookRepository.save(existingBook);
       }else{
         throw new NoSuchElementException("Book Not Found" +id);
       }

       
       
    }

   @Override
   public List<Book> getBookByCategoryId(Long categoryId) {
      return bookRepository.findItemsBycategoryId(categoryId);
     
   }

   @Override
   public List<Book> getBookBySubcategoryId(Long subcategoryId) {
     return bookRepository.findItemsBySubcategoryId(subcategoryId);
   }
    
}
