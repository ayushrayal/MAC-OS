import React from 'react'
import {Rnd} from 'react-rnd'
import './macwindows.scss'
const MacWindows = ({windowName, setWindowState, children}) => {
  return (
    <Rnd
    default={{
      width:"400px",
      height:"400px",
      x:200,
      y:200
    }}>
        <div className='MacWindows'>
          <div className="nav">
            <div className="dots">
              <div className="dot red" onClick={() => setWindowState(state => ({ ...state, [windowName]: false }))}></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="content">
           <p>ayush rayal -ysh</p>
          </div>
          </div>
          <div className="main-content">
{children}
          </div>
        </div>
    </Rnd>
  )
}

export default MacWindows
