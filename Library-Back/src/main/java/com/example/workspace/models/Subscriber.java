package com.example.workspace.models;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Subscriber {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cin;
	@NonNull
	private String fname;
	@NonNull
	private String lname;
	@NonNull
	private String address;
	@NonNull
	private LocalDate expirationDate;
	
	@CreationTimestamp
	private LocalDate craetedAt;
	
	@OneToMany(mappedBy = "subscriber",fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	@JsonIgnoreProperties("subscriber")
    private List<Book> books;


	public Subscriber(String fname, String lname, String address, LocalDate expirationDate, List<Book> books) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.address = address;
		this.expirationDate = expirationDate;
		this.books = books;
	}


	public Long getCin() {
		return cin;
	}


	public void setCin(Long cin) {
		this.cin = cin;
	}


	public Subscriber() {
		super();
	}


	public String getFname() {
		return fname;
	}


	public void setFname(String fname) {
		this.fname = fname;
	}


	public String getLname() {
		return lname;
	}


	public void setLname(String lname) {
		this.lname = lname;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public LocalDate getExpirationDate() {
		return expirationDate;
	}


	public void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}


	public List<Book> getBooks() {
		return books;
	}


	public void setBooks(List<Book> books) {
		this.books = books;
	}
	
	
	
}
