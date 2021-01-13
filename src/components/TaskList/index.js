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
  SaveOutlined,
  FileAddOutlined,
} from '@ant-design/icons';


//constants
import Sidebar from '../../common/components/Sidebar';
import {updateTaskList, updateTaskListHistory} from '../../appRedux/actions'
import {columnsEmpty} from '../../common/constants/miscellaneous'
import personal1 from '../../assets/personal1.jpg'
import { routes } from '../../common/constants/routes';

//functions
import {performanceRate} from '../../common/functions/miscellaneous';

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


const TaskList = () => {

  const taskListReducer = useSelector(state => state.taskListReducer); 
  const userListReducer = useSelector(state => state.userListReducer); 
  const taskListHistoryReducer = useSelector(state => state.taskListHistoryReducer); 

  
  const dispatch = useDispatch();
  
  const {userList, availableCandidate} = userListReducer;
  const {columnsFromBackend} = taskListReducer;
  const {taskHistoryList} = taskListHistoryReducer;

  const [collapsed, setCollapsed] = useState(false);
  const [personelList, setUserList] = useState(userList? userList : []);
  const [selectedPersonel, setSelectedPersonel] = useState()
  const [columns, setColumns] = useState(columnsFromBackend ? columnsFromBackend : columnsEmpty);
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
    difficultyLevel: '',
    taskNote: ``,
    done:false,
    performanceRate:-1
  });
  const [taskHistory, SetTaskHistory] = useState();



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
        performanceRate: performanceRate(tempEditTaskInfo.difficultyLevel, level, tempEditTaskInfo.done  )
      })
      console.log(tempEditTaskInfo,'tempEditTaskInfo uyyyy');

  }

  const onClicksetDificulty = (level) => {
      setTempEditTaskInfo({
        ...tempEditTaskInfo,
        difficultyLevel:level,
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
      difficultyLevel: '',
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
        difficultyLevel: '',
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
        difficultyLevel: '',
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
        difficultyLevel: '',
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
        difficultyLevel: '',
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
      console.log(destItems,'destItems')
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

  const onClickEndSprint = () => {

    let columnHistory = {
      year:moment().format('YYYY'),
      month:moment().format('MMMM'),
      sprintNumber: parseInt(moment().format('D')) > 15 ? 2: 1,
      lastSaveDate: moment(),
      taskHistory:[],
    }

    if(columns['backlogId'].items || columns['inProgressId'].items ||
    columns['revisionId'].items || columns['doneId'].items) {

      columnHistory.taskHistory.push(...columns['backlogId'].items)
      columnHistory.taskHistory.push(...columns['inProgressId'].items)
      columnHistory.taskHistory.push(...columns['revisionId'].items)


      console.log(columns['doneId'].items,`columns['doneId'].items`)

      columns['doneId'].items.forEach(x=>{
        x.done = true;
        x.taskPercentage = 100;
        x.performanceRate = performanceRate(x.difficultyLevel, x.priorityLevel, true)}
      )

      columnHistory.taskHistory.push(...columns['doneId'].items)



      if (taskHistoryList.filter(x=> x.year === moment().format('YYYY') && x.month === moment().format('MMMM')).length === 0) {
        taskHistoryList.unshift(columnHistory)
        setColumns(columnsEmpty);
        dispatch(updateTaskListHistory(taskHistoryList));
        openNotificationSaveTask('success')

        // if( parseInt(moment().format('D')) > 15 === true) {
        //   taskHistoryList.unshift(columnHistory)
        //   setColumns(columnsEmpty);
        //   dispatch(updateTaskListHistory(taskHistoryList));
        //   openNotificationSaveTask('success');
        // }
      } else  if (parseInt(moment().format('D')) > 15) {
        let tempList2 = taskHistoryList.filter(x=> x.year === moment().format('YYYY') && x.month === moment().format('MMMM') && x.sprintNumber === 2);
   
        console.log(tempList2,'tempList2')

        if (tempList2 && tempList2.length > 0 && tempList2[0].sprintNumber === 2){
          tempList2[0].taskHistory.unshift(...columnHistory.taskHistory);
          openNotificationSaveTask('success')
        } else {
          taskHistoryList.splice(1, 0, columnHistory);
          dispatch(updateTaskListHistory(taskHistoryList));
          openNotificationSaveTask('success')
        }

        setColumns(columnsEmpty);

        
        // console.log(tempList,'tempList last')

      } else if (parseInt(moment().format('D')) <= 15) {
        let tempList1 = taskHistoryList.filter(x=> x.year === moment().format('YYYY') && x.month === moment().format('MMMM') && x.sprintNumber === 1);

         if (tempList1 && tempList1.length > 0 && tempList1[0].sprintNumber === 1){
          tempList1[0].taskHistory.unshift(...columnHistory.taskHistory);
          openNotificationSaveTask('success')
        } else {
          taskHistoryList.unshift(columnHistory);
          dispatch(updateTaskListHistory(taskHistoryList));
          openNotificationSaveTask('success')
        }

        setColumns(columnsEmpty);
      }
     




      // taskHistoryList.unshift(columnHistory)
      // setColumns(columnsEmpty);
      // dispatch(updateTaskListHistory(taskHistoryList));
      // openNotificationSaveTask('success');
    }

  }

  const openNotificationSaveTask = type => {
    notification[type]({
      message: 'Task Successfully Saved to Task History'
    });
  };


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
                <Col span={21}>
                  {collapsed ? <DoubleRightOutlined style={{fontSize:25}} onClick={toggle}/> :  <DoubleLeftOutlined style={{fontSize:25}} onClick={toggle}/>}
                </Col>
                <Col span={3}>
                  {/* <Link to={routes.ABOUT_ME}> 
                    <Button style={{height:45}} type="text">
                      <Avatar src={personal1} size={35} style={{marginRight:10}}/> About the Developer
                    </Button>
                  </Link> */}
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
                                                <Tooltip placement="top" title={item.difficultyLevel} >
                                                  {item ? (item.difficultyLevel === 'easy' ? <RestOutlined style={{ fontSize: 35, color: '#036636' }}/> : '') : ''}
                                                  {item ? (item.difficultyLevel === 'medium' ? <RestOutlined style={{ fontSize: 35, color: '#2c538f' }}/> : '') : ''}
                                                  {item ? (item.difficultyLevel === 'hard' ? <RestOutlined style={{ fontSize: 35, color: '#c456ec' }}/> : '') : ''}
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
                    <Button type="primary" shape="circle" icon={<FileAddOutlined style={{ fontSize: 25 }}/>} style={{position:'absolute', bottom:90, right: 20, width:50, height:50}} onClick={onClickCreateTask}/>
                  </Tooltip>
                  <Tooltip placement="top" title={'End Sprint and Save'}> 
                    <Button 
                      type="primary" 
                      shape="circle" 
                      icon={<SaveOutlined style={{ fontSize: 35 }}/>} 
                      style={{position:'absolute', bottom:15, right: 15, width:60, height:60}} 
                      disabled= {!(columns['backlogId'].items || columns['inProgressId'].items ||
                      columns['revisionId'].items || columns['doneId'].items)}
                      onClick={onClickEndSprint}/>
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

                  {selectedTaskInfo ? (selectedTaskInfo.difficultyLevel === 'easy' ? <div style={{paddingBottom:10}}>Dificulty Level: <RestOutlined style={{ fontSize: 30, color: '#036636' }}/> <span style={{color:'#036636'}}> easy</span></div> : '') : ''}
                  {selectedTaskInfo ? (selectedTaskInfo.difficultyLevel === 'medium' ? <div style={{paddingBottom:5}}>Dificulty Level: <RestOutlined style={{ fontSize: 30, color: '#2c538f' }}/> <span style={{color:'#2c538f'}}> Medium</span></div> : '') : ''}
                  {selectedTaskInfo ? (selectedTaskInfo.difficultyLevel === 'hard' ? <div style={{paddingBottom:5}}>Dificulty Level: <RestOutlined style={{ fontSize: 30, color: '#c456ec' }}/> <span style={{color:'#c456ec'}}> Hard</span></div> : '') : ''}

                  
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
                    <RestOutlined style={{ fontSize: 35, color: tempEditTaskInfo.difficultyLevel === 'easy'? '#036636' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: tempEditTaskInfo.difficultyLevel === 'easy'? '#036636' :'lightgray'}}> Easy</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('medium')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: tempEditTaskInfo.difficultyLevel === 'medium'? '#2c538f' :'lightgray' ,marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: tempEditTaskInfo.difficultyLevel === 'medium'? '#2c538f' :'lightgray'}}> Medium</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('hard')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: tempEditTaskInfo.difficultyLevel === 'hard'? '#c456ec' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color:tempEditTaskInfo.difficultyLevel === 'hard'? '#c456ec' :'lightgray'}}> Hard</span>
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