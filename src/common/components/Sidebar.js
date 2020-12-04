import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  TeamOutlined,
  BarsOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  ApartmentOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../constants/routes';

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
            <Menu.Item key={routes.ABOUT_ME} icon={<UserOutlined />}>
            <Link to={routes.ABOUT_ME}> 
              About me
            </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              Graph
            </Menu.Item>
            <Menu.Item key="4" key={routes.TASK_LIST} icon={<AppstoreOutlined />}>
              <Link to={routes.TASK_LIST}> 
                Task List
              </Link> 
            </Menu.Item><Menu.Item key="5" key={routes.TASK_HISTORY} icon={<ApartmentOutlined />}>
              <Link to={routes.TASK_HISTORY}> 
                Task History
              </Link> 
            </Menu.Item>
            <Menu.Item key="6" key={routes.HIRE_CANDIDATE} icon={<UserAddOutlined />}>
              <Link to={routes.HIRE_CANDIDATE}> 
                Hire Candidate
              </Link>  
            </Menu.Item>
          </Menu>
        </Sider>
      );
}

export default Sidebar;