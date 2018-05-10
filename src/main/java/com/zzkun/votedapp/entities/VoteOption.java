package com.zzkun.votedapp.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "vote_option")
@Data
@NoArgsConstructor
public class VoteOption {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String uuid;

    private String topicUuid;

    @Column(length = 1024)
    private String title;
}
