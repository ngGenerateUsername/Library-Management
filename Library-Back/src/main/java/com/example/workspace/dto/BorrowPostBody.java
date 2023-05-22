package com.example.workspace.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BorrowPostBody {
    
    private Long id_sub;
    private Long id_book;
    private LocalDate giveBack;
}
