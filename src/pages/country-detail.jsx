import React from 'react';
import fetchData from '../service/api.js';
import CountryChart from '../components/country-chart.jsx';
import views from "../utils/views";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardText,
} from "reactstrap";;

class CountryDetail extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      countryData: [],
      historicalData:[]
    }
    console.log(props.match.params.countryId);
  }

  async componentDidMount() {

    const data = await fetchData('https://disease.sh/v3/covid-19/countries/' + this.props.match.params.countryId);
    const historicData = await fetchData('https://disease.sh/v3/covid-19/historical/' + this.props.match.params.countryId);

    this.setState(() => {
      return {
        isLoaded: true,
        countryData: data,
        flag: data.countryInfo.flag,
        historicalData: historicData
      };
    });
  }

  historicalData() {

    if(!this.state.isLoaded) {
      return;
    } else {

      let data = [];

      for (var k in this.state.historicalData.timeline.cases) {
        data.push({
          name: k,
          cases: this.state.historicalData.timeline.cases[k],
          deaths: this.state.historicalData.timeline.deaths[k],
          recovered: this.state.historicalData.timeline.recovered[k]
        })
      }

      return data;
    }
  }

  render() {
    return (
      <Container fluid className="vh-100">
        {this.state.isLoaded ? (
          <>
            <Row className="h-25 w-75 mx-auto">
              <Col className="my-auto">
                <Card className="text-center">
                  <CardBody>
                    <CardTitle>
                      <h2>{this.props.match.params.countryId}</h2>
                    </CardTitle>
                    <img
                      className="img-fluid"
                      src={this.state.flag}
                      alt={this.props.match.params.countryId}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col className="my-auto">
                <Card>
                  <CardHeader>
                    <h3>LIVE - {new Date().toLocaleDateString()}</h3>
                  </CardHeader>
                  <CardBody>
                    {views.map(({ color, title }) => (
                      <CardText key={title} className={`text-${color}`}>
                        {title} Today: {this.state.countryData[`today${title}`]}
                      </CardText>
                    ))}
                  </CardBody>
                </Card>
              </Col>
              <Col className="my-auto">
                <Card>
                  <CardHeader>
                    <h3>PER MILLION</h3>
                  </CardHeader>
                  <CardBody>
                    {views.map(({ color, title, field }) => (
                      <CardText key={title} className={`text-${color}`}>
                        {title} Per Million: {this.state.countryData[`${field}PerOneMillion`]}
                      </CardText>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="h-50 w-75 mx-auto my-5">
              <Col>
                <CountryChart
                  data={this.historicalData()}
                />
              </Col>
            </Row>
            <Row className="w-75 mx-auto mt-5 pt-5">
              <Button onClick={() => this.props.history.goBack()}>
                Go Back
              </Button>
            </Row>
          </>
        ) : (
            <Row className="vh-100 d-flex align-items-center justify-content-center">
                <Spinner type="grow"/>
            </Row>
        )}
      </Container>
    );
  };
}

export default CountryDetail;