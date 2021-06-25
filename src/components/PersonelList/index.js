import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase'
import moment from 'moment';
import { Layout, Card, Row, Col, Avatar, Rate, Progress, Button, Modal, Input, notification, Divider, Drawer, Tooltip as AntDTooltip, Upload, Dropdown, Menu, DatePicker, InputNumber, Result } from 'antd';
import {
  UserOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserDeleteOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';
import {updatePersonelList, updateCandidateList} from '../../appRedux/actions'
import personal1 from '../../assets/personal1.jpg'
import uuid from 'uuid/v4'
import {jobTitleList} from '../../common/constants/miscellaneous'

// function
import initMap from '../../common/functions/map';


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
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState();
    const [counter, setCounter] = useState(0);
    const [tempCandidateInfo, setTempCandidateInfo] = useState(
      {
      id: uuid(),
      name:'',
      jobTitle:'',
      picture:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      ongoingTaskTitle:'',
      taskPercentage:0,
      overallTaskRating:0,
      performanceNote:'',
      yearsExp:0,
      location:'',
      contactNumber:'',
      maplocation:'',
      eMail:'',
      birthDate:moment(),
      pitch:'',
      specificSkills:'',
      qaRating:0,
      feRating:0,
      beRating:0,
      designRating:0,
      prodMgtRating:0,
    },)
    const [isEditMode, setEditMode] = useState(false);
    const [fileList, setFileList] = useState([{
    
      uid: '-1',
      name: 'image.png',
      status: 'done',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]);
    const [previewVisible, setPreviewVisible] = useState(false);

    const [attendanceStatus, setAttendanceStatus] = useState();
    const [showAttendanceConfirmation, setAttendanceConfirmationModal] = useState(false);
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

    useEffect(()=>{
      if (counter !== 2) {
        initMap();
        setCounter(counter+1);
      }
    },[selectedInfo]);
    
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
      setShowInfoModal(false)
      setShowDrawer(false);
      openNotificationWithIcon('success');
    }
    

    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Sucessfully removed from the list',
        description:
          'You can see the removed candidate at the Hire category.',
      });
    };

    const onClickHideCandidateModal = () => {
      setShowInfoModal(false)
      setTempCandidateInfo({
        id: uuid(),
        name:'',
        jobTitle:'',
        picture:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        ongoingTaskTitle:'',
        taskPercentage:0,
        overallTaskRating:0,
        performanceNote:'',
        yearsExp:0,
        location:'',
        contactNumber:'',
        maplocation:'',
        eMail:'',
        birthDate:moment(),
        pitch:'',
        specificSkills:'',
        qaRating:0,
        feRating:0,
        beRating:0,
        designRating:0,
        prodMgtRating:0,
      })
      setFileList([{
      
        uid: '-1',
        name: 'image.png',
        status: 'done',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]);
    }

    const hideUserInfo = () => {
      setSelectedInfo();
      setShowDrawer(false);
    }

    const showUserInfo = (candidate) => {
      setSelectedInfo(candidate)
   
      setShowDrawer(true);
    }

    const onchangeItems = (e) => {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        [e.target.name]: e.target.value
      })
    }
  
    const onchangeExpYr = (value) => {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        yearsExp: value
      })
    }
  
    const onchangeQaRating = (value)=> {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        qaRating: value,
      })
    }
    const onchangeFeRating = (value)=> {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        feRating: value,
      })
    }
    const onchangeBeRating = (value)=> {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        beRating: value,
      })
    }
  
    const onchangeDesignRating = (value)=> {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        designRating: value,
      })
    }
  
    const onchangeProdMgtRating = (value)=> {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        prodMgtRating: value,
      })
    }
  
    const onChangeDate = (date, dateString) => {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        birthDate:date,
  
      })
    }

    const onCLickEdit = (selectedApplicant) => {
      setTempCandidateInfo(selectedApplicant);
      setFileList([{
      
        uid: '-1',
        name: 'image.png',
        status: 'done',
        thumbUrl: selectedApplicant.picture,
      }]);
      setSelectedInfo();
      setShowInfoModal(true);
      setShowDrawer(false);
      setEditMode(true);
  
    }


    const onClickSaveCandidate = () => {

        let index = personelList.findIndex(x => x.id === tempCandidateInfo.id);
        personelList.splice(index, 1 , tempCandidateInfo)
        onClickHideCandidateModal();

      personelEditSuccess('success');
      setEditMode(false);
    }
  
    const personelEditSuccess = type => {
      notification[type]({
        message: 'Personel Sucessfully Updated'
      });
    };

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
  
      setTempCandidateInfo({
        ...tempCandidateInfo,
        picture: fileList[0] ? fileList[0].thumbUrl : newFileList[0].thumbUrl,
      })
  
      console.log(tempCandidateInfo,'tempCandidateInfo xxxx')
    };

    const onPreview = async file => {
      setPreviewVisible(true);
      console.log(fileList[0].thumbUrl, 'image')
    };

    const menu = (
   
      <Menu>
         {jobTitleList ? jobTitleList.map(job => 
         <Menu.Item>
         <Row onClick={()=>selectJob(job)} style={{width:220}}>
            <h4 style={{margin:0}}>{job}</h4>
         </Row>
         
         
       </Menu.Item>
        ) : ''}
      </Menu>
    );
  
    const selectJob = (job) => {
      setTempCandidateInfo({
        ...tempCandidateInfo,
        jobTitle: job,
      })
    }

  const onClickToggleAttendance = (selectedPersonelInfo, attendance) => {
    setAttendanceConfirmationModal(true)
    selectedPersonelInfo.attendanceStatus = attendance;
  }

  const onClickUpdateAttendance = () => {
  personelEditSuccess('success');
  setAttendanceConfirmationModal(false)
}

const AttendanceConfirmationModal = () => {
  setAttendanceConfirmationModal(false)
}

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
                      <AntDTooltip placement="top" title={`${personel.pitch}`}> 
                        <Avatar src={personel.picture} size={50}/>
                      </AntDTooltip>
                    </Col>
                    <Col span={3}> 
                      <h4 style={{margin:0}}>{personel.name}</h4>
                      <p style={{margin:0, color: '#7f7f7f'}}>{personel.jobTitle} | Exp {personel.yearsExp}yr/s</p>
                    </Col>
                    <Col span={4}> 
                      <AntDTooltip placement="top" title={`Satisfaction: ${personel.happinessRating}/ 5`}> 
                        {personel.happinessRating === 1? <FrownOutlined style={{fontSize:45, paddingLeft:5, color: 'red'}}/> : <FrownOutlined style={{fontSize:45, paddingLeft:5, color: '#fafafa'}}/>}
                        {personel.happinessRating === 2? <FrownOutlined style={{fontSize:45, paddingLeft:5, color: 'orange'}}/> : <FrownOutlined style={{fontSize:45, paddingLeft:5, color: '#fafafa'}}/>}
                        {personel.happinessRating === 3? <MehOutlined style={{fontSize:45, paddingLeft:5, color: 'yellow'}}/> : <MehOutlined style={{fontSize:45, paddingLeft:5, color: '#fafafa'}}/>}
                        {personel.happinessRating === 4? <SmileOutlined style={{fontSize:45, paddingLeft:5, color: 'lightblue'}}/> : <SmileOutlined style={{fontSize:45, paddingLeft:5, color: '#fafafa'}}/>}
                        {personel.happinessRating === 5? <SmileOutlined style={{fontSize:45, paddingLeft:5, color: 'yellowgreen'}}/> : <SmileOutlined style={{fontSize:45, paddingLeft:5, color: '#fafafa'}}/>}
                      </AntDTooltip>
                    </Col>
                    <Col span={8} style={{paddingLeft:20}}>
                      {/* <Rate allowHalf defaultValue={personel.overallTaskRating}/>
                      <p style={{margin:0, color: '#d3d3d3'}}>{personel.performanceNote}</p> */}
                      
                        <p style={{margin:0}}>Performance Note:</p>
                        <p style={{margin:0, color: '#7f7f7f'}}>{personel.performanceNote}</p>
                      
                    </Col>
                    <Col span={6} style={{paddingLeft:20}}>
                      {personel.attendanceStatus === 'present' ? 
                        <Button style={{opacity:.70, backgroundColor: 'lightgreen', marginRight:10}}>Present</Button> :
                        <Button style={{opacity:.20, marginRight:10}} onClick={()=>onClickToggleAttendance(personel,'present')}>Present</Button>
                      }
                      {personel.attendanceStatus === 'leave' ? 
                        <Button style={{opacity:.70, backgroundColor: 'lightblue', marginRight:10}}>On Leave</Button> :
                        <Button style={{opacity:.20, marginRight:10}} onClick={()=>onClickToggleAttendance(personel,'leave')}>On Leave</Button>
                      }
                      {personel.attendanceStatus === 'half-day' ? 
                        <Button style={{opacity:.70, backgroundColor: '#feb8d1', marginRight:10}} >Half-Day</Button> :
                        <Button style={{opacity:.20, marginRight:10}} onClick={()=>onClickToggleAttendance(personel,'half-day')}>Half-Day</Button>
                      }
                      
                      
                    </Col>

                    <Col span={2}>
                      <Row justify='end'>
                        <AntDTooltip placement="top" title={'Personel Info'}> 
                          <Button shape="circle" size='large'  onClick={()=>showUserInfo(personel)} icon={<UserOutlined style={{fontSize:25, color: '#147fe2'}}/>} style={{marginRight:20}}/>
                        </AntDTooltip>
                        <AntDTooltip placement="top" title={'Remove to project'}> 
                          <Button shape="circle" size='large' icon={ <UserDeleteOutlined  style={{fontSize:25, color: '#7f7f7f'}}/>} onClick={()=>onClickShowPersonelModal(personel)} name='key'/>
                        </AntDTooltip>

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


      <Drawer
          width={640}
          placement="right"
          closable={true}
          onClose={hideUserInfo}
          visible={showDrawer}
        >
          <Row>
            <Col span={8}>
              {selectedInfo? <Avatar src={selectedInfo.picture} size={150}/> : <Avatar size={150} icon={<UserOutlined />}/>}
              
            </Col>
            <Col span={16}>
            {selectedInfo?
            <>
              <h2 style={{paddingTop:5, paddingBottom:0, marginBottom:0}}>{selectedInfo.name}</h2>
              <h4><span style={{color: '#7f7f7f', paddingRight:5}}>{`Position:  `}</span> {selectedInfo.jobTitle}</h4>
              <h4><span style={{color: '#7f7f7f', paddingRight:5}}>{`Years of Experience:  `}</span>{selectedInfo.yearsExp}</h4>
              <h4><span style={{color: '#7f7f7f', paddingRight:5}}>{`Pitch:  `}</span>{selectedInfo.pitch}</h4>
            </>
               : ''}
            </Col>
          </Row>
          <Divider/>
          <Row>
            <span style={{color: '#7f7f7f'}}>Candidate's rating are based on earlier screening conducted by HR, Technical Exam, as well as Technical Interview. For reference purposes only.</span>
          </Row>
          <Row style={{paddingTop:20}}>
            <Col span={7}>
              <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Quality Assurance`}</h4>
            </Col>
            <Col span={17}>
              {selectedInfo ? <Rate allowHalf value={selectedInfo.qaRating} count={10} disabled/> : <Rate allowHalf value={0} count={10} disabled/>}
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Frontend Development`}</h4>
            </Col>
            <Col span={17}>
              {selectedInfo ? <Rate allowHalf value={selectedInfo.feRating} count={10} disabled/> : <Rate allowHalf value={0} count={10} disabled/>}
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Backend Development`}</h4>
            </Col>
            <Col span={17}>
              {selectedInfo ? <Rate allowHalf value={selectedInfo.beRating} count={10} disabled/> : <Rate allowHalf value={0} count={10} disabled/>}
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`UI/UX Design`}</h4>
            </Col>
            <Col span={17}>
              {selectedInfo ? <Rate allowHalf value={selectedInfo.designRating} count={10} disabled/> : <Rate allowHalf value={0} count={10} disabled/>}
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Product Management`}</h4>
            </Col>
            <Col span={17}>
              {selectedInfo ? <Rate allowHalf value={selectedInfo.prodMgtRating} count={10} disabled/> : <Rate allowHalf value={0} count={10} disabled/>}
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={9}>
              {selectedInfo ? <>
                <Row><span>{selectedInfo.contactNumber}</span></Row>
                <Row style={{paddingBottom:5}}><span>{selectedInfo.eMail}</span></Row>
                <Row><span>{selectedInfo.location}</span></Row>
              </>: ''}
            </Col>
            <Col span={15}>
              <div id="js-map" class="map" tabindex="0" style={{width:'100%', height:300}}></div>
            </Col>
            {/* {initMap()} */}
          </Row>
          <Row style={{paddingTop:30}} justify='space-between'>
            {/* <Button size='large' type="primary" style={{height:50, width:100, borderRadius:5}} onClick={()=>onCLickHire(selectedInfo)}>Hire Me</Button> */}
            <Button size='large' style={{height:50, width:150, borderRadius:5}} type='primary' onClick={()=>onCLickEdit(selectedInfo)}>Edit Personel</Button>
            <Button size='large' style={{height:50, width:160, borderRadius:5}} onClick={()=>onClickShowPersonelModal(selectedInfo)} name='key'>Remove to Project</Button>
                        
          </Row>
        </Drawer>


      <Modal
          title="Candidate Information"
          visible={showInfoModal}
          onCancel={onClickHideCandidateModal}
          closable={true}
          maskClosable={false}
          width={600}
          style={{ top: 30 }}
         footer={[
           <Button key="submit" type="primary" onClick={onClickSaveCandidate}>
             Save
           </Button>,
           <Button key="back" type="text"  onClick={onClickHideCandidateModal}>
             Cancel
           </Button>,
         ]}>
           <Row>
             <Col span={6}>
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
                </ImgCrop>
              </Col>
              <Col span={18}>
                <span style={{color: '#7f7f7f', fontSize:10}}>You Can upload your own image by clicking the image and selecting delete, then upload your own avatar.</span>
              </Col>
            </Row>
            <Row style={{marginTop:5}}> 
             <Input size="large" placeholder="Candidate Name" prefix={<UserOutlined />} value={tempCandidateInfo.name} onChange={onchangeItems} name="name"/>
            </Row>
           <Row style={{marginTop:5}}>
              <Col span={10}>
                <Dropdown overlay={menu}>
                  <Button>{tempCandidateInfo.jobTitle? tempCandidateInfo.jobTitle : 'Select Job'}</Button>
                </Dropdown>
              </Col>
              <Col span={3}>
                <div style={{paddingTop:5}}>
                  Yrs Exp:
                </div>      
              </Col>
              <Col span={3}>
                <InputNumber size='middle' placeholder="Years of Exp." value={tempCandidateInfo.yearsExp} onChange={onchangeExpYr} name="yearsExp" maxLength={2}/>                 
              </Col>
            </Row>
            <Row style={{paddingTop:5}}>
              <Col  span={4}>
                <div style={{paddingTop:5}}>Birth Date:</div>
              </Col>
              <Col span={20}>
                <DatePicker onChange={onChangeDate} value={tempCandidateInfo.birthDate}/>
              </Col>
            </Row>
            <Row style={{marginTop:10}}>
              <TextArea rows={2} placeholder="Pitch" value={tempCandidateInfo.pitch} onChange={onchangeItems} name="pitch"/>
            </Row>
            <Divider orientation="left" plain><span style={{color: '#7f7f7f', fontSize:12, paddingTop:12}}>Contact Info</span></Divider>

            <Row style={{marginTop:0}}> 
              <Input size="middle" placeholder="Address" value={tempCandidateInfo.location} onChange={onchangeItems} name="location"/>
            </Row>
            <Row style={{marginTop:5}} justify='space-between'> 
              <Col span={11}>
                <Input size="middle" placeholder="Contact Number" value={tempCandidateInfo.contactNumber} onChange={onchangeItems} name="contactNumber"/>
              </Col>
              <Col span={11}>
                <Input size="middle" placeholder="Email Address" value={tempCandidateInfo.eMail} onChange={onchangeItems} name="eMail"/>
              </Col>
            </Row>
            <Divider orientation="left" plain><span style={{color: '#7f7f7f', fontSize:12, paddingTop:15}}>Skill Set</span></Divider>
            
            
            <Row>
              <Col span={8}>
                <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Quality Assurance`}</h4>
              </Col>
              <Col span={16}>
                <Rate allowHalf value={tempCandidateInfo.qaRating} count={10} onChange={onchangeQaRating} className="qaRating"/>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Frontend Development`}</h4>
              </Col>
              <Col span={16}>
                <Rate allowHalf value={tempCandidateInfo.feRating} count={10} onChange={onchangeFeRating} className="feRating"/>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Backend Development`}</h4>
              </Col>
              <Col span={16}>
                <Rate allowHalf value={tempCandidateInfo.beRating} count={10} onChange={onchangeBeRating} className="beRating"/>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`UI/UX Design`}</h4>
              </Col>
              <Col span={16}>
                <Rate allowHalf value={tempCandidateInfo.designRating} count={10} onChange={onchangeDesignRating} className="designRating"/>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <h4 style={{color: '#7f7f7f', paddingTop:7}}>{`Product Management`}</h4>
              </Col>
              <Col span={16}>
                <Rate allowHalf value={tempCandidateInfo.prodMgtRating} count={10} onChange={onchangeProdMgtRating} className="prodMgtRating"/>
              </Col>
            </Row>


            <Row style={{marginTop:10}}>
             <TextArea rows={2} placeholder="Note" value={tempCandidateInfo.performanceNote} onChange={onchangeItems} name="performanceNote"/>
            </Row>

        </Modal>
        <Modal
          title="Attendance Status"
          visible={showAttendanceConfirmation}
          onCancel={AttendanceConfirmationModal}
          closable={true}
          maskClosable={false}
          width={600}
          style={{ top: 30 }}
          footer={[
            <Button key="submit" type="primary" onClick={onClickUpdateAttendance}>
              Done
            </Button>,
          ]}
         >
           <Result
            status="success"
            title="Attendance Successfully Updated"
            subTitle="Please do check the personels update regarding their attendance and inform HR for some queries if something happen."
          />
        </Modal>
      </>
      );
}

export default PersonelList;