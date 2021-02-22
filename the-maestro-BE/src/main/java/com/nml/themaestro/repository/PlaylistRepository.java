package com.nml.themaestro.repository;

import com.nml.themaestro.model.Playlist;
import org.springframework.data.repository.CrudRepository;

public interface PlaylistRepository extends CrudRepository<Playlist, Long> {
    Iterable<Playlist> findAllByUserUsername(String username);
}
