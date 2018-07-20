import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class GoodsItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      goodsId: "goods_" + props.num,
      num: props.num,
      cnt: 0
    }

    this.changeCount = this.changeCount.bind(this);
  }

  addCount(){
    this.setState(
      {cnt: this.state.cnt + 1},
      () => this.props.onClick(this.state)
    );
  }

  changeCount(event){
    this.setState(
      {cnt: (event.target.value === "" ? 0 : event.target.value)},
      () => this.props.onClick(this.state)
    );
  }

  render() {
    return (
      <div>
        <input type="number"
          value={ this.state.cnt } 
          id={this.state.goodsId}
          onChange={this.changeCount}
        />
        <label htmlFor={this.state.goodsId}>{this.state.goodsId}
        {this.state.cnt === 0 && (<span> Solt Out </span>)}
        </label>
        <button onClick={() => this.addCount()}>Add</button>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsCntArr: [0,0,0,0],
      totalCnt: 0
    }
  }

  sumTotalCnt (eventParam) {
    let goodsCntArr = this.state.goodsCntArr;
    let totalCnt = 0;
    goodsCntArr[eventParam.num] = eventParam.cnt;
    totalCnt = goodsCntArr.reduce((prev, curr) => parseInt(prev, 10) + parseInt(curr, 10));

    this.setState({
      goodsCntArr: goodsCntArr,
      totalCnt: totalCnt
    });
  }

  renderGoodsItems () {
    let goodsItems = this.state.goodsCntArr.map((val, idx) => 
      <GoodsItem key={idx}
        num={idx} 
        onClick={(eventParam) => this.sumTotalCnt(eventParam)}
        onChange={(eventParam) => this.sumTotalCnt(eventParam)}
      />
    );
    return goodsItems;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          { this.renderGoodsItems() }
        </div>
        <br />
        total goods count: {this.state.totalCnt}
      </div>
    );
  }
}

export default App;
