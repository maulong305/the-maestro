package com.nml.themaestro.service;

import com.nml.themaestro.model.User;
import com.nml.themaestro.model.UserDetail;

public interface UserDetailService {
    Iterable<UserDetail> findAll();
    UserDetail findById(Long id);
    UserDetail save(UserDetail userDetail);
    void remove(Long id);
    UserDetail getUserDetailByUser(User user);
}
