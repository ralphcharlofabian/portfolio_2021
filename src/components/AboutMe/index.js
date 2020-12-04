import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';

const { Header, Sider, Content } = Layout;

const AboutMe = () => {

    let pageURL = window.location.href;
    let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/'));
    console.log(lastURLSegment,'lastURLSegment')
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
      <Layout>
        <Sidebar collapsed={collapsed}/>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Contsdadadsdent
          </Content>
        </Layout>
      </Layout>
      );
}

export default AboutMe;