package com.nml.themaestro.repository;

import com.nml.themaestro.model.User;
import com.nml.themaestro.model.UserDetail;
import org.springframework.data.repository.CrudRepository;

public interface SongRepository extends CrudRepository<UserDetail, Long> {
    UserDetail getUserDetailByUser(User user);
}
