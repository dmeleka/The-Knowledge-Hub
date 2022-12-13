import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

var langItems = document.getElementsByClassName("language-item");
var btnImage = document.getElementById("btn-img");
var btnTitle = document.getElementById("btn-title");

for (var i = 0; i < langItems.length; i++) {
  var langItem = langItems[i];
  langItem.onclick = changeCountry;
}

function changeCountry(e) {
  btnImage.src = "assets/" + this.dataset.lang + ".svg";
  btnTitle.innerText = this.dataset.lang;
}