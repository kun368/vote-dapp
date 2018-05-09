package com.zzkun.votedapp.controller;

import com.zzkun.votedapp.entities.ResultVO;
import com.zzkun.votedapp.service.VoteService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class MainController {

    @Autowired
    private VoteService voteService;

    @RequestMapping("/createVote")
    public Object createVote(@RequestParam String title, @RequestParam String options) {
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
        return Math.random();
    }

    @RequestMapping("/queryVotes")
    public Object queryVotes() {
        return Math.random();
    }

    @RequestMapping("/queryOptions")
    public Object queryOptions() {
        return Math.random();
    }
}
