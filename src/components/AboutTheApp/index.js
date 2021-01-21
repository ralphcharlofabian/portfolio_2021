import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Typed from 'react-typed';
import Fade from 'react-reveal/Fade';

import { Layout, Card, Row, Avatar, Drawer, Col, Divider, Rate, Button, Tooltip, Modal, Upload, Input, Dropdown, Menu, DatePicker, InputNumber, notification, Popover } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  UsergroupAddOutlined,
  FundViewOutlined,
  BarChartOutlined,
  TrophyOutlined,
  Html5Outlined,
  CoffeeOutlined,
  PictureOutlined,
  RestOutlined
} from '@ant-design/icons';

//constants
import Sidebar from '../../common/components/Sidebar';
import feDeskImage from '../../assets/feDeskImageBlue.svg'
import reactImage from '../../assets/techSkillsLogo/react.png'
import firebaseImage from '../../assets/techSkillsLogo/firebase.png'
import reduxImage from '../../assets/techSkillsLogo/redux.png'
import antDImage from '../../assets/techSkillsLogo/antD.png'

import personalImage1 from '../../assets/personal1.jpg'

import { routes } from '../../common/constants/routes';


const { Header,  Content } = Layout;

const AboutTheApp = () => {

  const [collapsed, setCollapsed] = useState(false);


  const toggle = () => {
    setCollapsed(!collapsed)
}

    return (
      <Layout>
        <Sidebar collapsed={collapsed}/>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ height: 55, paddingLeft:10 }}>
          <Col span={21}>
            {collapsed ? <DoubleRightOutlined style={{fontSize:25}} onClick={toggle}/> :  <DoubleLeftOutlined style={{fontSize:25}} onClick={toggle}/>}
          </Col>
          {/* <Col span={3}>
            <Link to={routes.ABOUT_ME}> 
              <Button style={{height:45}} type="text">
                <Avatar src={personal1} size={35} style={{marginRight:10}}/> About the Developer
              </Button>
            </Link>
          </Col> */}
          
        </Header>
          <Content
            className="site-layout-background"
            style={{
              //margin: '8px 10px',
              padding: 12,
              minHeight: window.innerHeight - 55,
              backgroundColor:'#def3fd'
            }}
          >
          <Fade top>
            <Row justify='center' style={{paddingTop:'5%'}}>
              <img alt='wave' src={feDeskImage} style={{marginLeft:10, color:'blue'}}></img>
            </Row>
            <Row justify='center'>
              <h1 style={{fontSize:40, paddingTop:10, fontFamily:'sans-serif', color:'#1890ff' }}>Performance Trust Scale (PTS)</h1>
            </Row>
            <Row justify='center'>
                  <h3 style={{ width:'80%',fontFamily:'sans-serif', fontWeight: 400, lineHeight: 1.5}}>
                    {`This application gives you a simple metric idea showcasing employee's performance as well as their behavior towards other employees in the team through graph representation. Experience an awesome rating features with feedback from your co-employees.This is a task based app that provides you metric score on task difficulty and employee's output speed in finishing the task at a given time.
                                        For demonstration purposes only.`}
                      </h3>
            </Row>
            <Row justify="start" style={{paddingTop:'4%', paddingLeft:20}}>
              
              <Col span={8}>
                <h3 style={{margin:0, paddingBottom:'4%'}}>Development Frameworks</h3>
                <Row justify='space-between'>
                  <Tooltip placement="top" title={'React'}>
                    <Avatar src={reactImage} size={120}/>
                  </Tooltip>
                  <Tooltip placement="top" title={'Redux'}>
                    <Avatar src={reduxImage} shape='square' size={120}/>
                  </Tooltip>
                  <Tooltip placement="top" title={'Ant Design'}>
                    <Avatar src={antDImage} size={120}/>
                  </Tooltip>
                  <Tooltip placement="top" title={'Firebase'}>
                    <Avatar src={firebaseImage} size={120}/>
                  </Tooltip>
                </Row>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <h3 style={{margin:0, paddingBottom:'4%'}}>Some Features of the Application</h3>
                <Card size='small' hoverable><UsergroupAddOutlined style={{fontSize:25, marginRight:10, color:'#22bb33'}}/>Hire and Create a dream team for the project</Card>
                <Card size='small'hoverable><FundViewOutlined style={{fontSize:25, marginRight:10, color:'purple'}} />Create and monitor their task status</Card>
                <Card size='small' hoverable><BarChartOutlined style={{fontSize:25, marginRight:10, color:'blue'}}/>Calculate and project task development via graphs</Card>
                <Card size='small' hoverable><TrophyOutlined style={{fontSize:25, marginRight:10, color:'gold'}}/>Give awards and recognitions in employees as well as promote</Card>
              </Col>
              <Col span={2}></Col>
              <Col span={5}>
                <Row justify='center'> 
                  <h3 style={{margin:0, paddingBottom:'6%'}}>Man behind the application</h3>  

                </Row>
                <Row justify='center'>
                  <Tooltip placement="top" title={'Want to know more? Just Click my Avatar'}>
                    <Link to={routes.ABOUT_ME} > 
                      <Avatar src={personalImage1} size={120}/>
                    </Link>
                  </Tooltip>
                  
                </Row>
                <Row justify='center' style={{marginTop:15}}>
                  <Tooltip placement="top" title={'Idea and Data gathering'}>
                    <RestOutlined style={{fontSize:50, marginRight:10, color:'#036636'}} />
                  </Tooltip>
                  <Tooltip placement="top" title={'UI/UX Designer'}>
                  <PictureOutlined style={{fontSize:50, marginRight:10, color:'skyblue'}} />
                  </Tooltip>
                  <Tooltip placement="top" title={'Fullstack Developer'}>
                    <Html5Outlined style={{fontSize:50, marginRight:10, color:'orange'}} />
                  </Tooltip>
                </Row>
                
              </Col>
            </Row>
            

          </Fade>
          </Content>
        </Layout>
      </Layout>
      );
}

export default AboutTheApp;