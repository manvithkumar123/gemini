import React, { use, useContext ,useState,useEffect} from 'react'
import './Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCompass,faLightbulb,faMessage,faCode,faMusic,faPaperPlane,faPaperclip,faMicrophone,faU} from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../context/context';
import { assets } from '../../assets/assets';



const Main = () => {
  const {onSent,recentPrompt,showResult,Loading,resultData,setinput,input} = useContext(Context)
  const [userName, setUserName] = useState('');

  useEffect(() => {
    /*const name = prompt("Enter your name");*/
    setUserName(name);
  }, []);

  useEffect(() => {
    const handleDarkModeToggle = (e) => {
      const root = document.documentElement;
      if (e.detail === 'dark') {
        root.style.setProperty('--bg_light', 'black');
        root.style.setProperty('--font', 'white');
        root.style.setProperty('--card_bg', 'black');
        root.style.setProperty('--hover_lt', 'rgb(21, 21,50)');


      } else {
        root.style.setProperty('--bg_light', 'white');
        root.style.setProperty('--font', 'black');
        root.style.setProperty('--card_bg', 'white');
      }
    };

    window.addEventListener('toggle-dark-mode', handleDarkModeToggle);

    return () => {
      window.removeEventListener('toggle-dark-mode', handleDarkModeToggle);
    };
  }, []);

  return (
      <div className="main">
        <div className="nav">
        <h1>Jarvis</h1>
        <a href="#"><img src={assets.logo} alt="" className='logo-main'/></a>
        </div>
        <div className="maincontainer">
          {!showResult
          ?<>
                    <div className="greet">
            <p><span>Hello, {userName || "Guest"}</span></p>
            <p>How can i help you</p>
          </div>
            <div className="cards">
              <div className="card" onClick={() => {
                setinput("Suggest some good places");
                onSent();
              }}>
                <p>Suggest some good places</p>
                <FontAwesomeIcon icon={faCompass} className="compass-icon" />
              </div>
              <div className="card" onClick={() => {
                setinput("Suggest new projects");
                onSent();
              }}>
                <p>Suggest new projects</p>
                <FontAwesomeIcon icon={faLightbulb} className="buld-icon" />
              </div>
              <div className="card" onClick={() => {
                setinput("Suggest good songs");
                onSent();
              }}>
                <p>Suggest good songs</p>
                <FontAwesomeIcon icon={faMusic} className="music-icon" />
              </div>
              <div className="card" onClick={() => {
                setinput("Random coding question");
                onSent();
              }}>
                <p>Random coding question</p>
                <FontAwesomeIcon icon={faCode} className="code-icon" />
              </div>
            </div>
          </>
          :<div className='result'>
            <div className="result-title">
              <img src={assets.user} alt="" id='user_logo'/>
            <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.logo} alt="" id='logo_reply'/>
               {Loading
               ?<div className='loader'>
                <hr />
                <hr />
                <hr />
               </div>
              : resultData && resultData !== "undefined"
                ? <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                : <p>None</p>}
              
            </div>
          </div>
          }

            <div className="bottom_search">
              <div className="searchbox">
                <input
                  onChange={(e) => setinput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Ask Jarvis"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSent();
                    }
                  }}
                />
                <div>
                <FontAwesomeIcon icon={faPaperclip} className='send'/>
                <FontAwesomeIcon icon={faMicrophone} className='send'/>
                <FontAwesomeIcon onClick={()=>onSent()}icon={faPaperPlane} className='send'/>
                </div>
              </div>
              <p className='info'>Jarvis is not responsibile for personal info,please dont share your personal info</p>
            </div>
        </div>
      </div>

  )
}

export default Main
