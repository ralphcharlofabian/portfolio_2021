import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Card, Row, Col, Input, Button, Tooltip, Modal } from 'antd';
import { UserOutlined, EyeOutlined, InfoCircleOutlined, LoginOutlined } from '@ant-design/icons';
import Fade from 'react-reveal/Fade';

import feDeskImage from '../../assets/feDeskImage.svg'

//constants
import { routes } from '../../common/constants/routes';


const Login = () => {

    const [showInfoModal, setShowInfoModal] = useState(false);
    const onClickShowInfoModal = () => {
        setShowInfoModal(true);
      }
    const handleCancelInfoModal = () => {
        setShowInfoModal(false);
    }

    return (
       <div style={{backgroundColor:'#c899ff', height: window.innerHeight, paddingTop: 160, paddingLeft:'10%'}}>
           <div style={{ width: window.innerWidth/1.25, borderRadius:15, padding:0, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                {/* <div > */}
                    <Row >
                        <Col span={10}>
                             <Card  style={{height: window.innerHeight/2 + 100, backgroundColor:'#7700b4', borderTopLeftRadius:15, borderBottomLeftRadius:15}} bordered={false}>
                                 <Row>
                                     <h1 style={{color:'#fafafa', marginBottom:0}}>Welcome Aboard Mate...</h1>
                                 </Row>
                                 <Row>
                                     <span style={{color:'#fafafa', marginLeft:20, opacity:.70}}>Please enter your credentials to authenticate your account </span>
                                 </Row>
                                 <Row style={{marginTop:'12%'}}>
                                    <Col span={2}></Col>
                                    <Col span={20}>
                                        <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
                                    </Col>
                                    <Col span={2}></Col> 
                                 </Row>
                                 <Row style={{marginTop:'5%'}}>
                                    <Col span={2}></Col>
                                    <Col span={20}>
                                        <Input size="large" placeholder="Password" prefix={<EyeOutlined />}/>
                                    </Col>
                                    <Col span={2}></Col> 
                                 </Row>
                                 <Row style={{marginTop:'5%'}}>
                                    <Col span={18}></Col>
                                    <Col span={4}>
                                        <Link to={routes.PERSONEL_LIST_PAGE}>
                                            <Button icon={<LoginOutlined />} style={{height:40, color:'white', backgroundColor:'#c456ec'}}> LOGIN  </Button>
                                        </Link>
                                    </Col>
                                    <Col span={2}></Col>
                                 </Row>
                                 <Row style={{paddingTop:'22%'}}>
                                    <span style={{color:'#fafafa', opacity:.70}}>For some available credentials you can click the information button to access the demo application. 
                                        <Tooltip title="show credentials">
                                            <Button shape="circle" type="text" icon={<InfoCircleOutlined style={{color:'#fafafa', marginLeft:5, fontSize:20}} />} onClick={onClickShowInfoModal}> </Button>
                                        </Tooltip>
                                    </span>
                                    
                                    
                                 </Row>
                             </Card>
                        </Col>
                        <Col span={14}>
                             <Card  style={{height: window.innerHeight/2 + 100, borderTopRightRadius:15, borderBottomRightRadius:15}} bordered={false}>
                             <Fade top >
                                 <Row justify="center"><h1 style={{color:'#c456ec'}}>PERFORMANCE TRUST SCALE</h1></Row>
                                 <Row justify="center" style={{paddingTop:'8%'}}> <img alt='wave' src={feDeskImage} style={{marginLeft:10}}></img> </Row>
                                 <Row justify="center"><h5 style={{color:'#c456ec', paddingTop:'5%'}}>
                                     {`"This application gives you a simple metric idea showcasing employee's performance as well as their behavior towards other employees in the team through graph representation. 
                                        Experience an awesome rating features with feedback from your co-employees. This is a task based app that provides you metric score on task difficulty and employee's output speed in finishing the task at a given time.
                                        For demonstration purposes only."`}</h5></Row>
                                 
                             </Fade>
                                 
                             </Card>
                        </Col>
                    </Row>
                {/* </div> */}
           </div>

           <Modal
                title="Available Credentials"
                visible={showInfoModal}
                onCancel={handleCancelInfoModal}
                footer={null}>
                    <Row>
                        <span>
                            <b> Administrator:</b>
                            <UserOutlined style={{marginLeft:25, marginRight:5}} />
                            Admin
                            <EyeOutlined style={{marginLeft:15,marginRight:5}}/>
                            Admin123
                        </span>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <span>
                            <b> Manager:</b>
                            <UserOutlined style={{marginLeft:57, marginRight:5}} />
                            Manager
                            <EyeOutlined style={{marginLeft:15,marginRight:5}}/>
                            Mgr123
                        </span>
                    </Row>
                    <Row style={{marginTop:10}}>
                        <span>
                            <b> Employee:</b>
                            <UserOutlined style={{marginLeft:51, marginRight:5}} />
                            Employee
                            <EyeOutlined style={{marginLeft:15,marginRight:5}}/>
                            Emp123
                        </span>
                    </Row>

            </Modal>
           
           
       </div>
      );
}

export default Login;