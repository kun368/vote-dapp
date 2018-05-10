package com.zzkun.votedapp.controller;

import com.zzkun.votedapp.entities.ResultVO;
import com.zzkun.votedapp.entities.VoteOption;
import com.zzkun.votedapp.entities.VoteTopic;
import com.zzkun.votedapp.service.VoteService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
public class MainController {

    @Autowired
    private VoteService voteService;

    @RequestMapping("/createVote")
    public Object createVote(@RequestParam String title,
                             @RequestParam String options) {
        log.warn("createVote-param: title{}, option{}", title, options);
        if (StringUtils.isAnyBlank(title, options)) {
            return ResultVO.fail("填写内容为空！");
        }
        boolean res = voteService.createTopic(title, options);
        if (res) return ResultVO.success("创建成功！");
        return ResultVO.fail("系统错误，创建失败");
    }

    @RequestMapping("/systemStatus")
    public Object systemStatus() {
        return ResultVO.success("", voteService.systemStatus());
    }

    @RequestMapping("/queryVotes")
    public Object queryVotes(@RequestParam Integer currentPage) {
        if (currentPage == null || currentPage < 1) {
            return ResultVO.fail("页码参数不正确");
        }
        Map<String, Object> res = voteService.queryTopTopic(currentPage);
        if (CollectionUtils.isEmpty(res)) return ResultVO.fail("未找到当前页数据");
        return ResultVO.success("", res);
    }

    @RequestMapping("/queryOptions")
    public Object queryOptions(@RequestParam String topicId) {
        if (StringUtils.isEmpty(topicId)) {
            return ResultVO.fail("参数不正确");
        }
        Map<String, Object> res = voteService.queryTopicOptions(topicId);
        if (CollectionUtils.isEmpty(res)) return ResultVO.fail("未找到指定的投票/选项");
        return ResultVO.success("", res);
    }
}
