package com.example.workspace.models;

public class BookDTO {

	private Long isbn;
	
	private String title;

	private String author;

	private String price;

	private boolean available;
	
	private Integer borrowed; // how many time get borrwed every time we add +1
	


	//this DTO class is usless now,
	//we will  use it when we dont need to show relations

    
    
	public BookDTO() {
		super();
	}

	public BookDTO(String title, String author, String price, boolean available, Integer borrowed) {
		super();
		this.title = title;
		this.author = author;
		this.price = price;
		this.available = available;
		this.borrowed = borrowed;
	
	}

	public Long getIsbn() {
		return isbn;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
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


	
    
    
}
