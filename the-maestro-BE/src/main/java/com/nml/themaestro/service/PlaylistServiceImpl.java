package com.nml.themaestro.service;

import com.nml.themaestro.model.Playlist;
import com.nml.themaestro.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PlaylistServiceImpl implements PlaylistService{
    @Autowired
    private PlaylistRepository playlistRepository;

    @Override
    public Iterable<Playlist> getAll() {
        return playlistRepository.findAll();
    }

    @Override
    public Playlist save(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public Playlist findById(Long id) {
        return playlistRepository.findById(id).orElse(null);
    }

    @Override
    public void remove(Long id) {
        playlistRepository.deleteById(id);
    }

}
