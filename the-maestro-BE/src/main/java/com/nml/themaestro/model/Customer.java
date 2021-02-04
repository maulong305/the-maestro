package com.nml.themaestro.model;

import lombok.Data;

@Data
public class Customer {
    private Long id;
    private String userName;
    private String password;
    private String name;
    private String address;
    private String email;
    private String phoneNumber;
    private String avatar;
}

