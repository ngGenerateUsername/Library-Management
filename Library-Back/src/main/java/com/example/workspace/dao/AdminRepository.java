package com.example.workspace.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.workspace.models.Admin;


public interface AdminRepository extends JpaRepository<Admin,Long>{
 Optional<Admin> findByUsername(String username);
}
