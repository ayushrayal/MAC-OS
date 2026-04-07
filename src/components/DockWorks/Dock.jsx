import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useOSStore from '../../store/useOSStore';
import './dock.scss';

const DockItem = ({ app, iconSrc, onClick, mouseX, isOpen }) => {
  const ref = React.useRef(null);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 90, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div 
      ref={ref} 
      className={`dock-item ${app.id}`} 
      onClick={onClick}
      style={{ width, height: width }}
      whileTap={{ scale: 0.8 }}
    >
      <div className="tooltip">{app.name}</div>
      <img src={iconSrc} alt={app.name} />
      <div className={`active-dot ${isOpen ? 'visible' : ''}`}></div>
    </motion.div>
  );
};

const Dock = () => {
  const { windows, openWindow } = useOSStore();
  const mouseX = useMotionValue(Infinity);

  const apps = [
    { id: 'github', name: 'Projects', icon: './Dock-icons/github.svg', action: () => openWindow('github') },
    { id: 'notes', name: 'Notes', icon: './Dock-icons/note.svg', action: () => openWindow('notes') },
    { id: 'resume', name: 'Resume', icon: './Dock-icons/pdf.svg', action: () => openWindow('resume') },
    { id: 'spotify', name: 'Spotify', icon: './Dock-icons/spotify.svg', action: () => openWindow('spotify') },
    { id: 'cli', name: 'Terminal', icon: './Dock-icons/cli.svg', action: () => openWindow('cli') },
    { id: 'mail', name: 'Mail', icon: './Dock-icons/mail.svg', action: () => window.open('mailto:ayushrayal19@gmail.com', '_blank') },
    { id: 'linkedin', name: 'LinkedIn', icon: './Dock-icons/link.svg', action: () => window.open('https://www.linkedin.com/in/ayush-rayal', '_blank') },
  ];

  return (
    <motion.div 
      className="dock-container"
      initial={{ y: 150 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
    >
      <div 
        className='Dock'
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {apps.map((app) => (
          <DockItem 
            key={app.id} 
            app={app} 
            iconSrc={app.icon} 
            onClick={app.action} 
            mouseX={mouseX}
            isOpen={windows[app.id]?.isOpen}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;
