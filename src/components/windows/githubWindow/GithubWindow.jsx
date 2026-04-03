import React from 'react'
import MacWindows from '../MacWindows'
import './githubWindow.scss'
import { projects } from '../../../assets/githubData'
const GithubWindow = () => {
  return (
    <MacWindows>
            <div className="cards">
              {projects.map((elem,idx)=>{
                return <div key={idx} className="card">
                    <img src={elem.image} alt="" />
                    <h1>{elem.title}</h1>
                    <p className='description'>{elem.description}</p>
                    <h5 className='tags'>{elem.technologies.map((tech) => <span key={tech}>{tech}</span>)}</h5>
                    <div className="urls">
                        <a href={elem.links.repo}>Repo link</a>
                        {elem.links.live && <a href={elem.links.live}>live link</a>}
                    </div>
                </div>
            })}
            </div>
       
    </MacWindows>
  )
}

export default GithubWindow
