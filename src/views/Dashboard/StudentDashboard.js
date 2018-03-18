import React, { Component } from 'react';
import classnames from 'classnames';

// react charts2 components
import {Bar, Line} from 'react-chartjs-2';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Nav,
  NavItem,
  NavLink,
  Input,
  Table,
  TabContent,
  TabPane
} from 'reactstrap';

// victory charts components
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryCandlestick, VictoryLine } from 'victory';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// Main Chart

// convert Hex to RGBA
function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const daysLeft = getDaysLeft();

function getDaysLeft() {
  var today = new Date();
  var comps = new Date(2018, 2, 24);
  var one_day = 1000*60*60*24;

  var difference = Math.abs(comps.getTime() - today.getTime());
  return Math.round(difference / one_day);
}

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const candleStickData = [
  {x: new Date(2016, 1, 1), open: 5, close: 10, high: 15, low: 0},
  {x: new Date(2016, 2, 1), open: 10, close: 15, high: 20, low: 5},
  {x: new Date(2016, 3, 1), open: 15, close: 20, high: 22, low: 10},
  {x: new Date(2016, 4, 1), open: 20, close: 10, high: 25, low: 7},
  {x: new Date(2016, 5, 1), open: 10, close: 8, high: 15, low: 5}
]

const lineData =[
  { x: 1, y: 2 },
  { x: 10, y: 3 },
  { x: 20, y: 5 },
  { x: 40, y: 4 },
  { x: 42, y: 7 }
]

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        },
        ticks: {
          beginAtZero: true,
          min: 0
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

const mainChart = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: convertHex(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
}

const participationChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        drawOnChartArea: false,
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: Math.ceil(100 / 5),
        max: 100
      }
    }]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    }
  }
}

const mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        drawOnChartArea: false,
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: Math.ceil(250 / 5),
        max: 250
      }
    }]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    }
  }
}


class StudentDashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      activeTab: '1',
      day: 0
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    console.log(this.state.day);
    console.log(daysLeft);
    this.setState({
      day: daysLeft
    });
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Statistics</CardTitle>
                    <div className="small text-muted">March 2018</div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <ul>
                  <li>
                    <div className="text-muted">Completed</div>
                    <strong>29 Levels (14%)</strong>
                    <Progress className="progress-xs mt-2" color="success" value="14"/>
                  </li>
                  <li className="d-none d-md-table-cell">
                    <div className="text-muted">Total Time Spent</div>
                    <strong>357 Mins</strong>
                  </li>
                  <li>
                    <div className="text-muted">Favourite Language</div>
                    <strong>Python</strong>
                  </li>
                  <li className="d-none d-md-table-cell">
                    <div className="text-muted">Countdown to Competition</div>
                    <strong>{this.state.day} Days Left (99%)</strong>
                    <Progress className="progress-xs mt-2" color="danger" value="99"/>
                  </li>
                </ul>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Percentile Ranking
              </CardHeader>
              <CardBody>
              <VictoryChart domainPadding={20} scale={{ x: "time" }} theme={VictoryTheme.material}>
                <VictoryAxis label="Levels" tickFormat={(t) => `${(t.getMonth() * 10) - 9}-${t.getMonth() * 10}`} 
                  style={{axisLabel: {fontSize: 15, padding: 30}}} />
                <VictoryAxis label="Five-Number Summary" dependentAxis 
                  style={{axisLabel: {fontSize: 15, padding: 30}}}  />
                <VictoryCandlestick candleColors={{ positive: "#00FA9A", negative: "#c43a31" }} data={candleStickData} />
              </VictoryChart>
              </CardBody>
            </Card>
          </Col>
            
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Time Prediction for each CodeCombat level
              </CardHeader>
              <CardBody>
              <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                <VictoryAxis label="Levels" tickValues={[10, 20, 30, 40]} 
                  style={{axisLabel: {fontSize: 15, padding: 30}}} />
                <VictoryAxis label="Duration(minutes)" dependentAxis 
                  style={{axisLabel: {fontSize: 15, padding: 30}}} />
                <VictoryLine data={lineData} />
              </VictoryChart>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
          <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Top Selected Tech Articles for the Week
          </CardHeader>
            <CardBody>
            <Row>
              <Col xs="12" sm="6" lg="4">
                <h2>JavaScript</h2>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" lg="4">
                <Card>
                  <CardImg src="../img/javascript/js_image1.jpg" alt="Card image cap" />
                  <CardBody style={{height: 245+"px"}}>
                    <CardTitle>🎼webpack 4: released today!!✨</CardTitle>
                    <CardText>Codename: Legato 🎶</CardText>
                    <Button href="https://medium.com/webpack/webpack-4-released-today-6cdb994702d4?source=topic_page---8------0----------------">Read Article</Button>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card>
                  <CardImg src="../img/javascript/js_image2.jpg" alt="Card image cap" />
                  <CardBody style={{height: 245+"px"}}>
                    <CardTitle>Elegant patterns in modern JavaScript: RORO</CardTitle>
                    <CardText>I wrote my first few lines of JavaScript not long after the language was invented. If you told me at the time that I would one day be …</CardText>
                    <Button href="https://medium.freecodecamp.org/elegant-patterns-in-modern-javascript-roro-be01e7669cbd?source=topic_page---8------1----------------">Read Article</Button>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card>
                  <CardImg src="../img/javascript/js_image3.jpg" alt="Card image cap" />
                  <CardBody style={{height: 245+"px"}}>
                    <CardTitle>Straightforward code splitting with React and webpack</CardTitle>
                    <CardText>Everything seemed perfect until your app size increased too fast …</CardText>
                    <Button href="https://medium.freecodecamp.org/straightforward-code-splitting-with-react-and-webpack-4b94c28f6c3f?source=topic_page---8------0----------------">Read Article</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col xs="12" sm="6" lg="4">
                <h2>Latest Technology</h2>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" lg="4">
                <Card>
                  <CardImg src="../img/tech/tech_image1.jpg" alt="Card image cap" />
                  <CardBody style={{height: 245+"px"}}>
                    <CardTitle>It’s Time to Leave San Francisco</CardTitle>
                    <CardText>That’s it. The Kevin Roose article in the New York Times did it for you. It’s time to leave San Francisco. It’s time to leave Silicon…</CardText>
                    <Button href="https://thebolditalic.com/its-time-to-leave-san-francisco-2a5a74f42433?source=topic_page---8------0----------------">Read Article</Button>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card>
                  <CardImg src="../img/tech/tech_image2.jpg" alt="Card image cap" />
                  <CardBody style={{height: 245+"px"}}>
                    <CardTitle>Enacting the nation’s strongest net neutrality protections in California</CardTitle>
                    <CardText>An open internet is essential to maintaining our democracy, growing our economy, protecting consumers, and preserving critical health…</CardText>
                    <Button href="https://medium.com/@Scott_Wiener/enacting-the-nations-strongest-net-neutrality-protections-in-california-bdee6bb9b3c1?source=topic_page---8------1----------------">Read Article</Button>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="4">
                <Card>
                  <CardImg src="../img/tech/tech_image3.jpg" alt="Card image cap" />
                  <CardBody style={{height: 245+"px"}}>
                    <CardTitle>Can Bots Help Us Deal with Grief?</CardTitle>
                    <CardText>How simulations can bring our loved ones back to life</CardText>
                    <Button href="https://medium.com/s/when-robots-rule-the-world/can-bots-help-us-deal-with-grief-3de488cae96?source=topic_page---8------3----------------">Read Article</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StudentDashboard;
