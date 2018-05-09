import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
} from '@icedesign/base';
import DataBinder from "@icedesign/data-binder/lib/index";
import Mock from "mockjs";

const {Row, Col} = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换
const SwitchForForm = (props) => {
  const checked = props.checked === undefined ? props.value : props.checked;

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(currentChecked) => {
        if (props.onChange) props.onChange(currentChecked);
      }}
    />
  );
};


@DataBinder({
  createVote: {
    url: '/api/createVote',
    method: 'post',
    data: {
      title: '',
      options: '',
    },
    defaultBindingData: {}
  }
})
export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        title: '',
        options: '',
      },
    };
  }

  componentDidMount() {
    Mock.mock('/api/createVote', {
      "status": "SUCCESS",
      "message": "创建成功",
      data: {}
    });
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        title: '',
        options: '',
      },
    });
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        // 处理表单报错
      }
      this.props.updateBindingData('createVote', value);
    });
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="发起投票" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  投票名称：
                </Col>

                <Col s="12" l="10">
                  <IceFormBinder
                    name="title"
                    required
                    message="投票名称必须填写">
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="title"/>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  投票选项：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="options"
                    required
                    message="至少填写一个有效的选项">
                    <Input multiple style={{width: '100%'}} placeholder="输入投票选项，每行代表一个选项"/>
                  </IceFormBinder>
                  <IceFormError name="options"/>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="12" l="10">
                  <Button type="primary" onClick={this.submit}>
                    立即创建
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
