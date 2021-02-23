package com.nml.themaestro.service;

import com.nml.themaestro.model.Playlist;
import com.nml.themaestro.model.Track;

import java.util.List;

public interface PlaylistService {
    Iterable<Playlist> getAll();
    Playlist save(Playlist playlist);
    Playlist findById(Long id);
    void remove(Long id);
    Iterable<Playlist> findAllByUserName(String username);
    Iterable<Playlist> latest();
    Playlist addSongToPlaylist(Long idSong, Long idPlaylist);
    List<Track> getTrackPlaylistById(Long idPlaylist);
}
