import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SymbolTicker from './components/SymbolTicker.jsx';
import registerServiceWorker from './registerServiceWorker';
import GoldenLayout from 'golden-layout'

window.React = React
window.ReactDOM = ReactDOM


var myLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content:[{
            type:'react-component',
            component: 'test-component',
            props: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type:'react-component',
                component: 'test-component',
                props: { label: 'B' }
            },{
                type:'react-component',
                component: 'test-component',
                props: { label: 'C' }
            }]
        }]
    }]
});

myLayout.registerComponent( 'test-component', SymbolTicker );

//Once all components are registered, call
myLayout.init();


//ReactDOM.render(<SymbolTicker />, document.getElementById('root'));
registerServiceWorker();
