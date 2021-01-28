package com.nml.themaestro.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date createdAt;
    private String avatar;
    private Long numberOfView;
    @ManyToOne
    private User user;
    @ManyToMany(fetch = FetchType.LAZY)
    private List<Song> songs;
}
