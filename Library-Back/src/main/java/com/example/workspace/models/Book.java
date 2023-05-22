package com.example.workspace.models;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long isbn;
	@NonNull
	private String title;
	@NonNull
	private String author;

	@NonNull
	private boolean available = true;
	
	@NonNull
	private Integer borrowed=0; // how many time get borrwed every time we add +1


	private LocalDate giveBack = null;


	@UpdateTimestamp
	private LocalDate createdUpdateAt;
	
	@ManyToOne
    @JoinColumn(name = "cin")
	@JsonIgnoreProperties("books")
    private Subscriber subscriber;
	@ManyToOne
    @JoinColumn(name = "catId")
	@JsonIgnoreProperties("books")
    private Category category;
	
	//commentaire
	
	public Book() {
		super();
	}
	public Book(String title, String author,boolean available, Integer borrowed, Subscriber subscriber,
			Category category) {
		super();
		this.title = title;
		this.author = author;
		this.available = available;
		this.borrowed = borrowed;
		this.subscriber = subscriber;
		this.category = category;
	}
	public Long getIsbn() {
		return isbn;
	}
	public void setIsbn(Long isbn) {
		this.isbn = isbn;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}

	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	public Integer getBorrowed() {
		return borrowed;
	}
	public void setBorrowed(Integer borrowed) {
		this.borrowed = borrowed;
	}
	public Subscriber getSubscriber() {
		return subscriber;
	}
	public void setSubscriber(Subscriber subscriber) {
		this.subscriber = subscriber;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}

	public boolean getAvailable()
	{
		return this.available;
	}
	
	public LocalDate getGiveBack()
	{
		return this.giveBack;
	}

	public void setGiveBack(LocalDate dateGiveBack)
	{
		this.giveBack = dateGiveBack;
	}
}
