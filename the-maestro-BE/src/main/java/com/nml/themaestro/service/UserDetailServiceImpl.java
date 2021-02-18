package com.nml.themaestro.service;

import com.nml.themaestro.model.User;
import com.nml.themaestro.model.UserDetail;
import com.nml.themaestro.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailService{
    @Autowired
    private UserDetailRepository userDetailRepository;
    @Override
    public Iterable<UserDetail> findAll() {
        return userDetailRepository.findAll();
    }

    @Override
    public UserDetail findById(Long id) {
        return userDetailRepository.findById(id).orElse(null);
    }

    @Override
    public UserDetail save(UserDetail userDetail) {
        return userDetailRepository.save(userDetail);
    }

    @Override
    public void remove(Long id) {
        userDetailRepository.deleteById(id);
    }

    @Override
    public UserDetail getUserDetailByUser(User user) {
        return userDetailRepository.getUserDetailByUser(user);
    }
}
