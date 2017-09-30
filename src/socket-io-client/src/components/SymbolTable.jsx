import React, { Component } from "react";
import SymbolRow from './SymbolRow.jsx'

class SymbolTable extends Component{
  render() {
      var items = [];
      for (var symbol in this.props.stocks) {
          var stock = this.props.stocks[symbol];
          items.push(<SymbolRow key={stock.symbol} stock={stock} last={this.props.last} unMonitorSymbolHandler={this.props.unMonitorSymbolHandler}/>);
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
};


export default SymbolTable;