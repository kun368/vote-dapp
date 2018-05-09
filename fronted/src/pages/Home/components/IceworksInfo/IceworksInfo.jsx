import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Link } from 'react-router-dom';

export default class ProductIntro extends Component {
  static displayName = 'ProductIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.productContent}>
          <div style={styles.productInfo}>
            <h3 style={styles.title}>Vote Dapp</h3>
            <div style={styles.titleLine}>
              <div style={styles.titleHighlightLine} />
            </div>
            <p style={styles.desc}>
              该智能合约解决了投票场景中的不信任痛点。

              Vote-Dapp不依赖特定的投票机构，它以利用特定的智能合约技术，使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的投票行为，并使用密码学的设计来确投票的各个环节安全性。

              其去中心化特性与算法本身可以确保防范作弊投票的现象，确保一人一票。
            </p>
            <Link to="">
              <Button style={styles.extraButton}>了解更多 &gt;</Button>
            </Link>
          </div>
          <div style={styles.productSnapshot}>
            <img
              width={696}
              height={527}
              src="https://img.alicdn.com/tfs/TB1SbvpgQyWBuNjy0FpXXassXXa-1392-1054.png"
              alt=""
            />
          </div>
        </div>
        <div style={styles.clipBackground} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: 690,
    marginTop: '-130px',
    paddingTop: '10px',
  },
  productContent: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 120,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#fff',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
  },
  productSnapshot: {},
  productInfo: {
    width: 400,
    marginRight: 90,
    marginTop: 40,
  },
  title: {
    color: '#223C4E',
    fontSize: 36,
  },
  desc: {
    color: '#6D7A82',
    fontSize: 16,
    lineHeight: 1.5,
    marginTop: 24,
  },
  extraButton: {
    marginTop: 35,
    borderColor: '#3080FE',
    background: 'transparent',
    color: '#3080FE',
  },
  clipBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#FAFAFA',
    clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)',
  },
};
