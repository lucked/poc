import React from 'react'
import {Line} from 'react-chartjs-2'
import feed from '../data/feed';


 class LineChart extends React.Component {

  constructor(props)
  {
    super(props)
    this.buffersize = 10;
    this.point = 0;
    feed.watch(['FRAK']);
    feed.onChange( data =>
        { 
            this.onChange(data);
        });

    this.options = {animation: false};

    this.data = {
    labels: [],
    datasets: [
        {
        label: 'Symbol Price Tracker',     
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#FFE761',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        duration: 0,
        data: []
        }
    ]
    }

  }

  onChange(newdata) {

    if(this.point % 100 === 0)
    {
        const size = this.data.datasets[0].data.length
        if (size >= this.buffersize)
        {
        this.data.datasets[0].data.shift()
        this.data.labels.shift()
        }
        this.data.labels.push(this.point)
        this.data.datasets[0].data.push(newdata.last)
        this.setState(this.data);
    }
    this.point++;
  }

  render()
  {
    return (
      <Line data={this.data} options={this.options}  redraw/>
    )
  }

}
export default LineChart;
