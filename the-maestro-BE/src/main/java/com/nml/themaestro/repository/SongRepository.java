package com.nml.themaestro.repository;

import com.nml.themaestro.model.Song;
import org.springframework.data.repository.CrudRepository;

public interface SongRepository extends CrudRepository<Song, Long> {
}
