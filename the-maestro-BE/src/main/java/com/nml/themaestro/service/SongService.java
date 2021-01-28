package com.nml.themaestro.service;

import com.nml.themaestro.model.Song;

public interface SongService {
    Iterable<Song> findAll();
    Song findById(Long id);
    Song save(Song song);
    void delete(Long id);
}
