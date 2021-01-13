import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Divider, Layout, Menu, Avatar, Button } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  TeamOutlined,
  BarsOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  LogoutOutlined,
  BugOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../constants/routes';
import personal1 from '../../assets/personal1.jpg'

const { Header, Sider, Content } = Layout;

const Sidebar = ({collapsed}) => {

    let pageURL = window.location.href;
    let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/'));
    console.log(lastURLSegment,'lastURLSegment')


    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu  mode="inline" defaultSelectedKeys={[lastURLSegment]} >
            <Menu.Item key={routes.PERSONEL_LIST_PAGE} icon={<TeamOutlined />}>
            <Link to={routes.PERSONEL_LIST_PAGE}> 
              Personel List
            </Link>  
            </Menu.Item>
            {/* <Menu.Item key={routes.ABOUT_ME} icon={<UserOutlined />}>
            <Link to={routes.ABOUT_ME}> 
              About me
            </Link>
            </Menu.Item> */}
           
            <Menu.Item key={routes.TASK_LIST} icon={<AppstoreOutlined />}>
              <Link to={routes.TASK_LIST}> 
                Task List
              </Link> 
            </Menu.Item><Menu.Item key={routes.TASK_HISTORY} icon={<ApartmentOutlined />}>
              <Link to={routes.TASK_HISTORY}> 
                Task History
              </Link> 
            </Menu.Item>
            <Menu.Item key={routes.PERFORMANCE_GRAPH} icon={<PieChartOutlined />}>
            <Link to={routes.PERFORMANCE_GRAPH}> 
              Performance Graph
            </Link>
            </Menu.Item>
            <Menu.Item key={routes.HIRE_CANDIDATE} icon={<UserAddOutlined />}>
              <Link to={routes.HIRE_CANDIDATE}> 
                Hire Candidate
              </Link>  
            </Menu.Item>
            <Menu.Item key={routes.ABOUT_ME} icon={<BugOutlined />}>
              <Link to={routes.ABOUT_ME} > 
                
                   About the Developer
               
              </Link>
            </Menu.Item>
            <Divider style={{marginTop:0,marginBottom:5}}/>
            <Menu.Item key={routes.LOGIN_PAGE} icon={<LogoutOutlined />}>
              <Link to={routes.LOGIN_PAGE}> 
                Log out
              </Link>  
            </Menu.Item>
            
          </Menu>
        </Sider>
      );
}

export default Sidebar;