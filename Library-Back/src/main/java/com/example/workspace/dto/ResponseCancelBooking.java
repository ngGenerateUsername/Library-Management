package com.example.workspace.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseCancelBooking {
    
    private String ErrorMessage;
    private boolean canceled;
}
