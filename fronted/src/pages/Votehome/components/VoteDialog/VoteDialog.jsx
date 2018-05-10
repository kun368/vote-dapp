import React, {Component} from 'react';
import {Dialog, Feedback, Grid, Radio, Select, Table, Progress} from '@icedesign/base';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {enquireScreen} from 'enquire-js';
import axios from 'axios';
import G2 from '@antv/g2';

const {Row, Col} = Grid;
const {Group: RadioGroup} = Radio;

const dappAddress = "n1rLVkCzV6yHASDfeRQJPqZov3cH7AKUGoP";
const userAddress = "n1PeCvxwQhCT9SRm7Ho1TWsUiWtz7fHPXGV";

const defaultValue = {
  selectedItem: undefined,
};

const Toast = Feedback.toast;

export default class VoteDialog extends Component {
  static displayName = 'VoteDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: defaultValue,
      isMobile: false,
      topicTitle: '',
      topicId: 0,
      topicOptions: [],
      optionsSize: []
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  initCharts = () => {
    const count = this.state.topicOptions.length;
    const data = [];
    for (let i = 0; i < count; ++i) {
      data.push({
        genre: this.state.topicOptions[i].label,
        sold: this.state.optionsSize[i]
      })
    }
    console.log(data);
    const chart = new G2.Chart({
      container: 'c1',
      width: 600,
      height: 300
    });
    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();
  };

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  showDialog = (title, id, options, optionsSize) => {
    console.log('showDialog:', title, id, options, optionsSize);
    this.setState({
      visible: true,
      topicTitle: title,
      topicId: id,
      topicOptions: options,
      optionsSize: optionsSize,
      value: {
        selectedItem: options[0].value
      }
    });
    this.initCharts();
  };

  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  //检查扩展是否已安装，如果安装了扩展，var“webExtensionWallet”将被注入到web页面中1
  checkInstalledPlugin = () => {
    return typeof(webExtensionWallet) !== "undefined";
  };

  onOk = () => {
    this.refForm.validateAll((error) => {
      if (error) {
        Toast.error(error);
        return;
      }
      if (!this.checkInstalledPlugin()) {
        Toast.error("请先安装WebExtensionWallet插件！");
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
        function: 'voteFor',
        args: `["${selectedItem}"]`
      };


      window.postMessage({
        "target": "contentscript",
        "data": {
          "to": dappAddress,
          "value": "0",
          "contract": {
            "function": contract.function,
            "args": contract.args
          }
        },
        "method": "neb_sendTransaction",
      }, "*");
      window.addEventListener('message', function (e) {
        console.log("message received, msg.data: " + JSON.stringify(e.data));
        try {
          if (!!e.data.data.txhash) {
            console.log("Transaction hash:\n" + JSON.stringify(e.data.data.txhash, null, '\t'));
          }
        } catch (e) {
        }
      });
      Toast.success("已发起交易，提交后Status变为Success即投票成功！")
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
        <div>
          <strong style={{color: 'red'}}>使用须知：</strong>
          投票请务必安装<a href="https://github.com/ChengOrangeJu/WebExtensionWallet" target="_blank">Chrome插件</a>，并切换到主网！
        </div>
        <div style={{marginBottom: 26}}/>

        <div id="c1"></div>

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
                <label style={styles.formLabel}>您的选择</label>
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
  paginationWrapper: {
    display: 'flex',
    padding: '20px 0 0 0',
    flexDirection: 'row-reverse',
  },
};
