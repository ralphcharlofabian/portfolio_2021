import React, { useState, useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Brush, ReferenceLine
} from 'recharts';

import CountUp from 'react-countup';
import { Layout, Card, Row, Col, Tabs, Avatar, Tooltip as TooltipAnt, Progress  } from 'antd';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RestOutlined,
  FireOutlined,
  LikeOutlined,
  DislikeOutlined,
  UserOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

const PerformaceGraph = () => {
  const taskListHistoryReducer = useSelector(state => state.taskListHistoryReducer); 
  const userListReducer = useSelector(state => state.userListReducer); 
  console.log(taskListHistoryReducer,'taskListHistoryReducer')
  const {taskHistoryList } = taskListHistoryReducer;
  const { userList } = userListReducer;
  const [taskList, setTaskHistoryList] = useState(taskHistoryList ? taskHistoryList : []);
  const [taskLiskData, setTaskLiskData] = useState([]);
  const [userListInfo, setUserListInfo] =useState(userList ? userList : [])
  const [taskData, setTaskData] = useState({
    dateBlock:'',
    PerformanceRateAve: 0,
    taskPercentageAve: 0,
    priorityLevelAve:0,
    difficultyLevelAve:0,
  })

  let sortedTaskList = taskList.sort(function(a,b){
    return new Date(b.lastSaveDate) - new Date(a.lastSaveDate);
  });

 // Main Computation from task history
 sortedTaskList.forEach(x => {

    function addition(arr) {
       if (Object.prototype.toString.call(arr) === '[object Array]') {
         var total = arr[0];
         if (typeof (total) !== 'number') {
           return false;
         }
         for (var i = 1, length = arr.length; i < length; i++)
         {
           if (typeof (arr[i]) === 'number')
           {
             total += arr[i];
           } 
           else 
           return false;
         }
         return total;
        } 
         else
          return false;
    }

    let tempPerformanceRateTotalArr = x.taskHistory.map(x => {return(x.performanceRate)});
    let tempPerformanceRateAve = parseFloat((addition(tempPerformanceRateTotalArr)/ tempPerformanceRateTotalArr.length).toFixed(2));
    let tempPerformanceRateTotal = addition(tempPerformanceRateTotalArr);

    let tempTaskPercentageTotalArr = x.taskHistory.map(x => {return(x.taskPercentage)});
    let tempTaskPercentageAve = parseFloat((addition(tempTaskPercentageTotalArr) / tempTaskPercentageTotalArr.length).toFixed(2));
    let tempTaskPercentageTotal = addition(tempTaskPercentageTotalArr)

    function mostOccurence(arr){
      return arr.sort((a,b) =>
            arr.filter(v => v===a).length
          - arr.filter(v => v===b).length
      ).pop();
    }

    let tempPriorityLevelArr = x.taskHistory.map(x => {return(x.priorityLevel)});
    let tempMostPriorityLevel = mostOccurence(tempPriorityLevelArr);
    let priorityLevelOccurrences = tempPriorityLevelArr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    let tempDifficultyLevelArr = x.taskHistory.map(x => {return(x.difficultyLevel)});
    let tempMostDifficultyLevel = mostOccurence(tempDifficultyLevelArr);
    let difficultyLevelOccurrences = tempDifficultyLevelArr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    let tempIsTaskDoneArr = x.taskHistory.map(x => {return(x.done)});
    let tempIsTaskDoneMostOcc = mostOccurence(tempIsTaskDoneArr);
    let IsTaskDoneOcc = tempIsTaskDoneArr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    let tempSprintMvp = x.taskHistory.map(x=> {
      if (x.done) {
        return ({
          name: x.name,
          performanceRate: x.performanceRate
        })
      }
      
    }).filter(x=> x !== undefined)

    console.log(tempSprintMvp,'tempSprintMvp')

/// work here

// function mvpChecker(arr) {
  
//   var mf = 1;
//   var m = 0;
//   var item = {
//     name:'',
//     performanceRate:0,
//   }
//   for (var i=0; i<arr.length; i++) {
//     for (var j=i; j<arr.length; j++)
//     {
//             if (arr[i].name == arr[j].name)
//              m++;
             
//             if (mf<m)
//             {
//               mf=m; 

//               item.name = arr[i].name;
//               item.performanceRate = arr[i].performanceRate + arr[j].performanceRate
//             }
//     }
//     m=0;
//   }

//   return item;
// }

// let test = [];
// test.push(mvpChecker(tempSprintMvp));

// console.log(test,'teasdasdasds')

/// end work here
 
    let tempData = {
      dateBlock:`${x.month.substring(0,3)}, Sprint:${x.sprintNumber}, ${x.year}`,
      performanceRateAve: tempPerformanceRateAve,
      performanceRateTotal: tempPerformanceRateTotal,
      taskPercentageAve: tempTaskPercentageAve,
      taskPercentageTotal: tempTaskPercentageTotal,
      mostPriorityLevel: tempMostPriorityLevel,
      priorityLeastCount: priorityLevelOccurrences.least ? priorityLevelOccurrences.least: 0,
      priorityNormalCount: priorityLevelOccurrences.normal ? priorityLevelOccurrences.normal: 0,
      priorityUrgentCount: priorityLevelOccurrences.urgent ? priorityLevelOccurrences.urgent : 0,
      mostDifficultyLevel: tempMostDifficultyLevel,
      difficultyLeastCount: difficultyLevelOccurrences.easy ? difficultyLevelOccurrences.easy : 0,
      difficultyNormalCount: difficultyLevelOccurrences.medium ? difficultyLevelOccurrences.medium : 0,
      difficultyHardCount: difficultyLevelOccurrences.hard ? difficultyLevelOccurrences.hard : 0,
      noOfTask:x.taskHistory? x.taskHistory.length + 1 : 0,
      lastSaveDate: x.lastSaveDate,
      taskDoneCount: IsTaskDoneOcc.true ? IsTaskDoneOcc.true : 0,
      taskNotDoneCount: x.taskHistory? -Math.abs(IsTaskDoneOcc.false) : 0,
    }

    taskLiskData.unshift(tempData);

  })


  // End of main Computation from task history


  //console.log(taskLiskData,'taskLiskData')


  let lineupInfoFe = userListInfo.map(x => {return x.feRating}).reduce((a, b) => a + b, 0)
  let lineupInfoBe = userListInfo.map(x => {return x.beRating}).reduce((a, b) => a + b, 0)
  let lineupInfoDes = userListInfo.map(x => {return x.designRating}).reduce((a, b) => a + b, 0)
  let lineupInfoProd = userListInfo.map(x => {return x.prodMgtRating}).reduce((a, b) => a + b, 0)
  let lineupInfoQa = userListInfo.map(x => {return x.qaRating}).reduce((a, b) => a + b, 0)

  // let tempDifficultyLevelArr = x.taskHistory.map(x => {return(x.difficultyLevel)});
  // let tempMostDifficultyLevel = mostOccurence(tempDifficultyLevelArr);
  // let difficultyLevelOccurrences = tempDifficultyLevelArr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed)
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
              
              <Row justify='space-between'>
                <Col style={{paddingTop:2, paddingRight:2}} span={8}>
                  <Row justify='space-between'>
                    <Col span={6} >
                      <Card size="small">
                        <p style={{margin:0, marginBottom:10}}>Total Sprint Count:</p>
                        <span style={{fontSize:40}}>
                          <CountUp 
                            end={taskList ? taskList.length : 0}
                            duration={4}
                            decimals={0}/>
                        </span>
                      </Card>
                    </Col>
                    <Col span={18}>
                      <Card size="small">
                        <p style={{margin:0}}>Project Title: <span style={{fontSize:18, paddingLeft:5}}>PERFORMANCE TRUST SCALE</span></p>
                        <Progress percent={20} size="small" status="active"/>
                        <p style={{margin:0}}>{`Start Date: ${moment().set('month', 8).set('year', 2020).set('date',25).format('MMM, d, yyyy')}`}</p>
                        <p style={{margin:0}}>{`End Date: ${moment().add(4,'month').format('MMM, d, yyyy')}`}</p>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col span={24} style={{marginTop:2}}>
                      <Card size="small">
                      <p>Employee Committed in this project:</p>
                      {userListInfo? userListInfo.map(user=>
                      <>
                        <TooltipAnt title={user.name} placement="top">
                          <Avatar src={user.picture} size={40} style={{margin:4}}/>
                         </TooltipAnt>
                        
                      </>
                      ): ''}
                    </Card>
                  </Col>
                  </Row>

                  <Row>
                    <Col span={24} style={{marginTop:2}}>
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
                      <Row justify='end'>
                        <p style={{marginTop:11, color:'lightgray'}}><span>* This shows the combined skills of all employee committed to this project</span></p>
                      </Row>
                    </Card>
                  </Col>
                  </Row>
                  {/* <Row>
                    <Col span={24}>
                        <Card size="small" >
                          <p style={{marginBottom:20}}>Note:</p> 
                        </Card>
                    </Col>
                  </Row> */}
                  
                </Col>
                <Col style={{padding:2}} span={8}>
                  <Card size="small">
                    <Tabs defaultActiveKey="2">
                      <TabPane
                        tab={
                          <span>
                            <RestOutlined />
                            Difficulty Level
                          </span>
                        }
                        key="1" >
                      <Row>
                          <Col span={14}>
                            <h4>Difficulty Level Count</h4>
                          </Col>
                          <Col span={10}>
                            <span style={{color: '#036636', paddingLeft:3}}>easy <RestOutlined style={{ fontSize: 15, color: '#036636'  }}/></span>
                            <span style={{color: '#2c538f', paddingLeft:15}}>medium <RestOutlined style={{ fontSize: 15, color: '#2c538f'  }}/></span>
                            <span style={{color: '#c456ec', paddingLeft:15}}>hard <RestOutlined style={{ fontSize: 15, color: '#c456ec'  }}/></span>  
                          </Col>
                        </Row>
                        <BarChart
                          width={500}
                          height={300}
                          data={taskLiskData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="dateBlock" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="difficultyLeastCount" fill="#50c878" />
                          <Bar dataKey="difficultyNormalCount" fill="#6189c7" />
                          <Bar dataKey="difficultyHardCount" fill="#c456ec" />
                          <Brush dataKey="dateBlock" height={8} stroke="#1890ff" />
                        </BarChart>
                      </TabPane>
                      <TabPane
                        tab={
                          <span>
                            <FireOutlined />
                            Urgent Level
                          </span>
                        }
                        key="2"
                      >
                        <Row>
                          <Col span={14}>
                            <h4>Urgent Level Count</h4>
                          </Col>
                          <Col span={10}>
                            <span style={{color: '#ffdf9e', paddingLeft:3}}>least <FireOutlined style={{ fontSize: 15, color: '#ffdf9e'  }}/></span>
                            <span style={{color: '#ff975a', paddingLeft:15}}>normal <FireOutlined style={{ fontSize: 15, color: '#ff975a'  }}/></span>
                            <span style={{color: '#ff6961', paddingLeft:15}}>urgent <FireOutlined style={{ fontSize: 15, color: '#ff6961'  }}/></span>
                          </Col>
                        </Row>
                        <BarChart
                          width={500}
                          height={300}
                          data={taskLiskData}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="dateBlock" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="priorityLeastCount" fill="#ffdf9e" />
                          <Bar dataKey="priorityNormalCount" fill="#ff975a" />
                          <Bar dataKey="priorityUrgentCount" fill="#ff6961" />
                          <Brush dataKey="dateBlock" height={8} stroke="#1890ff" />
                        </BarChart>
                      </TabPane>
                    </Tabs>,
                  

                  </Card>
                </Col>
                <Col style={{paddingTop:2, paddingLeft:2}} span={8}>
                <Card size="small">
                    <Row>
                      <Col span={15}>
                        <h4>Task Completion Count</h4>
                      </Col>
                      <Col span={9}>
                        <span style={{color: '#22bb33', paddingLeft:3}}>finished <LikeOutlined  style={{ fontSize: 15, color: '#22bb33' }}/></span>
                        <span style={{color: '#e82d23', paddingLeft:15}}>un finished <DislikeOutlined style={{ fontSize: 15, color: '#e82d23' }}/></span>
                      </Col>
                    </Row>
                    <BarChart
                      width={500}
                      height={384}
                      data={taskLiskData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dateBlock" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="taskDoneCount" fill="#22bb33" />
                      <Bar dataKey="taskNotDoneCount" fill="#e82d23" />
                      <Brush dataKey="dateBlock" height={8} stroke="#1890ff" />
                      <ReferenceLine y={0} stroke="#000" />
                    </BarChart>
                  </Card>
                </Col>
              </Row>

              <Row style={{marginTop:8}}>
                <Card>
                  <h4>Performance Projection</h4>
                  <LineChart width={window.innerWidth - 274} height={300} data={taskLiskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateBlock" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="noOfTask" stroke="#8884d8" activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="performanceRateTotal" stroke="#cc30d1" activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="taskPercentageAve" stroke="#82ca9d" activeDot={{ r: 5 }}/>
                    <Brush dataKey="dateBlock" height={8} stroke="#1890ff" />
                  </LineChart>
                </Card>
              </Row>
              
            
          </Content>
        </Layout>
      </Layout>
      );
}

export default PerformaceGraph;