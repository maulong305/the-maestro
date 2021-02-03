package com.nml.themaestro.repository;

import com.nml.themaestro.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserName(String userName);
}
