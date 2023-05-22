package com.example.workspace.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workspace.models.Book;
import java.util.List;




public interface BookRepository extends JpaRepository<Book,Long>{

    Optional<List<Book>> findByAvailable(boolean available);
}
