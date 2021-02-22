package com.nml.themaestro.service;

import com.nml.themaestro.model.Playlist;
import com.nml.themaestro.model.Song;
import com.nml.themaestro.repository.PlaylistRepository;
import com.nml.themaestro.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistServiceImpl implements PlaylistService{
    @Autowired
    private PlaylistRepository playlistRepository;
    @Autowired
    private SongRepository songRepository;

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

    @Override
    public Iterable<Playlist> findAllByUserName(String username) {
        return playlistRepository.findAllByUserUsername(username);
    }

    @Override
    public Iterable<Playlist> latest() {
        return playlistRepository.findAllByCreatedAtOrderByCreatedAt();
    }

    @Override
    public Playlist addSongToPlaylist(Long idSong, Long idPlaylist) {
        Song song = songRepository.findById(idSong).get();
        Playlist playlist = playlistRepository.findById(idPlaylist).get();
        List<Song> songs = playlist.getSongs();
        if (songs.contains(song)){
            return null;
        }
        songs.add(song);
        playlist.setSongs(songs);
        playlistRepository.save(playlist);
        return playlist;
    }

}
