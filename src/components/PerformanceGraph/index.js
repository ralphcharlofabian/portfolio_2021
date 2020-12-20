import React, { useState, useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Brush, ReferenceLine
} from 'recharts';
import { Layout, Card, Row, Col } from 'antd';
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  RestOutlined,
  FireOutlined,
  LikeOutlined,
  DislikeOutlined
} from '@ant-design/icons';

//constants
import { routes } from '../../common/constants/routes';
import Sidebar from '../../common/components/Sidebar';

const { Header, Sider, Content } = Layout;


const PerformaceGraph = () => {
  const taskListHistoryReducer = useSelector(state => state.taskListHistoryReducer); 
  console.log(taskListHistoryReducer,'taskListHistoryReducer')
  const {taskHistoryList} = taskListHistoryReducer;

  const [taskList, setTaskHistoryList] = useState(taskHistoryList ? taskHistoryList : []);
  const [taskLiskData, setTaskLiskData] = useState([]);
  const [taskData, setTaskData] = useState({
    dateBlock:'',
    PerformanceRateAve: 0,
    taskPercentageAve: 0,
    priorityLevelAve:0,
    difficultyLevelAve:0,
  })

  taskList.sort(function(a,b){
    return new Date(b.lastSaveDate) - new Date(a.lastSaveDate);
  });

 // Main Computation from task history
  taskList.forEach(x => {

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
      taskNotDoneCount: x.taskHistory? -Math.abs((x.taskHistory.length - IsTaskDoneOcc.true) + 1) : 0,
    }

    taskLiskData.unshift(tempData);



  })

    console.log(taskLiskData,'taskLiskData')


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
              <Row>
                <Card>
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
              <Row justify='space-between'>
                <Col style={{paddingTop:2, paddingRight:2}} span={8}>
                  <Card >
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
                      data={taskLiskData}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="dateBlock" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="difficultyLeastCount" fill="#50c878" />
                      <Bar dataKey="difficultyNormalCount" fill="#6189c7" />
                      <Bar dataKey="difficultyHardCount" fill="#c456ec" />
                      <Brush dataKey="dateBlock" height={8} stroke="#1890ff" />
                    </BarChart>
                  </Card>
                </Col>
                <Col style={{padding:2}} span={8}>
                  <Card >
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
                  </Card>
                </Col>
                <Col style={{paddingTop:2, paddingLeft:2}} span={8}>
                <Card >
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
                      height={300}
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
              
            
          </Content>
        </Layout>
      </Layout>
      );
}

export default PerformaceGraph;