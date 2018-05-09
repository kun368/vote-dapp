package com.zzkun.votedapp.service;

import com.zzkun.votedapp.dao.VoteOptionRepo;
import com.zzkun.votedapp.dao.VoteTopicRepo;
import com.zzkun.votedapp.entities.VoteOption;
import com.zzkun.votedapp.entities.VoteTopic;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class VoteService {

    @Autowired
    private VoteTopicRepo voteTopicRepo;

    @Autowired
    private VoteOptionRepo voteOptionRepo;

    public boolean createTopic(String title, String options) {
        VoteTopic topic = new VoteTopic();
        topic.setTitle(title);
        topic.setUuid(UUID.randomUUID().toString());
        topic.setCreateTime(LocalDateTime.now());

        List<VoteOption> list = new ArrayList<>();
        String[] split = StringUtils.split(options, '\n');
        for (String s : split) {
            s = StringUtils.trimToNull(s);
            if (s != null) {
                VoteOption voteOption = new VoteOption();
                voteOption.setTitle(s);
                voteOption.setTopicUuid(topic.getUuid());
                voteOption.setUuid(UUID.randomUUID().toString());
                list.add(voteOption);
            }
        }
        return voteOptionRepo.saveAll(list) != null && voteTopicRepo.save(topic) != null;
    }
}
