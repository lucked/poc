import React, { Component } from "react";

class SymbolRow extends Component{
    unwatch() {
        this.props.unMonitorSymbolHandler(this.props.stock.symbol);
    }

    render() {
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
};


export default SymbolRow;