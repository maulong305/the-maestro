package com.nml.themaestro.model;

import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class CommentSong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 1000)
    private String content;
    @Column(nullable = false)
    @UpdateTimestamp
    private Date creationTime;
    @ManyToOne
    private Song song;
    @ManyToOne
    private User user;
}
