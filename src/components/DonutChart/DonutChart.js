import React, { Component } from "react";
import { Doughnut } from "@reactchartjs/react-chart.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import "./mystyle.css";

let columns = [
  { field: 'color', headerName: '', width: 10},
  { field: 'ticker', headerName: 'Ticker', width: 150 },
  { field: 'shares', headerName: 'Shares', width: 150 }
]
let rows = []

export default class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [''],
        datasets: [
          {
            label: "Portfolio",
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: "#fff",
            data: [100]
          }
        ]
      },
      tickervalue: "",
      sharevalue: "",
      key: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const newRow = { id: rows.length + 1, color: "", ticker: event.target.ticker.value, shares: event.target.shares.value }

    if (this.state.data.labels.includes(newRow.ticker.toUpperCase())) return;
    else rows.push(newRow);

    this.setState( state => {
      state.data.labels = rows.map(x => x.ticker);
      state.data.datasets[0].data = rows.map(x => Number(x.shares));
      state.tickervalue = "";
      state.sharevalue = "";
    })

    this.setState({ key: Math.floor(Math.random() * 10) });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="bkg">
        <div className="flexbox" style={{display:"flex"}}>
          <div className="header">
            <Doughnut data={data} width={1000} height={1000} key={this.state.key} options={{
                responsive: false,
                maintainAspectRatio: true,
                cutoutPercentage: 60,
                title: {
                  display: "Portfolio",
                  fontsize: 24
                },
                legend: {
                  display: false
                }
              }} />
            </div>
            <div className="grid">
              <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                  required
                  value={this.state.tickervalue}
                  type="text"
                  id="standard-required"
                  label="Ticker"
                  variant="outlined"
                  name="ticker"
                  onChange={(e) => {
                    let tickervalue = e.target.value.toUpperCase();

                    tickervalue = tickervalue.replace(/[^A-Za-z]/, "");

                    this.setState({
                      tickervalue,
                    });
                  }}
                />
                <TextField
                  required
                  value={this.state.sharevalue}
                  id="filled-number"
                  label="Shares"
                  placeholder="Shares"
                  type="number"
                  variant="outlined"
                  name="shares"
                  onChange={(e) => {
                    let sharevalue = e.target.value.toUpperCase();

                    sharevalue = sharevalue.replace(/[^0-9]/, "");

                    this.setState({
                      sharevalue,
                    });
                  }}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
              <DataGrid key={ this.state.key } rows={rows} columns={columns} pageSize={6} rowHeight={50} hideFooter={false} />
            </div>
        </div>
      </div>
    );
  }
}