package com.nml.themaestro.controller;

import com.nml.themaestro.model.CommentSong;
import com.nml.themaestro.model.Song;
import com.nml.themaestro.model.User;
import com.nml.themaestro.service.CmtSongService;
import com.nml.themaestro.service.SongService;
import com.nml.themaestro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

@RestController
@CrossOrigin("*")
public class CommentController {

    @Autowired
    private CmtSongService commentSongService;

    @Autowired
    private SongService songService;
    @Autowired
    private UserService userService;

    @GetMapping("/commentSong/{songID}")
    public ResponseEntity<Iterable<CommentSong>> getCommentByIdSong(@PathVariable Long songID){
        Song song = songService.findById(songID);
        Iterable<CommentSong> listCommentSong = commentSongService.getCommentSongsBySongOrderByCreationTimeDesc(song);
        return new ResponseEntity<>(listCommentSong, HttpStatus.OK);
    }

    @PostMapping("/commentSong/{songID}/{username}")
    public ResponseEntity<CommentSong> postCommentSong(@PathVariable Long songID, @RequestBody CommentSong commentSong,@PathVariable String username){

        final DateFormat dateFormat = DateFormat.getDateInstance(DateFormat.FULL, Locale.CHINESE);
        Date today = new Date();
        dateFormat.format(today);
        commentSong.setCreationTime(today);
        Song song = songService.findById(songID);
        User user = userService.findByUserName(username);
        commentSong.setUser(user);
        commentSong.setSong(song);
        return new ResponseEntity<>(commentSongService.save(commentSong),HttpStatus.CREATED);
    }

}
