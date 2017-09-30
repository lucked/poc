import React, { Component } from "react";
import MonitorSymbol from './MonitorSymbol.jsx';
import SymbolTable from './SymbolTable.jsx';
import feed from '../data/feed';

class SymbolTicker extends Component {
  constructor() {
    super();
    var stocks = {};
    feed.watch(['FRAK', 'VEGI', 'CPI', 'IAU', 'DOG', 'OIL', 'CORN', 'FAN', 'TAN', 'MOO']);
    feed.onChange(data =>
    { 
      stocks[data.symbol] = data;
      this.setState({ stocks: stocks, last: data});
    });
    this.MonitorSymbol = this.MonitorSymbol.bind(this);
    this.unMonitorSymbol = this.unMonitorSymbol.bind(this);
    this.state = {
      stocks: stocks
    };
  }

  MonitorSymbol(symbols) {
    symbols = symbols.replace(/ /g,'');
    var arr = symbols.split(",");
    feed.watch(arr);
  }

  unMonitorSymbol(symbol) {
    feed.unwatch(symbol);
    var stocks = this.state.stocks;
    delete stocks[symbol];
    this.setState({stocks: stocks});
  }

  render() {
    return (
        <div className="container" id="main">
          <div>
            <MonitorSymbol MonitorSymbolHandler={this.MonitorSymbol}/>
            <SymbolTable stocks={this.state.stocks} last={this.state.last} unMonitorSymbolHandler={this.unMonitorSymbol}/>
            <div className="row">
              <div className="alert alert-warning" role="alert">This is mocked data. Do not use.</div>
            </div>
          </div>
        </div>
    );
  }
  
}
export default SymbolTicker;