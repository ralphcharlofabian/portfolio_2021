import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase'

import { Layout, Card, Row, Col, Avatar, Rate, Progress, Button, Modal, Input, notification } from 'antd';
import {
  UserOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserDeleteOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';
import {updatePersonelList, updateCandidateList} from '../../appRedux/actions'

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
              {collapsed ? <DoubleRightOutlined style={{fontSize:25}} onClick={toggle}/> :  <DoubleLeftOutlined style={{fontSize:25}} onClick={toggle}/>}
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
              {personelList.map( personel => (
                <Card size="small" hoverable style={{marginBottom:3}}>
                  <Row justify='space-between'>
                    <Col span={2}> 
                      <Avatar src={personel.picture} size={64}/>
                    </Col>
                    <Col span={4}> 
                      <h4 style={{margin:0}}>{personel.name}</h4>
                      <p style={{margin:0, color: '#7f7f7f'}}>{personel.jobTitle}</p>
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