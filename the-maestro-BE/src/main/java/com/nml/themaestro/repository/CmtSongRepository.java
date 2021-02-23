package com.nml.themaestro.repository;

import com.nml.themaestro.model.CommentSong;
import com.nml.themaestro.model.Song;
import org.springframework.data.repository.CrudRepository;

public interface CmtSongRepository extends CrudRepository<CommentSong, Long> {
    Iterable<CommentSong> getCommentSongsBySongOrderByCreationTimeDesc(Song song);

}
