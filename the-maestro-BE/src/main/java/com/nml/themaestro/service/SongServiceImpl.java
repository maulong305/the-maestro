package com.nml.themaestro.service;

import com.nml.themaestro.model.Song;
import com.nml.themaestro.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SongServiceImpl implements SongService{
    @Autowired
    private SongRepository songRepository;

    @Override
    public Iterable<Song> findAll() {
        return songRepository.findAll();
    }

    @Override
    public Song findById(Long id) {
        return songRepository.findById(id).orElse(null);
    }

    @Override
    public Song save(Song song) {
        return songRepository.save(song);
    }

    @Override
    public void delete(Long id) {
        songRepository.deleteById(id);
    }
}
