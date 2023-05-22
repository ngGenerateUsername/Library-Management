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

import com.example.workspace.dao.SubscriberRepository;
import com.example.workspace.models.Subscriber;



@RestController
@RequestMapping("/subscriber")
@CrossOrigin("*")
public class SubscriberController {

	@Autowired
	private SubscriberRepository subscriberRepository;
	
	
	@GetMapping
	public List<Subscriber> getAllSubscribers(){
		return subscriberRepository.findAll();
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Subscriber> getById(@PathVariable Long id){
		Optional<Subscriber> OptionalSubscriber = subscriberRepository.findById(id);
		if(OptionalSubscriber.isPresent()) {
			Subscriber subscriber = OptionalSubscriber.get();
			return ResponseEntity.ok(subscriber);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	@PostMapping
	public ResponseEntity<Subscriber> saveSubscriber(@RequestBody Subscriber subscriber){
		Subscriber savedSubscriber = subscriberRepository.save(subscriber) ;
		return ResponseEntity.status(201).body(savedSubscriber);
	}
	@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubscriberById(@PathVariable Long id) {
        Optional<Subscriber> subscriberOptional = subscriberRepository.findById(id);
        if (subscriberOptional.isPresent()) {
        	subscriberRepository.deleteById(id);
            return ResponseEntity.status(200).body("Subscriber Deleted");
        } else {
            return ResponseEntity.status(404).body("Subscriber NotFound");
        }
    }
}
