import React , { useState, useEffect } from 'react';
import Particles from 'react-particles-js';
import { Parallax, ParallaxBanner, ParallaxProvider  } from 'react-scroll-parallax';
import Typed from 'react-typed';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Wobble from 'react-reveal/Wobble';
import RubberBand from 'react-reveal/RubberBand';
import { Link, useHistory } from 'react-router-dom';

//constants
import { routes } from '../../common/constants/routes';

import moment from 'moment';

import particles from '../../common/constants/particles.json'
import initMap from '../../common/functions/map';
import { 
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Avatar,
  Carousel, 
  Divider,
  Comment,
} from 'antd';

import {
  RollbackOutlined,
  MailOutlined,
  WechatOutlined,
  LinkedinOutlined,
  PushpinOutlined,
  LaptopOutlined
} from '@ant-design/icons';

import feDeskImage from '../../assets/feDeskImage.svg'
import skyImage from '../../assets/sky.jpg'

import personalImage1 from '../../assets/personal1.jpg'
import uiuxIcon from '../../assets/uiuxIcon.png'
import personalImage3 from '../../assets/personal3.jpg'
import backend from '../../assets/backend.png'
import frontend from '../../assets/frontend.jpg'

import feImage from '../../assets/techSkillsLogo/frontend.png'
import reactImage from '../../assets/techSkillsLogo/react.png'
import vueImage from '../../assets/techSkillsLogo/vue.png'
import angularImage from '../../assets/techSkillsLogo/angular.png'

import lessImage from '../../assets/techSkillsLogo/less.png'
import sassImage from '../../assets/techSkillsLogo/sass.png'
import bootstrapImage from '../../assets/techSkillsLogo/bootstrap.png'

import jest from '../../assets/techSkillsLogo/jest.png'
import mocha from '../../assets/techSkillsLogo/mocha.png'
import jasmine from '../../assets/techSkillsLogo/jasmine.png'

import bower from '../../assets/techSkillsLogo/bower.png'
import grunt from '../../assets/techSkillsLogo/grunt.png'
import webpack from '../../assets/techSkillsLogo/webpack.png'

import yarn from '../../assets/techSkillsLogo/yarn.png'
import npm from '../../assets/techSkillsLogo/npm.png'

import figmaImage from '../../assets/techSkillsLogo/figma.png'
import uiux from '../../assets/techSkillsLogo/uiux.png'
import xd from '../../assets/techSkillsLogo/xd.png'


import node from '../../assets/techSkillsLogo/node.png'
import cSharp from '../../assets/techSkillsLogo/cSharp.png'
import net from '../../assets/techSkillsLogo/net.png' 
import sql from '../../assets/techSkillsLogo/sql.png'
import mongodb from '../../assets/techSkillsLogo/mongodb.png'
import firebaseImage from '../../assets/techSkillsLogo/firebase.png'


import algoFilipino from '../../assets/companyLogoEtc/algoFilipino.png'
import denso from '../../assets/companyLogoEtc/denso.png'
import groundGuru from '../../assets/companyLogoEtc/groundGuru.png'
import bizbox from '../../assets/companyLogoEtc/bizbox.png'
import tradelo from '../../assets/companyLogoEtc/tradelo.png'
import indigitous from '../../assets/companyLogoEtc/indigitous.png'
import samsung from '../../assets/companyLogoEtc/samsung.jpg'
import filta from '../../assets/companyLogoEtc/filta.png'
import devcon from '../../assets/companyLogoEtc/devcon.png'
import mapua from '../../assets/companyLogoEtc/mapua.png'
import pccw from '../../assets/companyLogoEtc/pccw.png'
import smart from '../../assets/companyLogoEtc/smart.jpg'
import webRacoon from '../../assets/companyLogoEtc/webRacoon.png'
import pldt from '../../assets/companyLogoEtc/pldt.jpg'
import sti from '../../assets/companyLogoEtc/sti.png'
import itworks from '../../assets/companyLogoEtc/itworks.png'

import contactMe from '../../assets/contactMe.png'
import unQuote from '../../assets/unQuote.svg'
import quote from '../../assets/quote.svg'
import sketchBucket from '../../assets/sketchBucket.svg'
import {testimonials} from '../../common/constants/testimonials'

import topviewDesk from '../../assets/topviewDesk.jpg'


const AboutMe = () => {

  useEffect(()=>{
      initMap();
    
  },[]);


  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    //background: '#364d79',
    background: 'white',
  };

    return (
      <div className="App" >
      <div style={{backgroundColor:'#080822', height: window.innerHeight}}>
        <Particles
        params={particles} />
        <span style={{position:'absolute', top: window.innerHeight/3, left: window.innerWidth/3 - 400, color: 'white', fontSize: 35  }}> Hello! There!</span>
        <span style={{position:'absolute', top: window.innerHeight/3 + 40, left: window.innerWidth/3 - 400, color: 'white', fontSize: 35  }}> My name is RC and I'm a</span>
        <Typed
          style={{position:'absolute', top: window.innerHeight/3 + 70, left: window.innerWidth/3 - 400, color: 'white', fontSize: 70  }}
          strings={[
            'UI/UX Designer',
            'Frontend Engineer',
            'Mentor']}
            typeSpeed={20}
            backSpeed={50}
            loop >
        </Typed>
        <span style={{position:'absolute', bottom: window.innerHeight/50, right: window.innerWidth/50, color: 'lightgray', fontSize: 15, opacity:0.2  }}>* Try to click beyond the background to add new particle effect*</span>
      </div>

      <div>
        <ParallaxProvider>
          <Parallax>
            <ParallaxBanner
                className="your-class"
                layers={[
                    {
                        image: skyImage,
                        amount: 0.4,
                    },
                    {
                      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png',
                      amount: 0.7,
                  },
                ]}
                style={{
                    height:  window.innerHeight,
                }}>
                <Fade top >
                  <div style={{textAlign:'center'}}>
                    <h1 style={{marginTop:180, fontFamily:'sans-serif', fontWeight: 700, lineHeight: 1.5}}>I Stand on the DOT where design and code intersect, reaching the world through teaching and app/web development</h1>
                    <div style={{paddingTop:50}}>
                      <h2 style={{marginLeft:'15%', width:'70%',fontFamily:'sans-serif', fontWeight: 500, lineHeight: 1.5}}>
                    {`I am a competent professional with a decade of experience in the field of web/app development, mastering the craft of frontend engineering and experience in backend development. Have extensive knowledge from, UI/UX designing, up to development of application through codes, and applying latest tech in full stack development. 
                    A well-versed software engineer that has a vision to improve the world by means of teaching.`}
                      </h2>
                    </div>
                  </div>
              </Fade>
            </ParallaxBanner>
          </Parallax>
        </ParallaxProvider>
      </div>
      <div style={{backgroundColor:'#080822', height: window.outerHeight}}>
        <div style={{textAlign:'center'}}>
          
            <h1 style={{color: 'white', fontSize: 50,fontFamily:'sans-serif', paddingTop:120 }}>My Skill Set</h1>
          
          
        </div>
        <Row justify='space-around' style={{paddingTop:60}}>
              <Col span={6}>
                <RubberBand>
                  <Card size='small'>
                    <div style={{textAlign:'center'}}>
                     <Avatar src={uiuxIcon} size={150} style={{opacity:.70}}></Avatar> 
                      <h1>UI/UX Designer</h1>
                      <p>I find it astonishing how a simple design can make a big impact to the application and the branding it represent. 
                        How the design as well as the user interaction takes place that makes the app more engaging.  </p>
                      <Row justify='center' style={{marginTop:25, marginBottom:25}}>
                        <Col span={7}>
                        <Avatar src={figmaImage} size={80} shape='square'></Avatar> 
                        </Col>
                        <Col span={7}>
                        <img src={uiux} style={{width:'100%', marginRight:25}}></img>
                        </Col>
                        <Col span={7}>
                        <Avatar src={xd} size={80} shape='square'></Avatar> 
                        </Col>
                      </Row>
                    </div>
                    
                  </Card>
                </RubberBand>
               
              </Col>
              <Col span={6}>
                <RubberBand>
                  <Card size='small'>
                    <div style={{textAlign:'center'}}>
                     <Avatar src={frontend} size={150} style={{opacity:.70}}></Avatar> 
                      <h1>Frontend Developer</h1>
                      <p>As a frontend developer, I am always amaze how to convert the design from wireframe and UI design to actual website throught code.</p>
                      <Row justify='center'>
                        <img src={feImage} style={{width:'60%'}}></img>   
                      </Row>
                      <Row justify='center' style={{marginTop:5}}>
                        <Col span={7}>
                        <Avatar src={reactImage} size={80} shape='square'></Avatar> 
                        </Col>
                        <Col span={7}>
                        <Avatar src={vueImage} size={80} shape='square'></Avatar> 
                        </Col>
                        <Col span={7}>
                        <Avatar src={angularImage} size={80} shape='square'></Avatar> 
                        </Col>
                      </Row>
                      <Row justify='space-around' style={{marginTop:10}}>
                        <Col span={18}>
                          <img src={lessImage} style={{width:'35%', marginRight:25}}></img> 
                          <Avatar src={sassImage} size={40} style={{marginRight:25}}></Avatar>
                          <Avatar src={bootstrapImage} size={40} shape='square'></Avatar>
                        </Col>
                      </Row>
                      <Row justify='space-around' style={{marginTop:15, marginBottom:10}}>

                        <Avatar src={jest} size={35} ></Avatar>
                          <Avatar src={jasmine} size={35} ></Avatar>
                          <Avatar src={mocha} size={35}></Avatar>
                          <Avatar src={webpack} size={35} ></Avatar>
                          <Avatar src={yarn} size={35} ></Avatar>
                          <Avatar src={npm} size={35} ></Avatar>
                          <Avatar src={grunt} size={35} ></Avatar>
                          <Avatar src={bower} size={35} ></Avatar>
                        
                      </Row>
                    </div>
                    
                  </Card>
                </RubberBand>
              </Col>
              <Col span={6}>
                <RubberBand>
                  <Card size='small'>
                    <div style={{textAlign:'center'}}>
                     <Avatar src={backend} size={150} style={{opacity:.70}}></Avatar> 
                      <h1>Backend Developer</h1>
                      <p>Data management, is one of the key factor for the successful syncronization of data from frontend side to backend side and vise versa. </p>
                      <Row justify='center' style={{marginTop:25, marginBottom:25}}>
                        <Col span={7}>
                        <Avatar src={cSharp} size={80} ></Avatar> 
                        </Col>
                        <Col span={7}>
                        <img src={node} style={{width:'100%', marginRight:25}}></img>
                        </Col>
                        <Col span={7}>
                        <Avatar src={net} size={80}></Avatar> 
                        </Col>
                      </Row>
                      <Row justify='center' style={{marginTop:25, marginBottom:25}}>
                        
                        <Avatar src={mongodb} size={80} style={{marginRight:20}}></Avatar> 
                        <Avatar src={sql} size={80} style={{marginRight:20}}></Avatar> 
                        <Avatar src={firebaseImage} size={80} ></Avatar>
                       
                      </Row>
                    </div>
                    
                  </Card>
                </RubberBand>
              </Col>
          </Row>
      </div>
      
      

      <div style={{backgroundColor:'white', height: window.outerHeight - 180, paddingTop:'5%'}}>
        <Fade top>
          <Row justify='center'>
            <Avatar src={personalImage1} style={{}} size={300}></Avatar>
          </Row>

        </Fade>
        <Row justify='center' style={{paddingTop:20}}>
          <h1 style={{color: '#080822', fontSize: 30,fontFamily:'sans-serif' }}>UI/UX Designer | Frontend Developer | Mentor</h1>
        </Row>
        <Fade>
          <Row justify='center' style={{paddingTop:10}}>
            <h4 style={{color: '#080822',fontFamily:'sans-serif', width:'55%', textAlign:'center' }}>I believe in changing the world, by inspiring people to pursue what they are passionate about. Inspiring new generations and companies to have a happy feeling when they go to work or school by being not just one good example for the company, but a person who can motivate them and have a purpose.</h4>
          </Row>
          <Row justify='center' style={{paddingTop:10}}>
            <h4 style={{color: '#080822',fontFamily:'sans-serif', width:'55%', textAlign:'center' }}>With that vision, I slowly change the game play, motivated employees and students now became more productive and happier to their field yielding less stress and more knowledge they gain and share. And most of them became leaders and inspire others. If you believe in what I believe, I can share my visions and motivations, as well as my technical expertise.</h4>
          </Row>
          <Row justify='center' style={{paddingTop:30}}>
            <h2 style={{color: '#080822',fontFamily:'sans-serif',  textAlign:'center' }}>“Great companies don't hire skilled people and motivate them, they hire already motivated people and inspire them.”</h2>
          </Row>
          <Row justify='center' style={{paddingTop:45}}>
            <h2 style={{color: 'gray',fontFamily:'sans-serif',  textAlign:'center', fontSize: 30 }}>Together, Lets make a difference and Change the world to a better future.</h2>
          </Row>
        </Fade>
       
      </div>

      <div>
       
        <Carousel autoplay  autoplaySpeed={1800}>
          <div>
            <h3 style={contentStyle}>
              <Row justify='space-around'>
                  <img style={{ height:100}} src={algoFilipino}/>
                  <img style={{ height:80, paddingTop:10}} src={denso}/>
                  <img style={{ height:120}} src={groundGuru}/>
                  <img style={{ height:80, paddingTop:10}} src={bizbox}/>
                  <img style={{ height:80, paddingTop:10}} src={tradelo}/>
              </Row>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Row justify='space-around'>
                  <img style={{ height:100}} src={indigitous}/>
                  <img style={{ height:80, paddingTop:10}} src={devcon}/>
                  <img style={{ height:80}} src={samsung}/>
                  <img style={{ height:80, paddingTop:10}} src={mapua}/>
                  <img style={{ height:80, paddingTop:10}} src={filta}/>
              </Row>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Row justify='space-around'>
                  <img style={{ height:100}} src={pccw}/>
                  <img style={{ height:100}} src={smart}/>
                  <img style={{ height:100}} src={webRacoon}/>
                  <img style={{ height:80, paddingTop:10}} src={pldt}/>
                  <img style={{ height:80, paddingTop:10}} src={itworks}/>
                  <img style={{ height:80, paddingTop:10}} src={sti}/>
              </Row>
            </h3>
          </div>
        </Carousel>
        {/* <div style={{textAlign:'center'}}>
            <h1 style={{color: '#080822', fontSize: 30,fontFamily:'sans-serif', paddingTop:0, paddingBottom:30 }}>they experienced my expertise as I move forward to path of success</h1>
        </div> */}
      </div>

      
      <div style={{backgroundColor:'#080822', height: window.outerHeight, paddingTop:'5%'}}>
        <Row>
          <Col span={12}>
            <Fade>
              <Row>
                <h1 style={{color: 'white',fontFamily:'cursive', textAlign:'center', paddingTop:'10%', width:'85%', paddingLeft:'15%' }}>Something in mind?
                  Lets talk and together... WE can change the world for a better future!</h1>
              </Row>
              <img src={contactMe} style={{paddingLeft:'10%'}}></img>
              <Row>
                <h2 style={{color: 'white',fontFamily:'cursive', paddingLeft:'5%'}}>Contact me:</h2>
              </Row>
              <Row>
                <MailOutlined style={{color:'white', fontSize:30, paddingLeft:'7%'}}/><h3 style={{color: 'white',fontFamily:'sans-serif', paddingLeft:10, paddingTop:2}}>ralphcharlofabian@yahoo.com | ralphcharlofabian@gmail.com</h3>
              </Row>
              <Row>
                <WechatOutlined style={{color:'white', fontSize:30, paddingLeft:'7%'}}/><h3 style={{color: 'white',fontFamily:'sans-serif', paddingLeft:10, paddingTop:2}}>+639672366838  | +639619542296</h3>
              </Row>
              <Row>
                <LinkedinOutlined style={{color:'white', fontSize:30, paddingLeft:'7%'}}/><h3 style={{color: 'white',fontFamily:'sans-serif', paddingLeft:10, paddingTop:2}}><a href='https://www.linkedin.com/in/ralph-charlo-fabian-83531aab/'>https://www.linkedin.com/in/ralph-charlo-fabian</a></h3>
              </Row>
              <Row>
                <PushpinOutlined style={{color:'white', fontSize:30, paddingLeft:'7%'}}/><h3 style={{color: 'white',fontFamily:'sans-serif', paddingLeft:10, paddingTop:2}}>Lot 6 Blk 4, Sta. Cruz, Guiguinto, Bulacan</h3>
              </Row>
              
            </Fade>

            <Row>
              <Col span={12}>
                <div id="js-map" class="map" tabindex="0" style={{width:'100%', height:220, paddingLeft:'10%'}}>
                  {initMap()}
                </div>
              </Col>
              <Col span={12}>
                <Row justify='end' style={{paddingTop:'10%'}}>
                <LaptopOutlined style={{color:'white', fontSize:30, paddingLeft:'7%'}}/><h4 style={{color: 'white', paddingLeft:10, paddingTop:2}}>Want to see some of my portfolio?</h4>
                </Row>
                <Row justify='end'>
                  <a href='http://meetapp-rcfabian.surge.sh'> http://meetapp-rcfabian.surge.sh </a>
                </Row>
                <Row justify='end'>
                  <a href='http://rcfabian-dynamic-portfolio.surge.sh'> http://rcfabian-dynamic-portfolio.surge.sh </a>
                </Row>
                <Row justify='end'>
                  <a href='http://rcfabian-static-portfolio.surge.sh'> http://rcfabian-static-portfolio.surge.sh </a>
                </Row>
                  <Row justify='end'>
                <Link to={routes.LOGIN_PAGE}>
                    <Button type='text' icon={<RollbackOutlined style={{color:'white', fontSize:30}}/>}> <h4 style={{color: 'white', paddingTop:2}}>Go to PTS App</h4></Button>
                </Link>
                  </Row>
                
              </Col>
            </Row>
            
          </Col>
          <Col span={12} style={{padding:20, }}>
            <Card size='small' style={{height:  window.outerHeight - 185, borderRadius:30}}>
              <Row>
                <h1 style={{color: '#080822',fontFamily:'cursive', textAlign:'center', paddingTop:50 }}>Some comments and testimonials</h1>
              </Row>
              <Carousel autoplay vertical={true}>
                {testimonials.map(x => 
                <Card bordered={false}>
                  
                    <Row style={{width:'100%'}} justify='start'>
                      <img src={quote}/>
                      <h2 style={{color:'black', paddingTop:10, paddingLeft:10, fontFamily:'cursive'}}>
                        {x.testimonials}
                      </h2>
                    </Row>
                    <Row justify='end'>
                      <img src={unQuote}/>
                    </Row>
                    <Row justify='end' style={{paddingTop:10}}>
                      <Col span={2}>
                        <Avatar
                          src={x.picture}
                          alt="images sample"
                          style={{marginRight:10, marginLeft:10}}
                          size={50}
                        />
                      </Col>
                      <div>
                        <h3 style={{paddingTop:2, color: 'gray',fontFamily:'sans-serif', margin:0}}>{x.name}</h3>
                        <h4 style={{paddingTop:0, color: 'gray',fontFamily:'sans-serif', margin:0}}>{`${x.position} | ${x.company}`}</h4>
                      </div>
                    </Row>
                      
                  
                </Card>)}
                
              
              </Carousel>
                <img alt='wave' src={sketchBucket} style={{position:'absolute', bottom:-70, right:-170, width:'65%', height:'60%', opacity:0.2, paddingLeft:20}}></img>
            </Card>
            <h4 style={{color:'gray',fontFamily:'sans-serif', position:'absolute' ,right:10}}>RalphCharloFabian_v1.01</h4>
          </Col>
        </Row>
      </div>
        
    </div>
      );
}

export default AboutMe;