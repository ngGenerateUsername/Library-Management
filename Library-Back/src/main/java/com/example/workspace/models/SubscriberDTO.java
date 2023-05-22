package com.example.workspace.models;

import java.time.LocalDate;

public class SubscriberDTO {


	private Long cin;


	private String lname;

	private String address;

	private LocalDate expirationDate;


	//this DTO class is usless now,
	//we will  use it when we dont need to show relations

	
	
	public SubscriberDTO() {
		super();
	}



	public SubscriberDTO(String lname, String address, LocalDate expirationDate) {
		super();
		this.lname = lname;
		this.address = address;
		this.expirationDate = expirationDate;
	
	}



	public Long getCin() {
		return cin;
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


	
}
