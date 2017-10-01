import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SymbolTicker from './components/SymbolTicker.jsx';
import registerServiceWorker from './registerServiceWorker';
import GoldenLayout from 'golden-layout'
import Something from './components/Something.jsx';
import ScatterPlot from './components/ScatterPlot.jsx';
import LineChart from './components/LineChart.jsx';
import TradeBlotter from './components/TradeBlotter.jsx';
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-fresh.css";

window.React = React
window.ReactDOM = ReactDOM

var myLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content:[{
            type: 'column',
            width: 30,
            content:[{
                title: 'Symbol Ticker',
                type:'react-component',
                component: 'ticker'
            },{
                title: 'Latest Events',
                type:'react-component',
                component: 'something',
                height: 15
            }]
        },
        {
            type: 'row',
            content:[{
                type: 'column',
                content:[{
                    title: 'Trade Blotter',
                    type:'react-component',
                    component: 'blotter'
                }]
            },
            {
                type: 'column',
                content:[
                    {
                        type: 'stack',
                        content: [{
                            type: 'stack',
                            title: 'Symbol Charts',
                            content: [
                                {
                                    title: 'Line Chart',
                                    type:'react-component',
                                    component: 'linechart'
                                }, {
                                title: 'Scatter Plot',
                                type:'react-component',
                                component: 'scatterplot'
                            }]
                        }
                    ]},
                    {
                    title: 'Chat Window',
                    type:'react-component',
                    component: 'something'
                }]
            }]
        }]
    }]
});


myLayout.registerComponent( 'ticker', SymbolTicker );
myLayout.registerComponent( 'something', Something );
myLayout.registerComponent( 'scatterplot', ScatterPlot );
myLayout.registerComponent( 'linechart', LineChart );
myLayout.registerComponent( 'blotter', TradeBlotter );

//Once all components are registered, call
myLayout.init();
registerServiceWorker();
