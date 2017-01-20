const React= require('react');
const ReactDOM = require('react-dom');
const $=require('jquery');
const pf=require('./postconfig.js');


const Select=require('./select.jsx');
const Found=require('./found.jsx');
const Publish=require('./publish.jsx');
const Message=require('./message.jsx');
const Mine=require('./mine.jsx');
const selectSecond=require('./selectSecond.jsx');
const foundSecond=require('./foundSecond.jsx');
const praisePeople=require('./praisePeople.jsx');
const comment=require('./comment.jsx');
const others=require('./others.jsx');
const messagePraise=require('./messagePraise.jsx');
const directMessage=require('./directMessage.jsx');
const loading=require('./loading.jsx');
const seting=require('./seting.jsx');
const basicmessage=require('./basicmessage.jsx');
const week=require('./starOfWeek.jsx');


// const wxsdk=require('./wxsdk.js');




//////////////////////////////////////////////////////////
//路由配置

import { Router, Route, hashHistory   } from 'react-router';


ReactDOM.render((
	<Router history={hashHistory } >
		<Route path='/'  component={Select.Select} ></Route>
		<Route path='found' component={Found.Found} />
		<Route path='message' component={Message.Message} />
		<Route path='mine' component={Mine.Mine} ></Route>
		<Route path='seting' component={seting.seting} ></Route>
		<Route path='basic' component={basicmessage.basic}></Route>
		

		<Route path='week/:id' component={week.week} ></Route>
		<Route path='selectSecond/:id' component={selectSecond.selectSecond} ></Route>
		<Route path='praisePeople/:id' component={praisePeople.praisePeople} ></Route>
		<Route path='foundSecond/:id' component={foundSecond.foundSecond} ></Route>
		<Route path='comment/:id' component={comment.comment} ></Route>
		<Route path='others/:id' component={others.other} ></Route>
		<Route path='messagePraise/:id' component={messagePraise.messagePraise} ></Route>
		<Route path='directMessage/:id' component={directMessage.directMessage} ></Route>
		
	</Router>
),document.getElementById('app'))





