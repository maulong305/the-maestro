package com.nml.themaestro.repository;

import com.nml.themaestro.model.Song;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends CrudRepository<Song, Long> {
    Iterable<Song> findAllByUserId(Long idUser);

    @Query(value = "select * from song order by created_at desc limit 10", nativeQuery = true)
    Iterable<Song> findAllByCreatedAtOrderByCreatedAt();
}
