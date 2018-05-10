# Vote-Dapp: 去中心化投票系统

[![Build Status](https://travis-ci.org/kun368/vote-dapp.svg?branch=master)](https://travis-ci.org/kun368/vote-dapp)
[![Language](https://img.shields.io/badge/language-java-orange.svg)](https://github.com/kun368/ACManager)
[![Language](https://img.shields.io/badge/language-react-blue.svg)](https://github.com/kun368/ACManager)

- #### [系统地址](http://vote.zzkun.com)
- #### [NAS-DAPP开发者注册](https://incentive.nebulas.io/cn/signup.html?invite=OILxo)

**基于NAS智能合约的去中心化投票系统, 构建去中心、公平、公开、公正的区块链投票系统**


## 简介

该智能合约解决了投票场景中的不信任痛点。

Vote-Dapp不依赖特定的投票机构，它以利用特定的智能合约技术，使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的投票行为，并使用密码学的设计来确投票的各个环节安全性。

其去中心化特性与算法本身可以确保防范作弊投票的现象，确保一人一票。

## Snapshot

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-10/15541246.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-10/36762525.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-10/96843367.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-10/93442592.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-10/69071957.jpg)

![](http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-10/74060902.jpg)

## 合约

```javascript
"use strict";


var OptionVotes = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.optionId = obj.optionId;
    this.votes = obj.votes;
  } else {
    this.optionId = '';
    this.votes = [];
  }
};

OptionVotes.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var SuperDictionary = function () {
  LocalContractStorage.defineMapProperty(this, "repo", {
    parse: function (text) {
      return new OptionVotes(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

SuperDictionary.prototype = {
  init: function () {
    // todo
  },

  voteFor: function (optionId) {
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;


    var item = this.repo.get(optionId);
    if (!item) {
      item = new OptionVotes();
      item.optionId = optionId;
    }
    item.votes.push({
      from: from,
      value: value
    });
    this.repo.put(optionId, item);
  },

  queryOption: function (optionId) {
    var item = this.repo.get(optionId);
    if (!item) {
      throw new Error("deposit not exist.");
    }
    return item;
  },

  queryOptionsSize: function (optionIds) {
    var ids = optionIds.split(',');
    return ids.map((item, i) => {
      var res = this.repo.get(item);
      if (!res) {
        return 0;
      }
      return res.votes.length;
    })
  }
};
module.exports = SuperDictionary;
```