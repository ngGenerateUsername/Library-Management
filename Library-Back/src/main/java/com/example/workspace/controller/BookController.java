package com.example.workspace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workspace.dao.BookRepository;
import com.example.workspace.models.Book;



@RestController
@RequestMapping("/book")
@CrossOrigin("*")
public class BookController {

	@Autowired
	private BookRepository bookRepository;
	
	//@Autowired
	//private ModelMapper modelMapper; to use map to DTO
	
	@GetMapping
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Book> getById(@PathVariable Long id){
		Optional<Book> OptionalBook = bookRepository.findById(id);
		if(OptionalBook.isPresent()) {
			Book book = OptionalBook.get();
			return ResponseEntity.ok(book);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	@PostMapping
	public ResponseEntity<Book> savebook(@RequestBody Book book){
		Book savedbook = bookRepository.save(book) ;
		return ResponseEntity.status(201).body(savedbook);
	}
	
	@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBookById(@PathVariable Long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
        	bookRepository.deleteById(id);
            return ResponseEntity.status(200).body("Book Deleted");
        } else {
            return ResponseEntity.status(404).body("Book NotFound");
        }
    }


}
