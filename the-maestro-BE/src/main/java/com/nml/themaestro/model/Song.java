package com.nml.themaestro.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String file;
    private Date createdAt;
    private Long numberOfView;
    private String singer;
    private String author;
    private String avatar;
    private String lyric;
    @ManyToOne
    private User user;


}
