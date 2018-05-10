import React, { Component } from 'react';
import SystemStatusCard from './components/SystemStatusCard';
import CreateActivityForm from './components/CreateActivityForm';
import TopicList from "./components/TopicList/TopicList";
import VoteDialog from "./components/VoteDialog/VoteDialog";

export default class Votehome extends Component {
  static displayName = 'Votehome';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="votehome-page">
        <SystemStatusCard />
        <CreateActivityForm />
        <TopicList/>
        <VoteDialog/>
      </div>
    );
  }
}
