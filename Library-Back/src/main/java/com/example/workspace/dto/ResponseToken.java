package com.example.workspace.dto;

import lombok.Builder;

@Builder
public class ResponseToken {
    public String token;

    public String error;
}
