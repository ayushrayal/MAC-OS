import React from 'react'
import MacWindows from '../MacWindows'
import './githubWindow.scss'
import { projects } from '../../../assets/githubData'
const GithubWindow = () => {
  return (
    <MacWindows>
            {projects.map((elem,idx)=>{
                return <div key={idx} className="card">
                    <img src={elem.image} alt="" />
                    <h1>{elem.title}</h1>
                    <p>{elem.description}</p>
                    <p>{elem.technologies.map((tech) => <span key={tech}>{tech}</span>)}</p>
                    <div className="urls">
                        <a href={elem.links.repo}>Repo link</a>
                        <a href={elem.links.live}>live link</a>
                    </div>
                </div>
            })}
       
    </MacWindows>
  )
}

export default GithubWindow
