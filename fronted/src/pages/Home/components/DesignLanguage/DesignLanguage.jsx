import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Link } from 'react-router-dom';

export default class FeatureList extends Component {
  static displayName = 'FeatureList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.contentWrapper}>
          <div style={styles.titleWrapper}>
            <h3 style={styles.title}>系统特点</h3>
            <div style={styles.titleLine}>
              <div style={styles.titleHighlightLine} />
            </div>
          </div>
          <p style={styles.desc}>
            突破传统平台产品束缚，新的探索尝试，构建去中心、公平、公开、公正的区块链投票系统
          </p>
          <div style={styles.featureListWrapper}>
            <div style={styles.featureItem}>
              <img
                src="https://img.alicdn.com/tfs/TB1b7O4if5TBuNjSspmXXaDRVXa-172-170.png"
                alt=""
                style={{ width: 86, height: 85 }}
              />
              <h4 style={styles.featureTitle}>高度安全</h4>
              <p style={styles.featureDesc}>自动执行 无法修改</p>
            </div>
            <div style={styles.featureItem}>
              <img
                src="https://img.alicdn.com/tfs/TB1PnOuik9WBuNjSspeXXaz5VXa-180-146.png"
                alt=""
                style={{ width: 90, height: 73 }}
              />
              <h4 style={styles.featureTitle}>透明投票</h4>
              <p style={styles.featureDesc}>全链公开 透明过程</p>
            </div>
            <div style={styles.featureItem}>
              <img
                src="https://img.alicdn.com/tfs/TB1GUF9ibSYBuNjSspiXXXNzpXa-160-136.png"
                alt=""
                style={{ width: 80, height: 68 }}
              />
              <h4 style={styles.featureTitle}>公平公正</h4>
              <p style={styles.featureDesc}>一人一票 专克作弊</p>
            </div>
          </div>
          <div style={styles.extraInfo}>
            <Link to="/votehome">
              <Button style={styles.extraButton}>了解更多 &gt;</Button>
            </Link>
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
    marginTop: '-120px',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    marginTop: 120,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#eee',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
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
    width: 525,
    textAlign: 'center',
  },
  featureListWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 60,
    maxWidth: 960,
    width: '100%',
  },
  featureItem: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureTitle: {
    marginTop: 35,
    fontSize: 24,
    color: '#333333',
  },
  featureDesc: {
    fontSize: 14,
    color: '#999999',
    marginTop: 0,
    marginBottom: 0,
  },
  extraButton: {
    marginTop: 50,
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
    background: '#fff',
    clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)',
  },
};
