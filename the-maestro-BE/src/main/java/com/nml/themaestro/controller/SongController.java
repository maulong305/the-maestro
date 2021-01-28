package com.nml.themaestro.controller;

import com.nml.themaestro.model.Song;
import com.nml.themaestro.service.SongService;
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

    Date currentTime = Calendar.getInstance().getTime();
    @ApiOperation(value = "create song", response = Song.class)
    @RequestMapping(value = "create", method = RequestMethod.POST)
    public ResponseEntity<Song> createSong(@RequestBody Song song){
        song.setCreatedAt(currentTime);
        songService.save(song);
        return new ResponseEntity<>(song, HttpStatus.OK);
    }

}
