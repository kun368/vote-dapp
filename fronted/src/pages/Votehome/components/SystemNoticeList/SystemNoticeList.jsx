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
    data: {
      title: '',
      options: '',
    },
    defaultBindingData: {
      totalPage: 1,
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
    data: {
      topicId: ''
    },
    defaultBindingData: {
      result: []
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
    Mock.mock('/api/queryVotes', {
      "status": "SUCCESS",
      "message": "",
      "data": {
        totalPage: 10,
        result: [
          {
            title: '关于淘宝网存储设备商品发布规范的公告',
            id: '1',
            tag: 'up',
            time: '2017-11-29',
          },
          {
            title: '加强淘宝网电动四轮车类目准入的公告',
            id: '2',
            tag: 'new',
            time: '2017-10-29',
          },
          {
            title: '淘宝网VR头盔商品发布规范的公告',
            id: '3',
            tag: 'hot',
            time: '2017-03-11',
          },
          {
            title: '加强淘宝网农药类目准入的公告',
            id: '4',
            tag: '',
            time: '2017-02-16',
          }
        ]
      }
    });
    Mock.mock('/api/queryOptions', {
      "status": "SUCCESS",
      "message": "",
      "data": {
        result: [
          { value: '110', label: '支持' },
          { value: '111', label: '反对' },
          { value: '112', label: '酱油通道' },
        ]
      }
    });
    this.props.updateBindingData('queryVotes', {currentPage: 1});
  }

  handleChange = (current) => {
    console.log('current:', current);
    this.setState({ current });
    this.props.updateBindingData('queryVotes', {currentPage: current});
  };

  handleClickTopic = (title, id) => {
    this.props.updateBindingData('queryOptions', {topicId: id}, () => {
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
