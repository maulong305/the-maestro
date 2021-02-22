package com.nml.themaestro.controller;

import com.nml.themaestro.model.Playlist;
import com.nml.themaestro.model.User;
import com.nml.themaestro.service.PlaylistService;
import com.nml.themaestro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

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
}
