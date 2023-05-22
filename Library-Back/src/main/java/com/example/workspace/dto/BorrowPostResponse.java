package com.example.workspace.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BorrowPostResponse {
    
    private String ErrorMessage;
    private boolean borrowed;
}
