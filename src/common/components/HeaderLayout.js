import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../constants/routes';
import Sidebar from './Sidebar';

const { Header, Sider, Content } = Layout;

const HeaderLayout = ({collapse, toggle}) => {

    let pageURL = window.location.href;
    let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/'));

    // const [isCollapsed, setCollapsed] = useState(false);
    // const toggle = () => {
    //     setCollapsed(!isCollapsed)
    // }

    return (
      <Header className="site-layout-background" style={{ height: 55, paddingLeft:10 }}>
        {collapse ? <DoubleRightOutlined style={{fontSize:25}} onClick={toggle}/> :  <DoubleLeftOutlined style={{fontSize:25}} onClick={toggle}/>}
      </Header>

      );
}

export default HeaderLayout;