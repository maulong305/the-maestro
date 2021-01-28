package com.nml.themaestro.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String password;
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Role> roles;
    @OneToOne
    private UserDetail userDetail;
}
