import React, { useState, useEffect } from 'react';
import moment from 'moment';

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
  Space } from 'antd';
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

const { TextArea } = Input;
const { RangePicker } = DatePicker;



const AddEditTaskModal = ({
  showInfoModal,
  handleCancelInfoModal,
  selectedPersonel,
  onChangeDate,
  onClicksetPriority,
  onClicksetDificulty,
  selectedPriority,
  selectedDificulty,
  personelList,
  selectedTaskInfo,
  setSelectedPersonel }) => {

  //const [personelList, setUserList] = useState(personelList? personelList : []);
  
  const selectPersonel = (personel) => {
    console.log(personel,'personelpersonel')
    setSelectedPersonel(personel)
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
    <Modal
          title="Task Information"
          visible={showInfoModal}
          width={640}
          onCancel={handleCancelInfoModal}
          closable={true}
          maskClosable={false}
          footer={[
            <Button key="back" look='outline' >
              Cancel
            </Button>,
            <Button key="submit" type="primary" primary={true} >
              Update
            </Button>,
          ]}>
            <Row> <Input size="large" placeholder="Task title" prefix={<EditOutlined />} /> </Row>
            <Row style={{paddingTop:10}}> 
              <Col span={6}>
                <Dropdown overlay={menu}>
                  <Button>Select Personel</Button>
                </Dropdown>
              </Col>
              {selectedPersonel? 
                <>
                  <Col span={4}><Avatar src={selectedPersonel.picture} size={64}></Avatar></Col>
                  <Col span={14}> 
                    <h4 style={{margin:0}}>{selectedPersonel.name}</h4>
                    <p style={{margin:0, color: '#7f7f7f'}}>{selectedPersonel.jobTitle}</p>
                  </Col>
                </>
              : ''}
              
              
                {/* <span>Selected Personel: {selectedPersonel? selectedPersonel.name : ''}</span> */}
              
            </Row>
            <Row style={{paddingTop:20}}>
              <Col  span={6}>
                <p>Completion Date:</p>
              </Col>
              <Col span={18}>
                <DatePicker onChange={onChangeDate} />
              </Col>
            </Row>
            <Row style={{paddingTop:20}}>
              <Col span={4}>
                <p>Priority Level:</p>
              </Col>
              <Col span={3} onClick={()=>onClicksetPriority('least')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <FireOutlined style={{ fontSize: 35, color: selectedPriority === 'least'? '#ffdf9e' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: selectedPriority === 'least'? '#ffdf9e' :'lightgray'}}> Least</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetPriority('normal')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <FireOutlined style={{ fontSize: 35, color: selectedPriority === 'normal'? '#ff975a' :'lightgray' ,marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: selectedPriority === 'normal'? '#ff975a' :'lightgray'}}> Normal</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetPriority('urgent')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <FireOutlined style={{ fontSize: 35, color: selectedPriority === 'urgent'? '#ff6961' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color:selectedPriority === 'urgent'? '#ff6961' :'lightgray'}}> Urgent</span>
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
                    <RestOutlined style={{ fontSize: 35, color: selectedDificulty === 'easy'? '#036636' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: selectedDificulty === 'easy'? '#036636' :'lightgray'}}> Easy</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('medium')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: selectedDificulty === 'medium'? '#2c538f' :'lightgray' ,marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color: selectedDificulty === 'medium'? '#2c538f' :'lightgray'}}> Medium</span>
                  </Row>
                </Button>
              </Col>
              <Col span={3} onClick={()=>onClicksetDificulty('hard')}>
                <Button type='link'>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <RestOutlined style={{ fontSize: 35, color: selectedDificulty === 'hard'? '#c456ec' :'lightgray',marginBottom:0 }}/>
                  </Row>
                  <Row justifyContent='center' style={{marginBottom:0}}>
                    <span style={{color:selectedDificulty === 'hard'? '#c456ec' :'lightgray'}}> Hard</span>
                  </Row>
                </Button>
                
              </Col>
              <Col span={11}>
               
              </Col>
            </Row>
            <Row style={{paddingTop:30}}>
              <h5>Note:</h5>
              <TextArea rows={4} />
            </Row>

        </Modal>

  )

}

export default AddEditTaskModal;