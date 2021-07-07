import React, { Component } from "react";
import {useDispatch, useSelector} from 'react-redux'
import ChartistGraph from "react-chartist";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import { Card } from "../components/Card/Card.jsx"
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
} from "../variables/Variables.jsx";

const Dashboard = () =>  {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createLegend = (json) => {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fas fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  
    return (
      <div className="content text-dark text-center">
        <Typography style={{ padding: '10px' }} variant="h4">Hi {userInfo.firstname}, Welcome to Dashboard</Typography>
        <Container fluid>
          <Row style={{padding:"2%"}}>
            <Col lg={3} sm={6} >
              <StatsCard
                bigIcon={<i className=" fa-3x fas fa-user" style={{color:'olive'}} />}
                statsText="Active Users"
                statsValue="150"
                statsIcon={<i className="fas fa-sync-alt" style={{color:'darkslategray'}}/>}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className=" fa-3x fas fa-mobile-alt" style={{color:'indigo'}} />}
                statsText="Total Requests"
                statsValue="1800"
                statsIcon={<i className="fas fa-sync-alt" style={{color:'darkslategray'}}/>}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className='fa-3x fas fa-user-md'style={{color:'steelblue'}}></i>}
                statsText="Practs Online"
                statsValue="50"
                statsIcon={<i className="fas fa-clock" style={{color:'darkslategray'}}/>}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className=" fa-3x fas fa-user-check" style={{color:'teal'}} />}
                statsText="Completed Jobs"
                statsValue="1200"
                statsIcon={<i className="fas fa-clock" style={{color:'darkslategray'}}/>}
                statsIconText="In the last hour"
              />
            </Col>
            
          </Row>
          <Row style={{padding:"2%"}}>
            <Col md={8}>
              <Card
                statsIcon="fas fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fas fa-clock"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

        </Container>
      </div>
    );
}

export default Dashboard;
