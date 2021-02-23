package com.nml.themaestro.controller;

import com.nml.themaestro.model.Playlist;
import com.nml.themaestro.model.Song;
import com.nml.themaestro.model.Track;
import com.nml.themaestro.model.User;
import com.nml.themaestro.service.PlaylistService;
import com.nml.themaestro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/playlists/")
public class PlaylistController {
    @Autowired
    PlaylistService playlistService;
    @Autowired
    UserService userService;

    Date currentTime = Calendar.getInstance().getTime();

    @PostMapping(value = "create/{username}")
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist, @PathVariable String username){
        User user = userService.findByUserName(username);
        playlist.setCreatedAt(currentTime);
        playlist.setUser(user);
        playlistService.save(playlist);
        return new ResponseEntity<>(playlist, HttpStatus.CREATED);
    }
    @RequestMapping(value = "list/{username}", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Playlist>> listByUser(@PathVariable String username){
        Iterable<Playlist> playlists = playlistService.findAllByUserName(username);
        if (playlists == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }
    @RequestMapping(value = "latest", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Playlist>> latestPlaylists(){
        Iterable<Playlist> playlists = playlistService.latest();
        if (playlists == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }
    @PostMapping(value = "/{idPlaylist}/songs/{idSong}")
    public ResponseEntity<Playlist> addSongToPlaylist(@PathVariable("idPlaylist") Long idPlaylist, @PathVariable("idSong") Long idSong) {
        return new ResponseEntity<>(playlistService.addSongToPlaylist(idSong, idPlaylist), HttpStatus.OK);
    }
    @GetMapping(value = "/play/{id}")
    public ResponseEntity<List<Track>> playPlaylist(@PathVariable Long id){
        List<Track> tracks = playlistService.getTrackPlaylistById(id);
        if (tracks.size() == 0){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tracks,HttpStatus.OK);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<Playlist> getPlayListById(@PathVariable Long id) {
        Playlist playlist = playlistService.findById(id);
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }
}
