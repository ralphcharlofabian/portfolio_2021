import React, { useState, useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import CountUp from 'react-countup';
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
  InputNumber, 
Card,} from 'antd';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RestOutlined,
  FireOutlined,
  DislikeOutlined,
  LikeOutlined,
  CalendarOutlined,
  FilterOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';
import {performanceRate} from '../../common/functions/miscellaneous';
import { Collapse } from '@material-ui/core';
const { Header, Sider, Content } = Layout;

const TaskHistory = () => {

    const taskListHistoryReducer = useSelector(state => state.taskListHistoryReducer); 
    console.log(taskListHistoryReducer,'taskListHistoryReducer')
    const {taskHistoryList} = taskListHistoryReducer;

    const [taskList, setTaskHistoryList] = useState(taskHistoryList ? taskHistoryList : []);
    const [filteredTaskList, setFilteredTaskList] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [collapsed, setCollapsed] = useState(false);

    console.log(taskList,'taskList')

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    
    const selectYear = (year) => {
      setSelectedYear(year);
    }
    const selectMonth = (month) => {
      setSelectedMonth(month);
    }

    const removeFilter = () => {
      setSelectedMonth();
      setSelectedYear();
    }
    const menuYear = () => {
      let uniqTaskYear = [...new Set(taskHistoryList.map (task => task.year))];
      return (
        <Menu width={100}>
          {uniqTaskYear? uniqTaskYear.map(year =>
            <Menu.Item>
              <Row onClick={()=>selectYear(year)} >
                  <h4 style={{margin:0}}>{year}</h4>
              </Row>
            </Menu.Item>
            ) : ''} 
        </Menu>
      )
    }

    const menuMonth = () => {
      let uniqTaskMonth = [...new Set(taskHistoryList.map (task => task.month))];
      return (
        <Menu width={100}>
          {uniqTaskMonth? uniqTaskMonth.map(month =>
            <Menu.Item>
              <Row onClick={()=>selectMonth(month)} style={{width:100}}>
                  <h4 style={{margin:0}}>{month}</h4>
              </Row>
            </Menu.Item>
            ) : ''} 
        </Menu>
      )
    }
   
    const setFilterByDate = () => {
      let filtered =  taskHistoryList.filter(task=> task.year === selectedYear && task.month === selectedMonth);
      openNotificationWithIcon('success');
      setTaskHistoryList(filtered);

    }

    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Filter Applied Successfully'
      });
    }; 

    const menuPersonel = () => {
      let uniqPersonel = [...new Set(taskHistoryList.map (task => [...new Set(task.taskHistory.map(personel=>personel.name ))]))];
      console.log(uniqPersonel,'uniqPersonel')
      // return (
      //   <Menu width={100}>
      //     {uniqTaskMonth? uniqTaskMonth.map(month =>
      //       <Menu.Item>
      //         <Row onClick={()=>selectMonth(month)} style={{width:100}}>
      //             <h4 style={{margin:0}}>{month}</h4>
      //         </Row>
      //       </Menu.Item>
      //       ) : ''} 
      //   </Menu>
      // )
    }

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
                backgroundColor:'#def3fd',
                //overflow: 'auto',
              }}
            >
            <Card style={{width:'100%'}} size='small'>
              <Row>
               <Col span={2}> 
                  <Button disabled={!(selectedYear || selectedMonth)} onClick={removeFilter}>Remove Filter</Button> 
               </Col>
               <Divider type='vertical' style={{height:30, paddingRight:10}}/>
                <Col span={4}>
                  <Row justify='space-around'>
                    <div>
                      <Dropdown overlay={menuYear}>
                        <Button>{selectedYear? selectedYear : 'Year Fiter'}</Button>
                      </Dropdown>
                    </div>
                    <div>
                      <Dropdown overlay={menuMonth}>
                        <Button>{selectedMonth? selectedMonth : 'Month Filter'}</Button>
                      </Dropdown>
                    </div>
                    { selectedYear && selectedMonth ? 
                      <Tooltip placement="top" title='Filter Task History' >
                        <Button type="primary" shape="circle" onClick={setFilterByDate}><FilterOutlined /></Button>
                      </Tooltip>: 
                      <Tooltip placement="top" title='Select Year and Month to filter' >
                        <Button disabled type="text"><FilterOutlined /></Button> 
                      </Tooltip>
                      }
                     
                  </Row>
                </Col>
                <Divider type='vertical' style={{height:30, paddingRight:10}}/>
                <Col>
                <Button onClick={menuPersonel} disabled>Personel Filter</Button>
                </Col>
               
              </Row>
            </Card>
            <Row>
              {taskList? taskList.map(taskInfo => 
                <>
                {taskInfo.sprintNumber ===1 ?
                <Col span={12} style={{padding:5}}>
                   <Card 
                    size='small'
                    title={ 
                      <div style={{padding:0}}> 
                        <CalendarOutlined /> 
                        <span style={{marginLeft:8, marginRight:3, color:'#7f7f7f'}}>Yr:</span>{`${taskInfo.year}`}<span style={{marginLeft:10, marginRight:0, color:'#7f7f7f'}}>Mo:</span> {`${taskInfo.month}`}<span style={{marginLeft:10, marginRight:0}}>Sprint:</span> {`${taskInfo.sprintNumber}`}
                      </div>} style={{backgroundColor:'#def3fd'}}>
                    {taskInfo.taskHistory ? taskInfo.taskHistory.map(item => 
                      <div                    
                        style={{
                          userSelect:'none',
                          padding:5,
                          margin:'0 0 3px 0',
                          minHeight:50,
                          backgroundColor:'white',
                          //color: '',
                        }}
                        // onClick={()=>onClickShowInfoDrawer(item)}
                      > 
                          <span style={{padding:3}}> {item.ongoingTaskTitle} </span>
                          <Row>
                            <Col span={1}></Col>
                            <Col span={2}>
                              <Avatar src={item.picture} size={40}/>
                            </Col>
                            <Col span={15} style={{padding:0}}>
                              <Tooltip placement="topLeft">
                                <Progress percent={item.taskPercentage} size="small" status="active" showInfo={false}/>
                              </Tooltip>
                              <p style={{fontSize:12, color:'#7f7f7f'}}>{`Completion date: ${moment(item.completionDate).format('MMM/DD/YYYY')}`}</p>
                      
                            </Col>
                            <Col span={5} style={{paddingLeft:5}}>
                              <Tooltip placement="top" title={item.difficultyLevel} >
                                {item ? (item.difficultyLevel === 'easy' ? <RestOutlined style={{ fontSize: 35, color: '#036636', padding:3 }}/> : '') : ''}
                                {item ? (item.difficultyLevel === 'medium' ? <RestOutlined style={{ fontSize: 35, color: '#2c538f',padding:3 }}/> : '') : ''}
                                {item ? (item.difficultyLevel === 'hard' ? <RestOutlined style={{ fontSize: 35, color: '#c456ec',padding:3  }}/> : '') : ''}
                              </Tooltip>
                              <Tooltip placement="top" title={item.priorityLevel} >
                      
                                {item ? (item.priorityLevel === 'urgent' ? <FireOutlined style={{ fontSize: 35, color: '#ff6961',padding:3  }}/> : '') : ''}
                                {item ? (item.priorityLevel === 'normal' ? <FireOutlined style={{ fontSize: 35, color: '#ff975a',padding:3  }}/> : '') : ''}
                                {item ? (item.priorityLevel === 'least' ? <FireOutlined style={{ fontSize: 35, color: '#ffdf9e',padding:3 }}/> : '') : ''}
                              </Tooltip>
                               <Tooltip placement="top" title={item.done=== true? 'done' : 'un done'} >
                                {item ? (item.done === true ? <LikeOutlined  style={{ fontSize: 35, color: '#22bb33',padding:3  }}/> : <DislikeOutlined style={{ fontSize: 35, color: '#ff6961',padding:3  }}/>) : ''}
                              </Tooltip>
                              {/* {performanceRate(item.difficultyLevel, item.priorityLevel, item.done)} */}
                              
                            </Col>
                            <Col span={1}>
                            <Tooltip placement="top" title={`Performance Rating`} > 
                              <span style={{fontSize:25, position:'absolute', right:20}}>
                                <CountUp 
                                  end={item.performanceRate}
                                  duration={4}
                                  decimals={0}/>
                              </span>
                            </Tooltip>
                          </Col>
                          </Row>
                        </div>) 
                      : ''}
                  </Card>
                </Col> :

                <Col span={12} style={{padding:5}}>
                  <Card size='small'
                    title={ 
                      <div style={{padding:0}}> 
                        <CalendarOutlined /> 
                        <span style={{marginLeft:8, marginRight:3, color:'#7f7f7f'}}>Year:</span>{`${taskInfo.year}`}<span style={{marginLeft:10, marginRight:0, color:'#7f7f7f'}}>Month:</span> {`${taskInfo.month}`}<span style={{marginLeft:10, marginRight:0}}>Sprint Number:</span> {`${taskInfo.sprintNumber}`}
                      </div>} style={{backgroundColor:'#def3fd'}}>
                    {taskInfo.taskHistory ? taskInfo.taskHistory.map(item => 
                    <div                    
                      style={{
                        userSelect:'none',
                        padding:5,
                        margin:'0 0 3px 0',
                        minHeight:50,
                        backgroundColor:'white',
                        //color: '',
                      }}
                      // onClick={()=>onClickShowInfoDrawer(item)}
                    > 
                        <span style={{padding:3}}> {item.ongoingTaskTitle} </span>
                        <Row>
                          <Col span={1}></Col>
                          <Col span={2}>
                            <Avatar src={item.picture} size={40}/>
                          </Col>
                          <Col span={15} style={{padding:0}}>
                            <Tooltip placement="topLeft">
                              <Progress percent={item.taskPercentage} size="small" status="active" showInfo={false}/>
                            </Tooltip>
                            <p style={{fontSize:12, color:'#7f7f7f'}}>{`Completion date: ${moment(item.completionDate).format('MMM/DD/YYYY')}`}</p>
                    
                          </Col>
                          <Col span={5} style={{paddingLeft:5}}>
                            <Tooltip placement="top" title={item.difficultyLevel} >
                              {item ? (item.difficultyLevel === 'easy' ? <RestOutlined style={{ fontSize: 35, color: '#036636',padding:3  }}/> : '') : ''}
                              {item ? (item.difficultyLevel === 'medium' ? <RestOutlined style={{ fontSize: 35, color: '#2c538f',padding:3  }}/> : '') : ''}
                              {item ? (item.difficultyLevel === 'hard' ? <RestOutlined style={{ fontSize: 35, color: '#c456ec',padding:3  }}/> : '') : ''}
                            </Tooltip>
                            <Tooltip placement="top" title={item.priorityLevel} >
                    
                              {item ? (item.priorityLevel === 'urgent' ? <FireOutlined style={{ fontSize: 35, color: '#ff6961',padding:3  }}/> : '') : ''}
                              {item ? (item.priorityLevel === 'normal' ? <FireOutlined style={{ fontSize: 35, color: '#ff975a',padding:3  }}/> : '') : ''}
                              {item ? (item.priorityLevel === 'least' ? <FireOutlined style={{ fontSize: 35, color: '#ffdf9e',padding:3  }}/> : '') : ''}
                            </Tooltip>
                            <Tooltip placement="top" title={item.done=== true? 'done' : 'un done'} >
                              {item ? (item.done === true ? <LikeOutlined  style={{ fontSize: 35, color: '#22bb33' ,padding:3 }}/> : <DislikeOutlined style={{ fontSize: 35, color: '#e82d23',padding:3  }}/>) : ''}
                            </Tooltip>
                            
                          </Col>
                          <Col span={1}>
                            <Tooltip placement="top" title={`Performance Rating`} > 
                              <span style={{fontSize:25, position:'absolute', right:20}}>
                                <CountUp 
                                  end={item.performanceRate}
                                  duration={4}
                                  decimals={0}/>
                              </span>
                            </Tooltip>
                          </Col>
                        </Row>
                      </div>) 
                    : ''}
                </Card>
              </Col>
            }
            </>) : ''}

          </Row>
          
          </Content>
        </Layout>
      </Layout>
      );
}

export default TaskHistory;