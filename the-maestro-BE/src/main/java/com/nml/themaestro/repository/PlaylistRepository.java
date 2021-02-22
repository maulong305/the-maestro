package com.nml.themaestro.repository;

import com.nml.themaestro.model.Playlist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PlaylistRepository extends CrudRepository<Playlist, Long> {
    Iterable<Playlist> findAllByUserUsername(String username);
    @Query(value = "select * from playlist order by created_at desc limit 10", nativeQuery = true)
    Iterable<Playlist> findAllByCreatedAtOrderByCreatedAt();
}
