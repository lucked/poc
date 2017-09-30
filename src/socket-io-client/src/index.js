import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SymbolTicker from './components/SymbolTicker.jsx';
import registerServiceWorker from './registerServiceWorker';
import GoldenLayout from 'golden-layout'
import Something from './components/Something.jsx';

window.React = React
window.ReactDOM = ReactDOM

var myLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content:[{
            type: 'column',
            content:[{
                type:'react-component',
                component: 'ticker'
            },{
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
                    type:'react-component',
                    component: 'something'
                }]
            },
            {
                type: 'column',
                content:[{
                    type:'react-component',
                    component: 'something'
                },{
                    type:'react-component',
                    component: 'something'
                }]
            }]
        }]
    }]
});


myLayout.registerComponent( 'ticker', SymbolTicker );
myLayout.registerComponent( 'something', Something );

//Once all components are registered, call
myLayout.init();


//ReactDOM.render(<SymbolTicker />, document.getElementById('root'));
registerServiceWorker();
