package com.zzkun.votedapp.entities;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vote_topic")
@Data
@NoArgsConstructor
public class VoteTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String uuid;

    @Column(length = 1024)
    private String title;

    private LocalDateTime createTime;
}
