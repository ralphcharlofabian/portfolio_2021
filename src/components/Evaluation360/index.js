import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Typed from 'react-typed';
import Fade from 'react-reveal/Fade';

import { Layout, Card, Row, Avatar, Drawer, Col, Divider, Rate, Button, Tooltip, Modal, Upload, Input, Dropdown, Menu, DatePicker, InputNumber, notification, Popover, Result } from 'antd';
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

const Evaluation360 = () => {

  const [collapsed, setCollapsed] = useState(false);

  const taskListHistoryReducer = useSelector(state => state.taskListHistoryReducer); 
  console.log(taskListHistoryReducer,'taskListHistoryReducer')
  const {taskHistoryList} = taskListHistoryReducer;

  // const [taskList, setTaskHistoryList] = useState(taskHistoryList ? taskHistoryList : []);

  let test = taskHistoryList.map(x=> x.taskHistory.forEach(element => {
     if (element.name === 'Jason Bourne') return element.performanceRate
  }));
console.log(test,'test')
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
            <Result
              status="404"
              title="Evaluation 360 is currently unavailable"
              subTitle="Sorry, the page you visited is currently in development mode, We will give you an update one it was successfully finish."
            />
          </Content>
        </Layout>
      </Layout>
      );
}

export default Evaluation360;