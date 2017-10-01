import React from "react";
import AgGridReact from "ag-grid-react"

class TradeBlotter extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.onGridReady = this.onGridReady.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        // grid callbacks
        this.getRowNodeId = this.getRowNodeId.bind(this);
        
        this.state = {
            columnDefs: [
                {
                    field: 'tradeid',
                    headerName: 'Trade Id',
                    cellRenderer: 'animateShowChange',
                },
                {
                    field: 'transactiontime',
                    headerName: 'Trans Time',
                    cellRenderer: 'animateShowChange',
                },
                {
                    field: 'symbol',
                    headerName: 'Symbol',
                    cellRenderer: 'animateShowChange',
                },
                {
                    field: 'price',
                    headerName: 'Price',
                    valueFormatter: this.numberFormatter,
                    cellRenderer: 'animateShowChange',
                    cellStyle: {'text-align': 'right'}
                },
                {
                    field: 'qty',
                    headerName: 'Quantity',
                    valueFormatter: this.numberFormatter,
                    cellRenderer: 'animateShowChange',
                    cellStyle: {'text-align': 'right'}
                },
                {
                    field: 'tv',
                    headerName: 'TV',
                    valueFormatter: this.numberFormatter,
                    cellRenderer: 'animateShowChange',
                    cellStyle: {'text-align': 'right'}
                }
            ]
        };
    }

    
    numberFormatter(params) {
        if (typeof params.value === 'number') {
            return params.value.toFixed(2);
        } else {
            return params.value;
        }
    }
    
    getRowNodeId(data) {
        return data.symbol;
    }

    onSelectionChanged() {
        let selectedNode = this.gridApi.getSelectedNodes()[0];
        this.props.onSelectionChanged(selectedNode ? selectedNode.data.symbol : null);
    }

    

    render()
    {
        return (
            <div style={{height: "100%", width: "100%"}}
                className="ag-fresh">
                    <AgGridReact.AgGridReact
                        columnDefs={this.state.columnDefs}
                        onGridReady={this.onGridReady}
                        enableSorting="true"
                        rowSelection="single"
                    />
            </div>
    )}
        
    // in onGridReady, store the api for later use
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        console.log('adding row data');
        var rowData = [
            {tradeid: '100253', transactiontime:'11:23:01.001', symbol: 'FRAK', 'price':100.2, 'qty':"100k", 'tv':"100,00.25"},
            {tradeid: '100323', transactiontime:'11:23:01.021', symbol: 'MOO', 'price':45.2, 'qty':"200k", 'tv':"-30,042.66"},
            {tradeid: '100544', transactiontime:'11:23:01.023', symbol: 'DOG', 'price':10.5, 'qty':"100k", 'tv':"54,033.00"},
            {tradeid: '100432', transactiontime:'11:23:01.534', symbol: 'OIL', 'price':140.4, 'qty':"100k", 'tv':"10,012.32"},
            {tradeid: '100531', transactiontime:'11:23:02.432', symbol: 'CORN', 'price':10.7, 'qty':"300k", 'tv':"800,872.34"},
            {tradeid: '100654', transactiontime:'11:23:03.654', symbol: 'MOO', 'price':200.1, 'qty':"200k", 'tv':"902.32"},
            {tradeid: '100237', transactiontime:'11:23:04.234', symbol: 'IAU', 'price':105.5, 'qty':"500k", 'tv':"-9,382.78"},
            {tradeid: '107554', transactiontime:'11:23:04.546', symbol: 'VEGI', 'price':78.3, 'qty':"600k", 'tv':"67,312.98"},
            {tradeid: '103467', transactiontime:'11:23:05.016', symbol: 'TAN', 'price':45.5, 'qty':"4m", 'tv':"-412.67"},
            {tradeid: '107654', transactiontime:'11:23:06.023', symbol: 'CPI', 'price':170.5, 'qty':"5m", 'tv':"78,012.98"},
            {tradeid: '103466', transactiontime:'11:23:06.034', symbol: 'MOO', 'price':40.7, 'qty':"106k", 'tv':"-179,012.56"},
        ];
        this.gridApi.addItems(rowData);
        // select the first symbol to show the chart
        this.gridApi.getModel().getRow(0).setSelected(true);
        this.gridApi.sizeColumnsToFit();
    }
}
    
export default TradeBlotter;