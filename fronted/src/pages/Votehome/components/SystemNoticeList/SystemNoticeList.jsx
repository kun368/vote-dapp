import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Pagination } from '@icedesign/base';
import DataBinder from "@icedesign/data-binder/lib/index";
import Mock from "mockjs";
import SimpleFormDialog from "../SimpleFormDialog/SimpleFormDialog"

const dict = {
  up: '置顶',
  hot: '新',
  new: '热',
};


@DataBinder({
  queryVotes: {
    url: '/api/queryVotes',
    method: 'post',
    params: {
      currentPage: 1
    },
    defaultBindingData: {
      total: 1,
      pageSize: 15,
      result: [
        {
          title: '关于淘宝网存储设备商品发布规范的公告',
          id: '1',
          tag: 'up',
          time: '2017-11-29',
        }
      ]
    }
  },
  queryOptions: {
    url: '/api/queryOptions',
    method: 'post',
    params: {
      topicId: ''
    },
    defaultBindingData: {
      result: [
        { value: '110', label: '支持' },
      ]
    }
  }
})
export default class SystemNoticeList extends Component {
  static displayName = 'SystemNoticeList';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      dialogVisible: false
    };
  }

  componentDidMount() {
    this.props.updateBindingData('queryVotes', {params: {currentPage: 1}});
  }

  handleChange = (current) => {
    console.log('current:', current);
    this.setState({ current });
    this.props.updateBindingData('queryVotes', {params: {currentPage: current}});
  };

  handleClickTopic = (title, id) => {
    this.props.updateBindingData('queryOptions', {params: {topicId: id}}, () => {
      const { queryOptions } = this.props.bindingData;
      this._childComp.showDialog(title, id, queryOptions.result);
    });
  };

  render() {
    const { queryVotes } = this.props.bindingData;

    return (
      <div className="system-notice-list">
        <SimpleFormDialog ref={comp => this._childComp = comp}/>
        <IceContainer>
          <div className="notice-list-content">
            <h2 style={styles.title}>最新投票</h2>
            <ul style={styles.noticeList}>
              {queryVotes.result.map((item, index) => {
                return (
                  <li key={index} style={styles.noticeItem}>
                    <a style={styles.noticeTitle} href="javascript:void(0)" onClick={this.handleClickTopic.bind(this, item.title, item.id)}>
                      {item.title}
                    </a>
                    {item.tag && (
                      <span style={{ ...styles.noticeTag, ...styles[item.tag] }}>
                        {dict[item.tag]}
                      </span>
                    )}
                    <span style={styles.noticeTime}>{item.time}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={styles.paginationWrap}>
            <Pagination
              shape="arrow-only"
              current={this.state.current}
              onChange={this.handleChange}
              total={queryVotes.total}
              pageSize={queryVotes.pageSize}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 10px',
    fontSize: '18px',
  },
  noticeList: {
    margin: 0,
    padding: 0,
  },
  noticeItem: {
    position: 'relative',
    padding: '12px 0',
    paddingRight: '65px',
    listStyle: 'none',
    borderBottom: '1px solid #F4F4F4',
  },
  noticeTitle: {
    fontSize: '14px',
    color: '#666',
    textDecoration: 'none',
  },
  noticeTag: {
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '8px',
    marginLeft: '5px',
  },
  noticeTime: {
    position: 'absolute',
    right: '0px',
    top: '15px',
    fontSize: '12px',
    color: '#999',
  },
  paginationWrap: {
    marginTop: '20px',
    textAlign: 'right',
  },
  up: {
    color: '#4296ff',
    background: '#eff6ff',
  },
  new: {
    color: '#fca61c',
    background: '#fff4e2',
  },
  hot: {
    color: '#f86d6d',
    background: '#ffe8e8',
  },
};
