//核心包
import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';//导入跟组件
//import reportWebVitals from './reportWebVitals';


//把APP渲染到root节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
