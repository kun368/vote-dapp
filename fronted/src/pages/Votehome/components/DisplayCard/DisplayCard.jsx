/* eslint react/jsx-no-target-blank: 0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Balloon, Grid} from '@icedesign/base';
import './DisplayCard.scss';
import Mock from 'mockjs'
import DataBinder from '@icedesign/data-binder';

const {Row, Col} = Grid;

@DataBinder({
  systemStatus: {
    url: '/api/systemStatus',
    method: 'get',
    data: {},
    defaultBindingData: {
      arr: [
        { title: '昨日内容浏览次数1', hint: '', value: '22222.2', desc: 'hehehe' },
        { title: '昨日内容浏览次数2', hint: '', value: '22222.2', desc: 'hehehe' },
      ]
    }
  }
})
export default class extends Component {
  static displayName = '';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    this.props.updateBindingData('systemStatus');
  }

  render() {
    const { systemStatus } = this.props.bindingData;

    return (
      <IceContainer className="display-card-container" style={styles.container}>

        <Row wrap>
          {
            systemStatus.arr.map((item, i) => {
              return (
                <Col xxs="24" s="12" l="6" style={styles.item} key={i}>
                  <div style={styles.title} className="title">
                    {item.title}
                    <span style={styles.extraIcon}>
                      <Balloon
                        trigger={
                          <img
                            src="https://img.alicdn.com/tfs/TB1mfqwXFuWBuNjSszbXXcS7FXa-36-36.png"
                            alt=""
                            width="12"
                            height="12"
                          />
                        }
                        triggerType="hover"
                        closable={false}
                      >
                        {item.hint}
                      </Balloon>
                    </span>
                  </div>
                  <div className="count" style={styles.count}>
                    {item.value}
                  </div>
                  <div style={styles.desc} className="desc">
                    <span>{item.desc}</span>
                  </div>
                </Col>
              )
            })
          }

        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '3px',
  },
  desc: {
    fontSize: '12px',
  },
  down: {
    width: '6px',
    height: '9px',
  },
  up: {
    width: '6px',
    height: '9px',
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
};
