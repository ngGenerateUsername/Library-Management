package com.example.workspace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workspace.dao.BookRepository;
import com.example.workspace.dao.SubscriberRepository;
import com.example.workspace.dto.BorrowPostBody;
import com.example.workspace.dto.BorrowPostResponse;
import com.example.workspace.dto.ResponseCancelBooking;
import com.example.workspace.models.Book;
import com.example.workspace.models.Subscriber;

@RestController
@RequestMapping("booking")
@CrossOrigin("*")
public class BookingController {
    
    @Autowired
    private BookRepository _bookOrm;

    @Autowired
    private SubscriberRepository _subscriberOrm;

    @PostMapping("")
    private ResponseEntity<BorrowPostResponse> borrowToSubscriber(@RequestBody BorrowPostBody request)
    {
        Optional<Book> book = _bookOrm.findById(request.getId_book());
        
        //valider l'existance de book
        if(book.isEmpty() || !(book.get().getAvailable()))
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            BorrowPostResponse.builder().ErrorMessage("Book Not Available!").borrowed(false).build()
        );

        Optional<Subscriber> subscriber= _subscriberOrm.findById(request.getId_sub());
        //valider l'existance de subscriber
        if(subscriber.isEmpty())
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            BorrowPostResponse.builder().ErrorMessage("Subscriber Not Available!").borrowed(false).build()
        );

        book.get().setBorrowed(book.get().getBorrowed()+1);
        book.get().setGiveBack(request.getGiveBack());
        book.get().setAvailable(false);
        book.get().setSubscriber(subscriber.get());
        try {
            _bookOrm.save(book.get());
            return ResponseEntity.ok(
                BorrowPostResponse.builder().ErrorMessage(null).borrowed(true).build()
            );
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                BorrowPostResponse.builder().ErrorMessage("Error while adding a book!").borrowed(false).build()
            );
        }
    }

    @GetMapping("/booked")
	private ResponseEntity<List<Book>> getBorrowedBooks()
	{
		Optional<List<Book>> booksBorrowed = _bookOrm.findByAvailable(false);

		if(booksBorrowed.isEmpty()) return ResponseEntity.notFound().build();

		return ResponseEntity.ok(booksBorrowed.get());
	}

    @GetMapping("{id}")
    private ResponseEntity<ResponseCancelBooking> cancelBooking(@PathVariable Long id)
    {
        Optional<Book> getBook = _bookOrm.findById(id);

        if(getBook.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            ResponseCancelBooking.builder().ErrorMessage("Book Not Found").canceled(false).build()
        );

        if(getBook.get().getAvailable() == true) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseCancelBooking.builder().ErrorMessage("Book already Available").canceled(false).build()
        );

        //after verification we cancel book
        getBook.get().setAvailable(true);
        getBook.get().setGiveBack(null);
        getBook.get().setSubscriber(null);

        try {
            _bookOrm.save(getBook.get());
            return ResponseEntity.ok(
                ResponseCancelBooking.builder().ErrorMessage(null).canceled(true).build()
            );
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ResponseCancelBooking.builder().ErrorMessage("Error during canceling:"+e.getMessage()).canceled(false).build()
            );
        }
    }

    
}
