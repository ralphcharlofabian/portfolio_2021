import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import moment from 'moment';
import uuid from 'uuid/v4'
import { 
  Layout, 
  Row, Col,
  Avatar,
  Progress,
  Button,
  Modal,
  Input,
  Tooltip,
  Divider,
  Drawer,
  Dropdown,
  Menu, 
  DatePicker,
  Space,
  notification,
  Slider,
  InputNumber, } from 'antd';
import {
  UserOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserDeleteOutlined,
  DeleteOutlined,
  EditOutlined,
  RestOutlined,
  FireOutlined,
  EyeOutlined,
  FileAddOutlined,
} from '@ant-design/icons';


//constants
import Sidebar from '../../common/components/Sidebar';
import {updateTaskList} from '../../appRedux/actions'
import AddEditTaskModal from './AddEditTaskModal';


//functions
import {performanceRate} from '../../common/functions/miscellaneous';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


const TaskList = () => {

  const taskListReducer = useSelector(state => state.taskListReducer); 
  const userListReducer = useSelector(state => state.userListReducer); 

  const dispatch = useDispatch();

  const {userList, availableCandidate} = userListReducer;
  const {columnsFromBackend} = taskListReducer;
  console.log(columnsFromBackend,'columnsFromBackend')

  const [collapsed, setCollapsed] = useState(false);
  const [personelList, setUserList] = useState(userList? userList : []);
  const [selectedPersonel, setSelectedPersonel] = useState()
  const [columns, setColumns] = useState(columnsFromBackend ? columnsFromBackend : []);
  const [showInfoDrawer, setShowInfoDrawer] = useState(false);
  const [selectedTaskInfo, setSelectedTaskInfo] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedPriority, setPriority] =  useState();
  const [selectedDificulty, setDificulty] =  useState();
  const [isEditMode, setEditMode] = useState(false);
  const [taskPercentage, setTaskPercentage] = useState(0);
  const [tempEditTaskInfo, setTempEditTaskInfo] = useState(
    {
    id: uuid(),
    name:'',
    jobTitle:'',
    picture:'',
    ongoingTaskTitle:'',
    completionDate: moment(),
    dateStarted: moment().subtract(1,'d'),
    dateCreated: moment().subtract(15,'d'),
    taskPercentage: 0,
    priorityLevel: '',
    dificultyLevel: '',
    taskNote: ``,
    done:false,
    performanceRate:-1
  });

  const selectPersonel = (personel) => {
    console.log(tempEditTaskInfo,'tempEditTaskInfo');
    setTempEditTaskInfo({
      ...tempEditTaskInfo,
      picture:personel.picture,
      name:personel.name,
      jobTitle:personel.jobTitle,

    })
    //setSelectedPersonel(personel)
  }

  const onClicksetPriority = (level) => {
    console.log(tempEditTaskInfo,'tempEditTaskInfo');
      setTempEditTaskInfo({
        ...tempEditTaskInfo,
        priorityLevel:level,
        performanceRate: performanceRate(tempEditTaskInfo.dificultyLevel, level, tempEditTaskInfo.done  )
      })
      console.log(tempEditTaskInfo,'tempEditTaskInfo uyyyy');

  }

  const onClicksetDificulty = (level) => {
      setTempEditTaskInfo({
        ...tempEditTaskInfo,
        dificultyLevel:level,
        performanceRate: performanceRate(level,tempEditTaskInfo.priorityLevel, tempEditTaskInfo.done  )
      })

      console.log(tempEditTaskInfo,'tempEditTaskInfo xxxx');
  }

  const onChangeTitle = (e) => {
      setTempEditTaskInfo({
        ...tempEditTaskInfo,
        ongoingTaskTitle:e.target.value,
      })
  }

  const onChangeNote = (e) => {
      setTempEditTaskInfo({
        ...tempEditTaskInfo,
        taskNote:e.target.value,
  
      })

  }

  const onChangeTaskPercentage = (value) => {
    console.log(value,'value')
    setTempEditTaskInfo({
      ...tempEditTaskInfo,
      taskPercentage:value,

    })
  }


  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setTempEditTaskInfo({
      ...tempEditTaskInfo,
      completionDate:date,

    })
  }

  const onClickShowInfoDrawer = (task) => {
      setSelectedTaskInfo(task)
      setShowInfoDrawer(true);
    }
  const handleCancelInfoDrawer = () => {
      setShowInfoDrawer(false);
      setSelectedTaskInfo()
  }

  const onClickShowInfoModal = (task) => {
    //setSelectedTaskInfo(item)
    setShowInfoDrawer(false);
    setTempEditTaskInfo(task);
    setEditMode(true);
    setShowInfoModal(true);
  }

  const onClickCreateTask = () => {
    setShowInfoModal(true);
    setTempEditTaskInfo({
      id: uuid(),
      name:'',
      jobTitle:'',
      picture:'',
      ongoingTaskTitle:'',
      completionDate: moment(),
      dateStarted: moment().subtract(1,'d'),
      dateCreated: moment().subtract(15,'d'),
      taskPercentage: 0,
      priorityLevel: '',
      dificultyLevel: '',
      taskNote: ``,
      done:false,
      performanceRate:-1
    });
  }
  const handleCancelInfoModal = () => {
      setShowInfoModal(false);
      
      setPriority()
      setDificulty()
      setSelectedPersonel()
      setTempEditTaskInfo({
        id: uuid(),
        name:'',
        jobTitle:'',
        picture:'',
        ongoingTaskTitle:'',
        completionDate: moment(),
        dateStarted: moment().subtract(1,'d'),
        dateCreated: moment().subtract(15,'d'),
        taskPercentage: 0,
        priorityLevel: '',
        dificultyLevel: '',
        taskNote: ``,
        done:false,
        performanceRate:-1
      })
      //setSelectedTaskInfo()
  }

  const onSaveTask = () => {
    
    if (!isEditMode) {
      const destColumn = columns['backlogId'];
      const destItems = [...destColumn.items];
      destItems.push(tempEditTaskInfo)
      setColumns({
        ...columns,
        ['backlogId'] : {
          ...destColumn,
          items: destItems
        }
      })


      setTempEditTaskInfo({
        id: uuid(),
        name:'',
        jobTitle:'',
        picture:'',
        ongoingTaskTitle:'',
        completionDate: moment(),
        dateStarted: moment().subtract(1,'d'),
        dateCreated: moment().subtract(15,'d'),
        taskPercentage: 0,
        priorityLevel: '',
        dificultyLevel: '',
        taskNote: ``,
        done:false,
        performanceRate:-1
      })

      setShowInfoModal(false);
    } else {
      console.log(tempEditTaskInfo,'tempEditTaskInfoa edit')

      let isInBacklogId = columns['backlogId'].items.some(x => x.id === tempEditTaskInfo.id)
      let isInProgressId = columns['inProgressId'].items.some(x => x.id === tempEditTaskInfo.id)
      let isInRevisionId = columns['revisionId'].items.some(x => x.id === tempEditTaskInfo.id)
      let isInDoneId = columns['doneId'].items.some(x => x.id === tempEditTaskInfo.id)


      if (isInBacklogId) {
        const destColumn = columns['backlogId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === tempEditTaskInfo.id);
        destItems.splice(index, 1 , tempEditTaskInfo)
        setColumns({
          ...columns,
          ['backlogId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } else if (isInProgressId) {
        const destColumn = columns['inProgressId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === tempEditTaskInfo.id);
        destItems.splice(index, 1 , tempEditTaskInfo)
        setColumns({
          ...columns,
          ['inProgressId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } else if (isInRevisionId) {
        const destColumn = columns['revisionId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === tempEditTaskInfo.id);
        destItems.splice(index, 1 , tempEditTaskInfo)
        setColumns({
          ...columns,
          ['revisionId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } else if (isInDoneId) {
        const destColumn = columns['doneId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === tempEditTaskInfo.id);
        destItems.splice(index, 1 , tempEditTaskInfo)
        setColumns({
          ...columns,
          ['doneId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } 
 
      setTempEditTaskInfo({
        id: uuid(),
        name:'',
        jobTitle:'',
        picture:'',
        ongoingTaskTitle:'',
        completionDate: moment(),
        dateStarted: moment().subtract(1,'d'),
        dateCreated: moment().subtract(15,'d'),
        taskPercentage: 0,
        priorityLevel: '',
        dificultyLevel: '',
        taskNote: ``,
        done:false,
        performanceRate:-1
      })

      setShowInfoModal(false);
      setEditMode(false);
    }
    openNotificationWithIcon('success');
    }

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Task Board Sucessfully Updated'
    });
  };

  const onDeleteTask = () => {


      let isInBacklogId = columns['backlogId'].items.some(x => x.id === selectedTaskInfo.id)
      let isInProgressId = columns['inProgressId'].items.some(x => x.id === selectedTaskInfo.id)
      let isInRevisionId = columns['revisionId'].items.some(x => x.id === selectedTaskInfo.id)
      let isInDoneId = columns['doneId'].items.some(x => x.id === selectedTaskInfo.id)
      console.log('ererasdasd')

      if (isInBacklogId) {
        const destColumn = columns['backlogId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === selectedTaskInfo.id);
        console.log(index,'delete')
        destItems.splice(index, 1)
        setColumns({
          ...columns,
          ['backlogId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } else if (isInProgressId) {
        const destColumn = columns['inProgressId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === selectedTaskInfo.id);
        destItems.splice(index, 1)
        setColumns({
          ...columns,
          ['inProgressId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } else if (isInRevisionId) {
        const destColumn = columns['revisionId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === selectedTaskInfo.id);
        destItems.splice(index, 1)
        setColumns({
          ...columns,
          ['revisionId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } else if (isInDoneId) {
        const destColumn = columns['doneId'];
        const destItems = [...destColumn.items];
        let index = destItems.findIndex(x => x.id === selectedTaskInfo.id);
        destItems.splice(index, 1)
        setColumns({
          ...columns,
          ['doneId'] : {
            ...destColumn,
            items: destItems
          }
        })
      } 
 
      setTempEditTaskInfo({
        id: uuid(),
        name:'',
        jobTitle:'',
        picture:'',
        ongoingTaskTitle:'',
        completionDate: moment(),
        dateStarted: moment().subtract(1,'d'),
        dateCreated: moment().subtract(15,'d'),
        taskPercentage: 0,
        priorityLevel: '',
        dificultyLevel: '',
        taskNote: ``,
        done:false,
        performanceRate:-1
      })

      setShowInfoDrawer(false);
      setShowInfoModal(false);
      setEditMode(false);
    
    openNotificationWithIcon('success');
  }



  useEffect(() => {
    dispatch(updateTaskList(columns));
  }, [columns]);
  
  const toggle = () => {
      setCollapsed(!collapsed)
  }


  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if(source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId] : {
          ...destColumn,
          items: destItems
        }
      })

      console.log(sourceItems,'sourceItems')
      console.log(destItems,'destItems')
     

    } else {

      const column = columns[source.droppableId];
      const coppiedItems = [...column.items];
      const [removed] = coppiedItems.splice(source.index, 1);
      coppiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId] : {
          ...column,
          items: coppiedItems
        }
      })
    }
  }



  const menu = (
   
    <Menu>
       {personelList ? personelList.map(personel=> 
       <Menu.Item>
       <Row onClick={()=>selectPersonel(personel)} style={{width:220}}>
         <Col span={6}><Avatar src={personel.picture} size={35}></Avatar></Col>
         <Col span={18}> 
           <h4 style={{margin:0}}>{personel.name}</h4>
           <p style={{margin:0, color: '#7f7f7f'}}>{personel.jobTitle}</p>
          </Col>
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
             <div style={{display:'flex', justifyContent:'center', height:'100%'}}>
                <DragDropContext onDragEnd={result=> onDragEnd(result, columns, setColumns)}>
                  {Object.entries(columns).map(([id, column]) => {
                    return(
                      <div style={{display:'flex', flexDirection:'column',alignItems: 'center'}}>
                        <h2 style={{marginBottom:0}}>{column.name}</h2>
                        <div style={{margin: 8}}>
                          <Droppable droppableId={id} key={id} >
                            {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  backgroundColor: snapshot.isDraggingOver ? '#fafafa' : '#def3fd',
                                  padding:4,
                                  width:window.innerWidth / 5,
                                  minHeight:window.innerHeight - 150,
                                }}
                              >
                                
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                      {(provided, snapshot)=> {
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect:'none',
                                              padding:5,
                                              margin:'0 0 10px 0',
                                              minHeight:50,
                                              backgroundColor: snapshot.isDragging ? '#89cff0' : 'white',
                                              //color: '',
                                            ...provided.draggableProps.style,
                                            }}
                                            onClick={()=>onClickShowInfoDrawer(item)}
                                          > 
                                            {item.ongoingTaskTitle}
                                            <Row>
                                              <Col span={4}>
                                                <Avatar src={item.picture} size={40}/>
                                              </Col>
                                              <Col span={14} style={{padding:0}}>

                                                <Tooltip placement="topLeft">
                                                  <Progress percent={item.taskPercentage} size="small" status="active" showInfo={false}/>
                                                </Tooltip>
                                                <p style={{fontSize:12, color:'#7f7f7f'}}>{`Completion date: ${moment(item.completionDate).format('MMM/DD/YYYY')}`}</p>
                                            
                                              </Col>
                                              <Col span={6} style={{paddingLeft:5}}>
                                                <Tooltip placement="top" title={item.dificultyLevel} >
                                                  {item ? (item.dificultyLevel === 'easy' ? <RestOutlined style={{ fontSize: 35, color: '#036636' }}/> : '') : ''}
                                                  {item ? (item.dificultyLevel === 'medium' ? <RestOutlined style={{ fontSize: 35, color: '#2c538f' }}/> : '') : ''}
                                                  {item ? (item.dificultyLevel === 'hard' ? <RestOutlined style={{ fontSize: 35, color: '#c456ec' }}/> : '') : ''}
                                                </Tooltip>
                                                <Tooltip placement="top" title={item.priorityLevel} >
                                                  
                                                  {item ? (item.priorityLevel === 'urgent' ? <FireOutlined style={{ fontSize: 35, color: '#ff6961' }}/> : '') : ''}
                                                  {item ? (item.priorityLevel === 'normal' ? <FireOutlined style={{ fontSize: 35, color: '#ff975a' }}/> : '') : ''}
                                                  {item ? (item.priorityLevel === 'least' ? <FireOutlined style={{ fontSize: 35, color: '#ffdf9e' }}/> : '') : ''}
                                                </Tooltip>
                                              </Col>
                                            </Row>
                                          </div>
                                        )
                                      }}
                                    </Draggable>
                                  )
                                })}
                                {provided.placeholder}
                              </div>
                              )
                            }}
                          </Droppable>
                        </div>
                      </div>
                    )
                  })}
                  <Tooltip placement="top" title={'Create Task'}> 
                    <Button type="primary" shape="circle" icon={<FileAddOutlined style={{ fontSize: 35 }}/>} style={{position:'absolute', bottom:20, right: 20, width:60, height:60}} onClick={onClickCreateTask}/>
                  </Tooltip>
                </DragDropContext>
             </div>
             
          </Content>
         
        </Layout>
        <Drawer
          title="Task Information"
          visible={showInfoDrawer}
          width={640}
          onClose={handleCancelInfoDrawer}
          footer={null}
          placement="right"
          closable={true}>
              <Row>
                 <Col span={4}>
                  {selectedTaskInfo ? <Avatar src={selectedTaskInfo.picture} size={65}/> : <Avatar icon={<UserOutlined />} size={65}/>}
                  
                 </Col>
                 <Col span={20}>
                  <h4>{`Task title:  ${selectedTaskInfo ? selectedTaskInfo.ongoingTaskTitle : ''}`}</h4>
                    <h5 style={{marginBottom:0}}>{`Person In Charge:  ${selectedTaskInfo ? selectedTaskInfo.name : ''}`}</h5>
                    <h5> {`Job Title:  ${selectedTaskInfo ? selectedTaskInfo.jobTitle : ''}`}</h5>
                 </Col>
              </Row>
              
              <Row style={{marginTop:10}}>
                {selectedTaskInfo ? <Progress percent={selectedTaskInfo.taskPercentage} size="small" status="active"/> : <Progress percent={0} size="small" status="active"/>  }
                <h5>{`Completion Date:   ${selectedTaskInfo ? moment(selectedTaskInfo.completionDate).format('MMM/DD/YYYY') : 'Completion Date: None'}`}</h5>
              </Row>
              <Row style={{marginTop:15}}>
                <Col span={7} style={{textAlign:'center'}}>
                  <Progress percent={50} size="small" status="active" type="circle" strokeColor="#52c41a"/>
                </Col>
                <Col span={7} style={{textAlign:'center'}}>
                  <Progress percent={30} size="small" status="active" type="circle" strokeColor="#52c41a"/>
                </Col>
                <Col span={10} style={{paddingLeft:10}}>
                  
                  {selectedTaskInfo ? (selectedTaskInfo.priorityLevel === 'urgent' ? <div style={{paddingBottom:5}}>Priority Level: <FireOutlined style={{ fontSize: 30, color: '#ff6961' }}/> <span style={{color:'#ff6961'}}> Urgent</span></div> : '') : ''}
                  {selectedTaskInfo ? (selectedTaskInfo.priorityLevel === 'normal' ? <div style={{paddingBottom:5}}>Priority Level: <FireOutlined style={{ fontSize: 30, color: '#ff975a' }}/> <span style={{color:'#ff975a'}}> Normal</span></div> : '') : ''}
                  {selectedTaskInfo ? (selectedTaskInfo.priorityLevel === 'least' ? <div style={{paddingBottom:5}}>Priority Level: <FireOutlined style={{ fontSize: 30, color: '#ffdf9e' }}/> <span style={{color:'#ffdf9e'}}> Least</span></div> : '') : ''}

                  {selectedTaskInfo ? (selectedTaskInfo.dificultyLevel === 'easy' ? <div style={{paddingBottom:10}}>Dificulty Level: <RestOutlined style={{ fontSize: 30, color: '#036636' }}/> <span style={{color:'#036636'}}> easy</span></div> : '') : ''}
                  {selectedTaskInfo ? (selectedTaskInfo.dificultyLevel === 'medium' ? <div style={{paddingBottom:5}}>Dificulty Level: <RestOutlined style={{ fontSize: 30, color: '#2c538f' }}/> <span style={{color:'#2c538f'}}> Medium</span></div> : '') : ''}
                  {selectedTaskInfo ? (selectedTaskInfo.dificultyLevel === 'hard' ? <div style={{paddingBottom:5}}>Dificulty Level: <RestOutlined style={{ fontSize: 30, color: '#c456ec' }}/> <span style={{color:'#c456ec'}}> Hard</span></div> : '') : ''}

                  
                  <div>{`Date Created:   ${selectedTaskInfo ? moment(selectedTaskInfo.dateCreated).format('MMM/DD/YYYY') : 'Date Created: None'}`}</div>
                  <div>{`Date Started:   ${selectedTaskInfo ? moment(selectedTaskInfo.dateStarted).format('MMM/DD/YYYY') : 'Date Started: None'}`}</div>
                </Col>
              </Row>
              <Row style={{marginTop:5}} justify='space-between'>
                <Col span={7} style={{textAlign:'center'}}>
                  <h5>Estimated Progress</h5>
                </Col>
                <Col span={7} style={{textAlign:'center'}}>
                  <h5>Actual Runtime</h5>
                </Col>
                <Col span={10}>
                </Col>
              </Row>
              <Divider style={{marginTop:5}}/>
              <p style={{margin:0}}>Task Note:</p>
              <p>{selectedTaskInfo ? selectedTaskInfo.taskNote: 'None'}</p>
              
              <Button type="primary" size='large' style={{position:'absolute', bottom:20, left: 20, width:100, borderRadius:5 }} onClick={()=>onClickShowInfoModal(selectedTaskInfo)}>Edit Task</Button>
              <Button type="text" size='large' style={{position:'absolute', bottom:20, right: 20, width:100, borderRadius:5 }} onClick={()=>onDeleteTask(selectedTaskInfo)}>Delete Task</Button>
        </Drawer>

         <Modal
          title="Task Information"
          visible={showInfoModal}
          width={640}
          onCancel={handleCancelInfoModal}
          closable={true}
          maskClosable={false}
          footer={[
            <Button key="back" look='outline' onClick={handleCancelInfoModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" primary={true} onClick={onSaveTask}>
              Save
            </Button>,
          ]}>
        
            <>
            <Row> <Input size="large" placeholder="Task title" prefix={<EditOutlined />} value={tempEditTaskInfo.ongoingTaskTitle} onChange={onChangeTitle}/> </Row>
            <Row style={{paddingTop:10}}> 
              <Col span={6}>
                <Dropdown overlay={menu}>
                  <Button>Select Personel</Button>
                </Dropdown>
              </Col>
              {tempEditTaskInfo? 
                <>
                  <Col span={4}><Avatar src={tempEditTaskInfo.picture} size={64}></Avatar></Col>
                  <Col span={14}> 
                    <h4 style={{margin:0}}>{tempEditTaskInfo.name}</h4>
                    <p style={{margin:0, color: '#7f7f7f'}}>{tempEditTaskInfo.jobTitle}</p>
                  </Col>
                </>
              : ''}

            </Row>
            <Row style={{paddingTop:20}}>
              <Col  span={6}>
                <p>Completion Date:</p>
              </Col>
              <Col span={18}>
                <DatePicker onChange={onChangeDate} value={tempEditTaskInfo.completionDate}/>
              </Col>
            </Row>
            <Row>
            <Col  span={6}>
                <p>Completion Percentage:</p>
              </Col>
              <Col span={12}>
                <Slider
                  min={0}
                  max={100}
                  onChange={onChangeTaskPercentage}
                  value={typeof tempEditTaskInfo.taskPercentage === 'number' ? tempEditTaskInfo.taskPercentage : 0}
                  step={5}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={0}
                  max={100}
                  style={{ margin: '0 16px' }}
                  value={tempEditTaskInfo.taskPercentage}
                  onChange={onChangeTaskPercentage}
                  step={5}
                />
              </Col>
            </Row>
            <Row style={{paddingTop:20}}>
              <Col span={4}>
                <p>Priority Level:</p>
              </Col>
              <Col span={3} onClick={()=>onClicksetPriority('least')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <FireOutlined style={{ fontSize: 35, color: tempEditTaskInfo.priorityLevel === 'least'? '#ffdf9e' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: tempEditTaskInfo.priorityLevel === 'least'? '#ffdf9e' :'lightgray'}}> Least</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetPriority('normal')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <FireOutlined style={{ fontSize: 35, color: tempEditTaskInfo.priorityLevel === 'normal'? '#ff975a' :'lightgray' ,marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: tempEditTaskInfo.priorityLevel === 'normal'? '#ff975a' :'lightgray'}}> Normal</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetPriority('urgent')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <FireOutlined style={{ fontSize: 35, color: tempEditTaskInfo.priorityLevel === 'urgent'? '#ff6961' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color:tempEditTaskInfo.priorityLevel === 'urgent'? '#ff6961' :'lightgray'}}> Urgent</span>
                  </Row>
                </Button>
                
              </Col>
              <Col span={11}>
               
              </Col>
            </Row>
            <Row style={{paddingTop:30}}>
              <Col span={4}>
                <p>Dificulty Level:</p>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('easy')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: tempEditTaskInfo.dificultyLevel === 'easy'? '#036636' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: tempEditTaskInfo.dificultyLevel === 'easy'? '#036636' :'lightgray'}}> Easy</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('medium')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: tempEditTaskInfo.dificultyLevel === 'medium'? '#2c538f' :'lightgray' ,marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: tempEditTaskInfo.dificultyLevel === 'medium'? '#2c538f' :'lightgray'}}> Medium</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('hard')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: tempEditTaskInfo.dificultyLevel === 'hard'? '#c456ec' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color:tempEditTaskInfo.dificultyLevel === 'hard'? '#c456ec' :'lightgray'}}> Hard</span>
                  </Row>
                </Button>
                
              </Col>
              <Col span={11}>
               
              </Col>
            </Row>
            <Row style={{paddingTop:30}}>
              <h5>Note:</h5>
              <TextArea rows={4} value={tempEditTaskInfo.taskNote} onChange={onChangeNote}/>
            </Row>
            </> 
            
        
            

        </Modal>
      </Layout>
      );

}

export default TaskList;