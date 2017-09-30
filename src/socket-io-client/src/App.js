import React, { Component } from "react";
import socketIOClient from "socket.io-client";
var createReactClass = require('create-react-class');

var MonitorSymbol = createReactClass({
  getInitialState: function() {
      return {symbol: ""};
  },
  MonitorSymbol: function() {
      this.props.MonitorSymbolHandler(this.state.symbol);
      this.setState({symbol: ''});
  },
  handleChange: function(event) {
      this.setState({symbol: event.target.value});
  },
  render: function () {
      return (
          <div className="row">
              <p>Choose from tickers: FRAK, VEGI, CPI, IAU, DOG, OIL, CORN, FAN, TAN, MOO</p>
              <div className="input-group">
                  <input type="text" className="form-control" placeholder="Comma separated list of stocks to watch..." value={this.state.symbol} onChange={this.handleChange} />
                  <span className="input-group-btn">
                      <button className="btn btn-default" type="button" onClick={this.MonitorSymbol}>
                          <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch
                      </button>
                  </span>
              </div>
          </div>
      );
  }
});

var StockRow = createReactClass({
    unwatch: function() {
        this.props.unMonitorSymbolHandler(this.props.stock.symbol);
    },
    render: function () {
        var lastClass = 'standard-cell',
            changeClass = 'change-positive',
            iconClass = 'glyphicon glyphicon-triangle-top';
        if (this.props.stock === this.props.last) {
            lastClass = this.props.stock.change < 0 ? 'last-negative' : 'last-positive';
        }
        if (this.props.stock.change < 0) {
            changeClass = 'change-negative';
            iconClass = 'glyphicon glyphicon-triangle-bottom';
        }
        return (
            <tr>
                <td>{this.props.stock.symbol}</td>
                <td>{this.props.stock.open}</td>
                <td className={lastClass}>{this.props.stock.last}</td>
                <td className={changeClass}>{this.props.stock.change} <span className={iconClass} aria-hidden="true"></span></td>
                <td>{this.props.stock.high}</td>
                <td>{this.props.stock.low}</td>
                <td><button type="button" className="btn btn-default btn-sm" onClick={this.unwatch}>
                    <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                </button></td>
            </tr>
        );
    }
});

var StockTable = createReactClass({
  render: function () {
      var items = [];
      for (var symbol in this.props.stocks) {
          var stock = this.props.stocks[symbol];
          items.push(<StockRow key={stock.symbol} stock={stock} last={this.props.last} unMonitorSymbolHandler={this.props.unMonitorSymbolHandler}/>);
      }
      return (
          <div className="row">
          <table className="table-hover">
              <thead>
                  <tr>
                      <th>Symbol</th>
                      <th>Open</th>
                      <th>Last</th>
                      <th>Change</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Unwatch</th>
                  </tr>
              </thead>
              <tbody>
                  {items}
              </tbody>
          </table>
          </div>
      );
  }
});

var feed = (function () {
  
  const endpoint = "http://127.0.0.1:4001";
  const socket = socketIOClient(endpoint);
  
    return {
        onChange: function(callback) {
            socket.on('stock', callback);
        },
        watch: function(symbols) {
            socket.emit('join', symbols);
        },
        unwatch: function(symbol) {
            socket.emit('leave', symbol);
        }
    };
  
  }());

class App extends Component {
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
            <StockTable stocks={this.state.stocks} last={this.state.last} unMonitorSymbolHandler={this.unMonitorSymbol}/>
            <div className="row">
              <div className="alert alert-warning" role="alert">This is mocked data. Do not use.</div>
            </div>
          </div>
        </div>
    );
  }
  
}
export default App;