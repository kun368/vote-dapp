package com.zzkun.votedapp.service;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.zzkun.votedapp.dao.VoteOptionRepo;
import com.zzkun.votedapp.dao.VoteTopicRepo;
import com.zzkun.votedapp.entities.VoteOption;
import com.zzkun.votedapp.entities.VoteTopic;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VoteService {

    private static final int PAGE_SIZE = 15;

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

    public Map<String, Object> queryTopTopic(Integer currentPage) {
        PageRequest page = PageRequest.of(currentPage - 1, 15, Sort.by(Sort.Direction.DESC, "id"));
        Page<VoteTopic> all = voteTopicRepo.findAll(page);

        ArrayList<Map<String, Object>> elems = new ArrayList<>();
        all.forEach(it -> {
            HashMap<String, Object> cur = new HashMap<>();
            cur.put("title", it.getTitle());
            cur.put("id", it.getUuid());
            cur.put("tag", "");
            cur.put("time", it.getCreateTime().toString());
            elems.add(cur);
        });
        Map<String, Object> ret = new HashMap<>();
        ret.put("total", all.getTotalElements());
        ret.put("pageSize", PAGE_SIZE);
        ret.put("result", elems);
        return ret;
    }

    public Map<String, Object> queryTopicOptions(String topicUuId) {
        List<VoteOption> elems = voteOptionRepo.findAllByTopicUuid(topicUuId);
        if (elems == null) elems = new ArrayList<>();

        List<Map<String, Object>> arr = elems.stream().map(it -> {
            Map<String, Object> ret = new HashMap<>();
            ret.put("value", it.getUuid());
            ret.put("label", it.getTitle());
            return ret;
        }).collect(Collectors.toList());
        Map<String, Object> ret = new HashMap<>();
        ret.put("result", arr);
        return ret;
    }

    public Map<String, Object> systemStatus() {
        long topicCount = voteTopicRepo.count();
        long optionCount = voteOptionRepo.count();

        Page<VoteTopic> lastPage = voteTopicRepo.findAll(PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "id")));
        VoteTopic lastTopic = lastPage.hasContent() ? lastPage.getContent().get(0) : null;

        List<JSONObject> arr = new ArrayList<>();
        if (lastTopic != null) {
            arr.add(new JSONObject()
                    .fluentPut("title", "最新主题")
                    .fluentPut("hint", "系统最近一次发起投票日期")
                    .fluentPut("value", lastTopic.getCreateTime().toLocalDate().toString())
                    .fluentPut("desc", lastTopic.getTitle()));
        }
        arr.add(new JSONObject()
                .fluentPut("title", "投票主题数")
                .fluentPut("hint", "系统投票主题数")
                .fluentPut("value", topicCount)
                .fluentPut("desc", "投票数据永久留存、不可篡改、可追溯"));
        arr.add(new JSONObject()
                .fluentPut("title", "投票选项数")
                .fluentPut("hint", "系统投票选项数")
                .fluentPut("value", optionCount)
                .fluentPut("desc", "去中心、公平、公开、公正，放心投票"));
        Map<String, Object> ret = new HashMap<>();
        ret.put("arr", arr);
        return ret;
    }
}
