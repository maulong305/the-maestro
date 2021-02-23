package com.nml.themaestro.service;

import com.nml.themaestro.model.CommentSong;
import com.nml.themaestro.model.Song;

public interface CmtSongService {
    Iterable<CommentSong> getAll();
    CommentSong save(CommentSong commentSong);
    CommentSong findById(Long id);
    void remove(Long id);
    Iterable<CommentSong> getCommentSongsBySongOrderByCreationTimeDesc(Song song);
}
