package com.example.workspace.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.workspace.dao.AdminRepository;
import com.example.workspace.dto.AuthRequest;
import com.example.workspace.dto.ResponseToken;
import com.example.workspace.models.Admin;
import com.example.workspace.services.jwtService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private jwtService jwtUtil;

	@PostMapping("/login")
	private ResponseEntity<ResponseToken> authAdmin(@RequestBody AuthRequest request)
	{
		try{
			authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
		}catch(Exception e)
		{
			//Todo::response not acceptable
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseToken.builder().error(e.getMessage()).build());
		}
		var admin =  adminRepository.findByUsername(request.getUsername()).orElseThrow();
		var jwtToken = jwtUtil.generateToken(admin);
		return ResponseEntity.ok(ResponseToken.builder().token(jwtToken).build());
	}

	@GetMapping("/list")
	private ResponseEntity<List<Admin>> getAllAdmin()
	{
		return ResponseEntity.ok(adminRepository.findAll());
	}
}
