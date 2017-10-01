import React, { Component } from "react";

class MonitorSymbol extends Component{
    constructor() {
        super();
        this.state = {symbol: ""};
        this.MonitorSymbol = this.MonitorSymbol.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    MonitorSymbol() {
        this.props.MonitorSymbolHandler(this.state.symbol);
        this.setState({symbol: ''});
    }

    handleChange(event) {
        this.setState({symbol: event.target.value});
    }

    render() {
        return (
            <div className="row">
                <p>Choose from tickers: FRAK, VEGI, CPI, IAU, DOG, OIL, CORN, FAN, TAN, MOO</p>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Comma separated list of stocks to watch..." 
                    value={this.state.symbol} onChange={this.handleChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.MonitorSymbol}>
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch
                        </button>
                    </span>
                </div>
            </div>
        );
    }
};

export default MonitorSymbol;