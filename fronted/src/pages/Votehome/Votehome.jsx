import React, { Component } from 'react';
import DisplayCard from './components/DisplayCard';
import CreateActivityForm from './components/CreateActivityForm';
import SortCardList from './components/SortCardList';
import NormalFooter from './components/NormalFooter';

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
        <SortCardList />
        <NormalFooter />
      </div>
    );
  }
}
