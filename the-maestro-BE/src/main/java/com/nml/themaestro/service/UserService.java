package com.nml.themaestro.service;

import com.nml.themaestro.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User findById(Long id);
    Iterable<User> findAll();
    void remove(Long id);
    User save(User user);
    User findByUserName(String userName);
}
