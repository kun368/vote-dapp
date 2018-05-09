import React, {Component} from 'react';
import {Dialog, Grid, Input, Radio, Button, Select} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {enquireScreen} from 'enquire-js';
import {Feedback} from '@icedesign/base';
import DataBinder from "@icedesign/data-binder/lib/index";

const {Row, Col} = Grid;
const {Group: RadioGroup} = Radio;

const dappAddress = "n1oXdmwuo5jJRExnZR5rbceMEyzRsPeALgm";

const defaultValue = {
  selectedItem: undefined,
};

const Toast = Feedback.toast;

export default class SimpleFormDialog extends Component {
  static displayName = 'SimpleFormDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false,
      topicTitle: '',
      topicId: 0,
      topicOptions: []
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = (title, id, options) => {
    console.log('showDialog:', title, id, options);
    this.setState({
      visible: true,
      topicTitle: title,
      topicId: id,
      topicOptions: options,
      value: {
        selectedItem: options[0].value
      }
    });
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        Toast.error(error);
        return;
      }
      const nebulas = require("nebulas");
      const Account = nebulas.Account;
      const neb = new nebulas.Neb();
      neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));

      const from = Account.NewAccount().getAddressString();
      const selectedItem = this.state.value.selectedItem;
      console.log(selectedItem, from, dappAddress);

      const contract = {
        "function": 'voteFor',
        "args": `["${selectedItem}"]`
      };

      neb.api
        .call(from, dappAddress, "0", "0", "1000000", "2000000", contract)
        .then(resp => {
          console.log("success:", resp);
          Toast.success("投票成功！");
        })
        .catch(err => {
          console.log("error:", err.message);
          Toast.error("投票失败！");
        });
    });
  };

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const {isMobile} = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
      <Dialog
        className="simple-form-dialog"
        style={simpleFormDialog}
        autoFocus={false}
        footerAlign="center"
        title={'参与投票：' + this.state.topicTitle}
        {...this.props}
        onOk={this.onOk}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        isFullScreen
        visible={this.state.visible}
      >
        <div style={{marginBottom: 30}}>
          <strong style={{color: 'red'}}>使用须知：</strong>
          请务必安装<a href="https://github.com/ChengOrangeJu/WebExtensionWallet" target="_blank">Chrome插件</a>后，使用主网支付！
        </div>

        <IceFormBinderWrapper
          ref={(ref) => {
            this.refForm = ref;
          }}
          value={this.state.value}
          onChange={this.onFormChange}
        >
          <div style={styles.dialogContent}>

            <Row style={styles.formItem}>
              <Col span={`${isMobile ? '6' : '3'}`}>
                <label style={styles.formLabel}>投票选项</label>
              </Col>
              <Col span={`${isMobile ? '18' : '16'}`}>
                <IceFormBinder
                  required
                  message="必须选择一个选项">
                  <Select
                    name="selectedItem"
                    style={styles.input}
                    dataSource={this.state.topicOptions}
                  />
                </IceFormBinder>
                <IceFormError name="selectedItem"/>
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>
      </Dialog>
    );
  }
}

const styles = {
  simpleFormDialog: {width: '640px'},
  dialogContent: {},
  formRow: {marginTop: 20},
  input: {width: '100%'},
  formLabel: {lineHeight: '26px'},
};
