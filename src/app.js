import React from 'react';
import StyleEditor from './styleEditor';
import Heart from './heart';
import HeartRain from './heartRain';
console.log("RUNNING APP FROM:", __filename);
console.log("APP BUILD MARKER: HAMZA_123");

const isPc = (function () {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}());

export default class App extends React.Component {

  fullStyle = [
    `/*
* Hey Ayesha,
* You see im kind of a nerd
* and while i could be doing my sproj
* i prefer to spend time with you
* so i thought why not combine both 
* sorta
* anyway take a look at your ${isPc ? 'desktop' : 'mobile'}
*/

/* start by transitions to elements */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}
/* background needs some color. */
body, html {
  color: #fff;
  background-color: darkslategray;
}

/* gotta format the text a bit */
.styleEditor {
  overflow: auto;
  ${isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;` }
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
}

/* code isnt really readable. lemme add some highlights */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }

/* lil 3D action */
html{
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

.styleEditor {
  ${isPc ? `transform: rotateY(10deg) translateZ(-100px) ;
  -webkit-transform: rotateY(10deg) translateZ(-100px);` : `transform: rotateX(-10deg) translateZ(-100px);
  -webkit-transform: rotateX(-10deg) translateZ(-100px);` } ${isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;` }
}

/*
* lemme teach you the basics
* here's how to draw a heart with CSS
*/

/* lets make a drawing board */
.heartWrapper {
  ${isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;`}
  position: relative;
  border: 1px solid;
  background-color: white;
  ${isPc ?
      `transform: rotateY(-10deg) translateZ(-100px);
  -webkit-transform: rotateY(-10deg) translateZ(-100px);` :
      `transform: rotateX(10deg) translateZ(-100px);
  -webkit-transform: rotateX(10deg) translateZ(-100px);`}${isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;`}
}

/* draw squares */
.heart {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  border-radius: 20px;
  background: #E88D8D;
  transform: rotate(45deg);
}

/* make the left side */
.heart::before {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  left: -38px;
  top: 1px;
}

/* right side */
.heart::after {
  content: '';
  background: #E88D8D;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  right: -1px;
  top: -38px;
}


@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0
  }
}

.bounce {
  opacity: 0.2;
  animation: throb 1s infinite linear;
}
/*
* Ok done !
* ...
* ...
* ...
* ...
* ...
* am i
* forgetting something?
*/
.valentineText {
  position: absolute;
  top: calc(50% - 120px);  
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  font-weight: 700;
  color: #E88D8D;
  font-family: "Georgia", serif;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
  .valentineText {
  animation: fadeIn 2s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}



@media (max-width: 768px) {
  .valentineText {
    font-size: 22px;
    top: calc(50% - 110px);
    white-space: normal;
    width: 90%;
  }
}

`
  ]

  state = {
    currentStyleCode: '',
    finished: false,
    heartRains: []
  }

  interval = 30;
  // interval = 0;

  async progressiveShowStyle(n = 0) {
    const {
      interval,
      fullStyle
    } = this;
    const showStyle = i => new Promise((resolve) => {
      const style = fullStyle[n];
      const char = style[i];
      if (!style || !char) {
        resolve();
        return;
      }
      let {
        currentStyleCode
      } = this.state;
      currentStyleCode += char;
      this.setState({
        currentStyleCode
      });
      if (char === '\n' && this.styleEditor) {
        this.styleEditor.toBottom();
      }
      setTimeout(() => {
        resolve(showStyle(i + 1))
      }, interval);
    });
    return showStyle(0);
  }

  async componentDidMount() {
    await this.progressiveShowStyle(0);
    this.setState({ finished: true });
    this.rain();
  }

  saveStyleEditorRef = child => this.styleEditor = child;

  rain = () => {
    let { heartRains } = this.state;
    const rainNum = 30;
    const stayTime = rainNum * 200 + 1000 + 4000;
    const time = (new Date()).getTime();
    if (!heartRains.length || (time - heartRains[heartRains.length - 1].time > (stayTime / 2))) {
      heartRains.push({ time, rainNum });
      this.setState({ heartRains });
      setTimeout(() => {
        this.removeRain(time);
      }, stayTime);
    }
  }

  removeRain(time) {
    let { heartRains } = this.state;
    heartRains = heartRains.filter(item => item.time !== time);
    this.setState({ heartRains });
  }

  render() {
    const { currentStyleCode, finished, heartRains } = this.state;
    return <div>
      <div style={{ display: isPc ? 'flex' : '' }}>
        <StyleEditor ref={this.saveStyleEditorRef} code={currentStyleCode} />
        <Heart click={finished ? this.rain : null} showText={finished} />

      </div>
      {
        heartRains.map(item => <HeartRain num={item.rainNum} key={item.time} />)
      }
    </div>;
  }
}