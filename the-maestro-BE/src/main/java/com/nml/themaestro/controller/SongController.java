package com.nml.themaestro.controller;

import com.nml.themaestro.model.Song;
import com.nml.themaestro.model.User;
import com.nml.themaestro.service.SongService;
import com.nml.themaestro.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("/songs/")
@CrossOrigin("*")
public class SongController {
    @Autowired
    SongService songService;
    @Autowired
    UserService userService;

    Date currentTime = Calendar.getInstance().getTime();
    @ApiOperation(value = "create song", response = Song.class)
    @RequestMapping(value = "create/{username}", method = RequestMethod.POST)
    public ResponseEntity<Song> createSong(@RequestBody Song song, @PathVariable String username){
        song.setCreatedAt(currentTime);
        song.setNumberOfView(0L);
        User user = userService.findByUserName(username);
        song.setUser(user);
        songService.save(song);
        return new ResponseEntity<>(song, HttpStatus.OK);
    }
    @ApiOperation(value = "show all song", response = Song.class)
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Song>> listSong(){
        Iterable<Song> songs = songService.findAll();
        if (songs == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }

    @ApiOperation(value = "get song by id", response = Song.class)
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<Song> getSongById(@PathVariable Long id){
        Song song = songService.findById(id);
        if (song == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(song, HttpStatus.OK);
    }
    @PutMapping("edit/{username}/{id}")
    public ResponseEntity<Song> editSong(@RequestBody Song song,@PathVariable Long id, @PathVariable String username){
        if (song == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        songService.save(song);
        return new ResponseEntity<>(song, HttpStatus.OK);
    }

    @ApiOperation(value = "show all song by user", response = Song.class)
    @RequestMapping(value = "listSong/{username}", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Song>> listSongByUser(@PathVariable String username){
        User user = userService.findByUserName(username);
        Iterable<Song> songs = songService.findAllByUserId(user.getId());
        if (songs == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
    @DeleteMapping(value = "listSong/{username}/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable("id") Long id){
        Song song = songService.findById(id);
        if (song == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        songService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
