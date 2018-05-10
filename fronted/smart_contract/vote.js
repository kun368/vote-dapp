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
      var ret = 0;
      try {
        ret = this.queryOption(item).votes.length;
      } catch (e) {
        ret = 0;
      }
      return ret;
    })
  }
};
module.exports = SuperDictionary;
