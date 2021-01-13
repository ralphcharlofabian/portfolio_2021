import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { Layout, Card, Row, Avatar, Drawer, Col, Divider, Rate, Button, Tooltip, Modal, Upload, Input, Dropdown, Menu, DatePicker, InputNumber, notification, Popover } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  UserOutlined,
  UserAddOutlined,
  PictureOutlined,
  UserDeleteOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';
import {updateCandidateList, updatePersonelList} from '../../appRedux/actions'
import {jobTitleList} from '../../common/constants/miscellaneous'
import uuid from 'uuid/v4'
import personal1 from '../../assets/personal1.jpg'

// function
import initMap from '../../common/functions/map';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

const HireCandidate = () => {

  const userListReducer = useSelector(state => state.userListReducer); 
  const dispatch = useDispatch();

  const {availableCandidate, userList} = userListReducer;
  const [personelList, setPersonelList] = useState(userList? userList : []);
  const [candidateList, setCandidateList] = useState(availableCandidate? availableCandidate : []);
  const [collapsed, setCollapsed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState();
  const [counter, setCounter] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [showPersonelModal, setShowPersonelModal] = useState(false);
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

  useEffect(()=>{
    if (counter !== 2) {
      initMap();
      setCounter(counter+1);
    }
  },[selectedInfo]);

  useEffect(() => {
    console.log(personelList,'personelList updated use effect');
    dispatch(updatePersonelList(personelList));
  }, [candidateList]);

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const showUserInfo = (candidate) => {
    setSelectedInfo(candidate)

    // if (counter !== 2) {
    //   initMap();
    //   setCounter(counter+1);
    // }

    setShowDrawer(true);
  }
  const hideUserInfo = () => {
    setSelectedInfo();
    setShowDrawer(false);
  }

  const onCLickHire = (selectedApplicant) => {
    console.log(personelList,'personelList');

    personelList.push(selectedApplicant)
    dispatch(updatePersonelList(personelList));

    setCandidateList(candidateList.filter(candidate => candidate.name !== selectedApplicant.name));
    let updatedCandidateList = candidateList.filter(candidate => candidate.name !== selectedApplicant.name)
    dispatch(updateCandidateList(updatedCandidateList));

    setSelectedInfo();
    setShowDrawer(false);
    candidateHIred('success')
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

  const onClickCreateCandidate = () => {
    setShowInfoModal(true)
  }

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

  const [fileList, setFileList] = useState([{
    
    uid: '-1',
    name: 'image.png',
    status: 'done',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    setTempCandidateInfo({
      ...tempCandidateInfo,
      picture: fileList[0] ? fileList[0].thumbUrl : newFileList[0].thumbUrl,
    })

    console.log(tempCandidateInfo,'tempCandidateInfo xxxx')
  };

  const onPreview = async file => {
    // let src = file.url;
    // if (!src) {
    //   src = await new Promise(resolve => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file.originFileObj);
    //     reader.onload = () => resolve(reader.result);
    //   });
    // }
    // const image = new Image();
    // image.src = src;
    // const imgWindow = window.open(src);
    // imgWindow.document.write(image.outerHTML);
    setPreviewVisible(true);
    console.log(fileList[0].thumbUrl, 'image')
  };
  
  const onCancelPreview = () => {
    setPreviewVisible(false);
  }
  const selectJob = (job) => {
    setTempCandidateInfo({
      ...tempCandidateInfo,
      jobTitle: job,
    })
  }

  const onClickSaveCandidate = () => {

    if (!isEditMode) {
      candidateList.push(tempCandidateInfo);
      onClickHideCandidateModal();

    } else {
      let index = candidateList.findIndex(x => x.id === tempCandidateInfo.id);
      candidateList.splice(index, 1 , tempCandidateInfo)
      onClickHideCandidateModal();
      
    }
    openNotificationWithIcon('success');
    setEditMode(false);
  }

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Candidate List Sucessfully Updated'
    });
  };

  const candidateHIred = type => {
    notification[type]({
      message: 'Candidate Successfully Hired'
    });
  };

  const onClickDeleteCandidate = (selectedCandidate) => {
    setShowPersonelModal(true);
    setSelectedInfo(selectedCandidate);

  }

  const onClickHidePersonelModal = () => {
    setShowPersonelModal(false);
    setSelectedInfo();
  }

  const onClickRemoveUser = (selectedInfo) => {
    
    let index = candidateList.findIndex(x => x.id === selectedInfo.id);
    candidateList.splice(index, 1)
    openNotificationWithIcon('success');
    setShowPersonelModal(false);
    setSelectedInfo();
  }


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

    return (
      <Layout>
        <Sidebar collapsed={collapsed}/>
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ height: 55, paddingLeft:10 }}>
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
            <Row >
            { candidateList? candidateList.map(candidate=>

              <Card style={{ width: window.screen.width/8, margin:10,  }} hoverable  size='small'>
                <UserDeleteOutlined style={{position:'absolute', top:5, right: 0, width:30, height:30}} onClick={()=>onClickDeleteCandidate(candidate)}/>
                <div onClick={()=>showUserInfo(candidate)}>
                  <div style={{textAlign:'center'}}>
                    <Popover content={(<p>{candidate.pitch}</p>)} placement="topRight">
                      <Avatar src={candidate.picture} size={150}/>
                    </Popover>
                    <h4 style={{paddingTop:10}}>{candidate.name}</h4>
                  </div>
                  <Row justify='space-between'>
                    <span>{candidate.jobTitle}</span>
                    <span>{`${candidate.yearsExp} yrs`}</span>
                  </Row>
                </div>
                
              </Card>
              
              ) : ''}
            </Row>
            <Tooltip placement="top" title={'Create Candidate'}> 
              <Button type="primary" shape="circle" icon={<UserAddOutlined style={{ fontSize: 35 }}/>} style={{position:'absolute', bottom:20, right: 20, width:60, height:60}} onClick={onClickCreateCandidate}/>
            </Tooltip>
             
          </Content>
        </Layout>
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
            <Button size='large' type="primary" style={{height:50, width:100, borderRadius:5}} onClick={()=>onCLickHire(selectedInfo)}>Hire Me</Button>
            <Button size='large' style={{height:50, width:150, borderRadius:5}} onClick={()=>onCLickEdit(selectedInfo)}>Edit Candidate</Button>
            
          </Row>
        </Drawer>
        <Modal
          title="Create Candidate"
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
          visible={previewVisible}
          title={'Preview Image'}
          footer={null}
          onCancel={onCancelPreview}
        >
          {fileList.length > 0 ? <img alt="example" style={{ width: '100%' }} src={fileList[0].thumbUrl} /> : ''}
          
        </Modal>

        <Modal
        title="Remove Candidate"
        visible={showPersonelModal}
        onCancel={onClickHidePersonelModal}
        footer={[
          <Button key="back" type="text"  onClick={onClickHidePersonelModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={()=>onClickRemoveUser(selectedInfo)}>
            Remove
          </Button>,
        ]}>
        
           <Row>
             <Col span={4}>
              {selectedInfo ? <Avatar src={selectedInfo.picture} size={64}/> : <Avatar icon={<UserOutlined/>} size={64}/>}
             </Col>
             <Col  span={20} style={{paddingTop:15}}>
               {selectedInfo ? <> <span style={{marginRight:5}}>Are you sure you want to remove</span> <span style={{color:'red'}}> {selectedInfo.name} </span> <span style={{marginLeft:5}}> to the team? </span> </> : ''}
             </Col>
           </Row>
           <Row style={{paddingTop:10}}>
             <span style={{color: '#7f7f7f'}}>Please input some notes/reason:</span>
           </Row>
           <Row>
              <TextArea rows={4}/>
           </Row>

      </Modal>
      </Layout>
      );
}

export default HireCandidate;