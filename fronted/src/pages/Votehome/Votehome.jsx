import React, { Component } from 'react';
import DisplayCard from './components/DisplayCard';
import CreateActivityForm from './components/CreateActivityForm';
import SystemNoticeList from "./components/SystemNoticeList/SystemNoticeList";
import SimpleFormDialog from "./components/SimpleFormDialog/SimpleFormDialog";

export default class Votehome extends Component {
  static displayName = 'Votehome';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="votehome-page">
        <DisplayCard />
        <CreateActivityForm />
        <SystemNoticeList/>
        <SimpleFormDialog/>
      </div>
    );
  }
}
