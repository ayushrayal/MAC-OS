import React from 'react'
import {Rnd} from 'react-rnd'
import './macwindows.scss'
const MacWindows = (props) => {
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
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="content">
           <p>ayush rayal -ysh</p>
          </div>
          </div>
          <div className="main-content">
{props.children}
          </div>
        </div>
    </Rnd>
  )
}

export default MacWindows
