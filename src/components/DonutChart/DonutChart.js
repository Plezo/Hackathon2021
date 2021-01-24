import React, { Component } from "react";
import { Doughnut } from "@reactchartjs/react-chart.js";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import "./mystyle.css";

let columns = [
  { field: 'color', headerName: '', width: 10},
  { field: 'ticker', headerName: 'Ticker', width: 110 },
  { field: 'percent', headerName: '%', width: 100 }
]
let rows = [
  { id: 1, color: "", ticker: 'TSLA', percent: 25},
  { id: 2, color: "", ticker: 'AAPL', percent: 25},
  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

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
      value: "",
      key: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const newRow = { id: rows.length + 1, color: "", ticker: event.target.ticker.value, percent: event.target.percent.value }
    rows.push(newRow);

    this.setState( state => {
      state.data.labels = rows.map(x => x.ticker);
      state.data.datasets[0].data = rows.map(x => Number(x.percent));
    })
    console.log(rows)

    this.setState({ key: Math.floor(Math.random() * 10) });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
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
            <div className="grid" style={{ paddingTop: '10px', paddingLeft: '10px', height: '50vh', width: '50vw' }}>
              <form className="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                  required
                  value={this.state.value}
                  type="text"
                  id="standard-required"
                  label="Ticker"
                  variant="outlined"
                  name="ticker"
                  onChange={(e) => {
                    let value = e.target.value;

                    value = value.replace(/[^A-Za-z]/gi, "");

                    this.setState({
                      value,
                    });
                  }}
                />
                <TextField
                  id="filled-number"
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  name="percent"
                />
                <Button variant="outlined" type="submit">
                  Default
                </Button>
              </form>
              <DataGrid key={ this.state.key} rows={rows} columns={columns} pageSize={5} rowHeight={50} hideFooter={true}/>
            </div>
            
        </div>
      </div>
    );
  }
}

// const DoughnutChart = () => (
//   <>

//     <div className="header">
//       <h1 className="title">Current Portfolio</h1>

//       <Doughnut
//         data={data}
//         options={{
//           responsive: true,
//           cutoutPercentage: 80,
//           maintainAspectRatio: false,
//           animation: {
//             animateScale: true,
//           },
//         }}
//         className="doughnutclass"
//       />
//     </div>
//   </>
// );

// let labels = ["Stock1", "Stock2", "Stock3", "Stock4", "Stock5", "Stock6"];
// let data = [40, 10, 20, 10, 15, 5];
// let colors = ["black", "blue", "red", "yellow", "purple", "pink"];

// let DoughnutChart = document.getElementById("Chart").getContext("2d");
// let chart = new Chart(DoughnutChart, {
//   type: "doughnut",
//   data: {
//     labels: labels,
//     datasets: [
//       {
//         data: data,
//         backgroundColor: colors,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     cutoutPercentage: 80,
//     animation: {
//       animateScale: true,
//     },
//     title: {
//       text: "Portfolio",
//       display: true,
//     },
//   },
// });
