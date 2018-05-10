package com.zzkun.votedapp.dao;

import com.zzkun.votedapp.entities.VoteTopic;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteTopicRepo extends JpaRepository<VoteTopic, Long> {

    @Override
    List<VoteTopic> findAll();

    @Override
    Page<VoteTopic> findAll(Pageable pageable);

    @Override
    <S extends VoteTopic> S save(S s);

    @Override
    Optional<VoteTopic> findById(Long aLong);

    @Override
    long count();

    @Override
    void deleteById(Long aLong);

    @Override
    <S extends VoteTopic> Optional<S> findOne(Example<S> example);
}
