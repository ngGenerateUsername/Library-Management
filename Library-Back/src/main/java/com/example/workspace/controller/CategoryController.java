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

import com.example.workspace.dao.CategoryRepository;
import com.example.workspace.models.Category;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private CategoryRepository categoryRepository;
	

	@GetMapping
	public List<Category> getAllCategories(){
		return categoryRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Category> getById(@PathVariable Long id){
		Optional<Category> OptionalCategory = categoryRepository.findById(id);
		if(OptionalCategory.isPresent()) {
			Category category = OptionalCategory.get();
			return ResponseEntity.ok(category);
		}else {
			return ResponseEntity.notFound().build();
		}
	
	}
	
	@PostMapping
	public ResponseEntity<Category>  saveCategorry(@RequestBody Category category){
		Category savedCategory=  categoryRepository.save(category) ;
		return ResponseEntity.status(201).body(savedCategory);
	}
	
	@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
           categoryRepository.deleteById(id);
            return ResponseEntity.status(200).body("Category Deleted");
        } else {
            return ResponseEntity.status(404).body("Category NotFound");
        }
    }

}
