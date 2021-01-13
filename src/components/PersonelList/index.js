import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase'

import { Layout, Card, Row, Col, Avatar, Rate, Progress, Button, Modal, Input, notification, Divider } from 'antd';
import {
  UserOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserDeleteOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';
import {updatePersonelList, updateCandidateList} from '../../appRedux/actions'
import personal1 from '../../assets/personal1.jpg'

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

//firebase.firestore().collection('test').add({test:'test'})


const PersonelList = () => {
  const userListReducer = useSelector(state => state.userListReducer); 
  const dispatch = useDispatch();

  const {userList, availableCandidate} = userListReducer;
  // console.log(userList,'userListRed')
    // let pageURL = window.location.href;
    // let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/'));

    const [collapsed, setCollapsed] = useState(false);
    const [personelList, setUserList] = useState(userList? userList : []);
    const [candidateList, setCandidateList] = useState(availableCandidate? availableCandidate : []);
    const [selectedPerson, setSelectedPerson] = useState({}); 
    const [showPersonelModal, setShowPersonelModal] = useState(false);
    
    // useEffect(() => {
    //   setUserList(userList? userList :[])
    //   console.log(userList,'userListInfo useEffect');
    // }, [userListReducer]);
    


    let lineupInfoFe = userList.map(x => {return x.feRating}).reduce((a, b) => a + b, 0)
    let lineupInfoBe = userList.map(x => {return x.beRating}).reduce((a, b) => a + b, 0)
    let lineupInfoDes = userList.map(x => {return x.designRating}).reduce((a, b) => a + b, 0)
    let lineupInfoProd = userList.map(x => {return x.prodMgtRating}).reduce((a, b) => a + b, 0)
    let lineupInfoQa = userList.map(x => {return x.qaRating}).reduce((a, b) => a + b, 0)

    let lineupInfo = [
      { skill :'FE', count: lineupInfoFe? lineupInfoFe : 0, fullMark: 100 },
      { skill :'BE', count: lineupInfoBe? lineupInfoBe : 0, fullMark: 100 },
      { skill :'Des', count: lineupInfoDes? lineupInfoDes : 0, fullMark: 100 },
      { skill :'PM', count: lineupInfoProd? lineupInfoProd : 0, fullMark: 100 },
      { skill :'QA', count: lineupInfoQa? lineupInfoQa : 0, fullMark: 100 },
    ]

    let activeHours = [
      { hour: '7am', count: 2 },
      { hour: '8am', count: 2 },
      { hour: '9am', count: 3 },
      { hour: '10am', count: 5 },
      { hour: '11am', count: 3 },
      { hour: '12am', count: 1 },
      { hour: '1pm', count: 2 },
      { hour: '2pm', count: 7 },
      { hour: '3pm', count: 8 },
      { hour: '4pm', count: 7 },
      { hour: '5pm', count: 4 },
      { hour: '6pm', count: 1 },
      { hour: '7pm', count: 1 },
      { hour: '8pm', count: 3 },
      { hour: '9pm', count: 1 },
    ]

    useEffect(() => {
      console.log(personelList,'personelList updated use effect');
      dispatch(updatePersonelList(personelList));
    }, [personelList]);
    
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    
    const onClickShowPersonelModal = (selectedPersonel) => {
      setSelectedPerson(selectedPersonel);
      setShowPersonelModal(true);
    }

    const onClickHidePersonelModal = () => {
      setSelectedPerson({});
      setShowPersonelModal(false);
    }

    const onClickRemoveUser = (selectedPerson) => {
      console.log(selectedPerson,'selectedPerson')
      setUserList(personelList.filter(account => account.name !== selectedPerson.name));
      
      candidateList.push(selectedPerson);
      dispatch(updateCandidateList(candidateList));
      setShowPersonelModal(false);
      openNotificationWithIcon('success');
    }
    

    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Sucessfully removed from the list',
        description:
          'You can see the removed candidate at the Hire category.',
      });
    };

    return (
      <>
        <Layout>
          <Sidebar collapsed={collapsed}/>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ height: 55, paddingLeft:10 }}>
              <Row justify='space-between'>
                <Col span={21}>
                  {collapsed ? <DoubleRightOutlined style={{fontSize:25}} onClick={toggle}/> :  <DoubleLeftOutlined style={{fontSize:25}} onClick={toggle}/>}
                </Col>
                <Col span={3}>
                  <Link to={routes.ABOUT_ME}> 
                    <Button style={{height:45}} type="text">
                      <Avatar src={personal1} size={35} style={{marginRight:10}}/> About the Developer
                    </Button>
                  </Link>
                </Col>
              </Row>
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
              <Row style={{marginBottom:8}}>
                    <Col span={10} style={{paddingRight:5}}>
                      <Card size="small">
                        <p style={{margin:0}}>Team Composition:</p>
                        <Row>
                          <Col span={3}>
                            Frontend
                          </Col>
                          <Col span={21}>
                            <Progress percent={lineupInfoFe? lineupInfoFe : 0} size="small" />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}>
                            Backend
                          </Col>
                          <Col span={21}>
                            <Progress percent={lineupInfoBe ? lineupInfoBe : 0} size="small" />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}>
                            Design
                          </Col>
                          <Col span={21}>
                            <Progress percent={lineupInfoDes ? lineupInfoDes : 0} size="small" />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}>
                            Quality
                          </Col>
                          <Col span={21}>
                            <Progress percent={lineupInfoQa ? lineupInfoQa : 0} size="small" />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}>
                            Prod Mgt.
                          </Col>
                          <Col span={21}>
                            <Progress percent={lineupInfoProd ? lineupInfoProd : 0} size="small" />
                          </Col>
                        </Row>
                        {/* <Row justify='end'>
                          <p style={{marginTop:11, color:'lightgray'}}><span>* This shows the combined skills of all employee committed to this project</span></p>
                        </Row> */}
                      </Card>
                    </Col>
                    <Col span={3} style={{paddingRight:5}}>
                        <Card size='small' style={{paddingLeft:10}}>
                          <RadarChart cx={80} cy={75} outerRadius={55} width={200} height={132} data={lineupInfo}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" />
                            <PolarRadiusAxis />
                            <Radar name="skill" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          </RadarChart>
                        </Card>
                    </Col>
                    <Col span={11}>
                      <Card size='small' >
                        Employee Active Hour
                        <AreaChart
                          width={740}
                          height={110}
                          data={activeHours}
                          margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        </AreaChart>
                      </Card>
                     
                    </Col>
                  </Row>
              {personelList.map( personel => (
                <Card size="small" hoverable style={{marginBottom:3}}>
                  <Row justify='space-between'>
                    {/* <Col span={1}></Col> */}
                    <Col span={1}> 
                      <Avatar src={personel.picture} size={50}/>
                    </Col>
                    <Col span={3}> 
                      <h4 style={{margin:0}}>{personel.name}</h4>
                      <p style={{margin:0, color: '#7f7f7f'}}>{personel.jobTitle} | Exp {personel.yearsExp}yr/s</p>
                    </Col>
                    <Col span={10}> 
                      {/* <h5 style={{margin:0}}> <span style={{color: '#d3d3d3', paddingRight:10}}>{`Ongoing Task:    `}</span> {personel.ongoingTaskTitle}</h5>
                      <Progress percent={personel.taskPercentage} status="active" /> */}
                      
                    </Col>
                    <Col span={1}></Col>
                    <Col span={4} style={{paddingLeft:20}}>
                      {/* <Rate allowHalf defaultValue={personel.overallTaskRating}/>
                      <p style={{margin:0, color: '#d3d3d3'}}>{personel.performanceNote}</p> */}
                    </Col>
                    <Col span={2}></Col>
                    <Col span={1}>
                      <Row justify='space-around'>

                        {/* <Button shape="circle" size='large' icon={ <EditOutlined style={{fontSize:25, color: '#7f7f7f'}}/>} /> */}
                        <Button shape="circle" size='large' icon={ <UserDeleteOutlined  style={{fontSize:25, color: '#7f7f7f'}}/>} onClick={()=>onClickShowPersonelModal(personel)} name='key'/>

                      </Row>

                      {/* <p style={{margin:0, color: '#d3d3d3'}}>edit delete</p> */}
                    </Col>
                  </Row>
                </Card>
              ))}
              {/* <Button type="primary" shape="circle" icon={<UserAddOutlined style={{ fontSize: 35 }}/>} style={{position:'absolute', bottom:20, right: 20, width:60, height:60}} onClick={onClickCreateCandidate}/>
                 */}
            </Content>
          </Layout>
      </Layout>

      <Modal
        title="Remove User"
        visible={showPersonelModal}
        onCancel={onClickHidePersonelModal}
        footer={[
          <Button key="back" type="text"  onClick={onClickHidePersonelModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={()=>onClickRemoveUser(selectedPerson)}>
            Remove
          </Button>,
        ]}>
        
           <Row>
             <Col span={4}>
              {selectedPerson ? <Avatar src={selectedPerson.picture} size={64}/> : <Avatar icon={<UserOutlined/>} size={64}/>}
             </Col>
             <Col  span={20} style={{paddingTop:15}}>
               {selectedPerson ? <> <span style={{marginRight:5}}>Are you sure you want to remove</span> <span style={{color:'red'}}> {selectedPerson.name} </span> <span style={{marginLeft:5}}> to the team? </span> </> : ''}
             </Col>
           </Row>
           <Row style={{paddingTop:10}}>
             <span style={{color: '#7f7f7f'}}>Please input some notes/reason:</span>
           </Row>
           <Row>
              <TextArea rows={4}/>
           </Row>

      </Modal>
      </>
      );
}

export default PersonelList;