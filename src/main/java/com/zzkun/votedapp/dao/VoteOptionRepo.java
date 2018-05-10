package com.zzkun.votedapp.dao;

import com.zzkun.votedapp.entities.VoteOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteOptionRepo extends JpaRepository<VoteOption, Long> {

    @Override
    List<VoteOption> findAll();

    List<VoteOption> findAllByTopicUuid(String topicUuid);

    @Override
    <S extends VoteOption> List<S> saveAll(Iterable<S> iterable);

    @Override
    <S extends VoteOption> S save(S s);

    @Override
    long count();
}
