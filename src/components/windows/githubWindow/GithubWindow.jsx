import React, { useState, useMemo } from 'react';
import MacWindows from '../MacWindows';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../../assets/githubData';
import './githubWindow.scss';

const GithubWindow = ({ windowName }) => {
  const [filter, setFilter] = useState('All');

  // Extract unique tech tags
  const allTags = useMemo(() => {
    const tags = new Set(['All']);
    if (projects) {
      projects.forEach(p => {
        if (p.technologies) {
          p.technologies.forEach(t => tags.add(t));
        }
      });
    }
    return Array.from(tags);
  }, []);

  const filteredProjects = (projects || []).filter(p => filter === 'All' || (p.technologies && p.technologies.includes(filter)));

  return (
    <MacWindows windowName={windowName}>
      <div className="projects-container">
        <div className="projects-header">
          <h2>My Projects</h2>
          <div className="filters">
            {allTags.map(tag => (
              <button 
                key={tag} 
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="cards">
          <AnimatePresence>
            {filteredProjects.map((elem, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={elem.title || idx} 
                className="card"
              >
                <div className="card-image">
                  <img src={elem.image || 'https://via.placeholder.com/400x200/333/fff?text=Project'} alt={elem.title} />
                  <div className="overlay">
                    <div className="urls">
                      {elem.links?.repo && <a href={elem.links.repo} target="_blank" rel="noreferrer">GitHub</a>}
                      {elem.links?.live && <a href={elem.links.live} target="_blank" rel="noreferrer">Live Preview</a>}
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{elem.title}</h3>
                  <p className='description'>{elem.description}</p>
                  <div className='tags'>
                    {elem.technologies && elem.technologies.map(tech => <span key={tech}>{tech}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MacWindows>
  );
}

export default GithubWindow;
