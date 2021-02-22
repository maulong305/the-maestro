package com.nml.themaestro.service;

import com.nml.themaestro.model.Playlist;

public interface PlaylistService {
    Iterable<Playlist> getAll();
    Playlist save(Playlist playlist);
    Playlist findById(Long id);
    void remove(Long id);
}
