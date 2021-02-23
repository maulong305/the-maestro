package com.nml.themaestro.service;

import com.nml.themaestro.model.CommentSong;
import com.nml.themaestro.model.Song;
import com.nml.themaestro.repository.CmtSongRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CmtSongServiceImpl implements CmtSongService{
    @Autowired
    CmtSongRepository cmtSongRepository;
    @Override
    public Iterable<CommentSong> getAll() {
        return cmtSongRepository.findAll();
    }

    @Override
    public CommentSong save(CommentSong commentSong) {
        return cmtSongRepository.save(commentSong);
    }

    @Override
    public CommentSong findById(Long id) {
        return cmtSongRepository.findById(id).orElse(null);
    }

    @Override
    public void remove(Long id) {
        cmtSongRepository.deleteById(id);
    }

    @Override
    public Iterable<CommentSong> getCommentSongsBySongOrderByCreationTimeDesc(Song song) {
        return cmtSongRepository.getCommentSongsBySongOrderByCreationTimeDesc(song);
    }
}
