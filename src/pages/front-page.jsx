import React from 'react';
import fetchData from '../service/api.js';
import MyMap from '../components/my-map.jsx';
import Chart from '../components/chart.jsx';
import CountryList from '../components/sidebar/country-list.jsx';
import { Container, Row, Col, Spinner } from "reactstrap";
import views from "../utils/views";

const OPTIONS = [
  {
    name: 'CASES',
    total: ({ cases }) => cases,
    map: ({ country, cases, countryInfo }) => ({
          country: country,
          data: cases,
          flag: countryInfo.flag,
          lat: countryInfo.lat,
          long: countryInfo.long
        }),
  },
  {
    name: 'DEATHS',
    total: ({ deaths }) => deaths,
    map: ({ country, deaths, countryInfo }) => ({
          country: country,
          data: deaths,
          flag: countryInfo.flag,
          lat: countryInfo.lat,
          long: countryInfo.long
        }),
  },
  {
    name: 'RECOVERED',
    total: ({ recovered }) => recovered,
    map: ({ country, recovered, countryInfo }) => ({
          country: country,
          data: recovered,
          flag: countryInfo.flag,
          lat: countryInfo.lat,
          long: countryInfo.long
        }),
  }
];

class FrontPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isHistoricalLoaded: false,
      items: [],
      selected: 0,
      input: '',
      historical: []
      
    };

    this.updateInput = this.updateInput.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.list = this.list.bind(this);
  }

  updateInput(event) {
    console.log(this.state.items.map(OPTIONS[this.state.selected].map).filter(({ country }) => country === event));
    console.log(event);
    this.setState(() => {
      return {
        input: event
      };
    });
  }

  color() {
    let color = '';

    switch(this.state.selected) {
      case 0:
        color = 'blue';
        break;
      case 1:
        color = 'red';
        break;
      case 2:
        color = 'green';
        break;
      default:
        color = 'blue';
    }

    return color;


  }

  sum() {

    let toTotal = 0;

    const mappedItems = this.state.items.map(OPTIONS[this.state.selected].map);

    console.log(mappedItems);

    switch(this.state.selected) {
      case 0:
        toTotal = this.state.items.map(({ cases }) => cases);
        break;
      case 1:
        toTotal = this.state.items.map(({ deaths }) => deaths);
        break;
      case 2:
        toTotal = this.state.items.map(({ recovered }) => recovered);
        break;
      default:
        toTotal = this.state.items.map(({ cases }) => cases);
    }

    let total = 0;

    for(let i in toTotal) {
      total += toTotal[i];
    }

    return total;
  };

  list(event) {

   
  };
  
  historicalData() {

    //console.log(this.state.historical);

    if(!this.state.isHistoricalLoaded) {
      return;

    } else {
      
      let list = [];

      switch(this.state.selected) {
        case 0:
          list = this.state.historical.cases;
          break;
        case 1:
          list = this.state.historical.deaths;
          break;
        case 2:
          list = this.state.historical.recovered;
          break;
        default:
          list = this.state.historical.cases;
      }
      let data = [];
      let current = 0;


      for (var k in list) {
        if(data.length === 0) {
          data.push({
            name: k,
            growthPct: 0
          });
        } else {
          data.push({
            name: k,
            growthPct: (((list[k] - current) / current) * 100).toFixed(2)
          });
        }
        current = list[k];
      }

      return data;
    }

  };
  
  setSelected(event) {
    console.log(event);
    this.setState(() => {
      return {
        selected: event
      };
    });
  }


  async componentDidMount() {

    const dataItems = await fetchData('https://disease.sh/v3/covid-19/countries');
    const historicItems = await fetchData('https://disease.sh/v3/covid-19/historical/all?lastdays=60');

    this.setState(() => {
      return {
        isLoaded: true,
        items: dataItems,
        isHistoricalLoaded: true,
        historical: historicItems
      }
    });

  }

  render() {
    let list;
    if(this.state.input === '') {
      list = this.state.items.map(OPTIONS[this.state.selected].map);
    } else {
      list = this.state.items
        .map(OPTIONS[this.state.selected].map)
        .filter(({ country }) => country.toLowerCase()
              .includes(this.state.input.toLowerCase())
        );
    }
    return (
      <Container fluid className="vh-100">
        {this.state.items.length ? (
          <Row>
            <Col xs="4" lg="3">
              <CountryList
                options={OPTIONS.map(({ name }) => name)}
                select={this.setSelected}
                onSubmit={this.updateInput}
                list={list}
                total={this.state.items.map(OPTIONS[this.state.selected].total).reduce((a, b) => a + b, 0)}
                activeView={views[this.state.selected]}
              />
            </Col>
            <Col xs="8" lg="9">
              <Row className="h-50">
                <MyMap
                  list={this.state.items.map(OPTIONS[this.state.selected].map)}
                  activeView={views[this.state.selected]}
                />
              </Row>
              <Row className="h-50 overflow-hidden px-3">
                <Chart
                  list={this.historicalData()}
                  color={this.color()}
                />
              </Row>

            </Col>
          </Row>
        ) : (
          <Row className="h-100 d-flex align-items-center justify-content-center">
            <Spinner type="grow" />
          </Row>
        )}
      </Container>
    );
  }
}

export default FrontPage;