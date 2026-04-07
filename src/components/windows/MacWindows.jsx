import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import useOSStore from '../../store/useOSStore';
import './macwindows.scss';

const MacWindows = ({ windowName, children }) => {
  const { windows, closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useOSStore();
  const windowState = windows[windowName];
  const rndRef = useRef(null);

  if (!windowState || !windowState.isOpen) return null;

  return (
    <Rnd
      ref={rndRef}
      size={windowState.isMaximized ? { width: '100vw', height: '100vh' } : windowState.size}
      position={windowState.isMaximized ? { x: 0, y: 0 } : windowState.position}
      onDragStop={(e, d) => !windowState.isMaximized && updateWindowPosition(windowName, { x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!windowState.isMaximized) {
          updateWindowSize(windowName, { width: ref.style.width, height: ref.style.height });
          updateWindowPosition(windowName, position);
        }
      }}
      disableDragging={windowState.isMaximized}
      enableResizing={!windowState.isMaximized}
      style={{ zIndex: windowState.zIndex, display: windowState.isMinimized ? 'none' : 'block' }}
      onMouseDown={() => focusWindow(windowName)}
      className="rnd-container"
      bounds="parent"
      dragHandleClassName="nav"
    >
      <motion.div 
        className={`MacWindows ${windowState.isMaximized ? 'maximized' : ''}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ width: "100%", height: "100%" }}
      >
        <div className="nav" onDoubleClick={() => toggleMaximizeWindow(windowName)}>
          <div className="dots">
            <div className="dot red" onClick={(e) => { e.stopPropagation(); closeWindow(windowName); }}></div>
            <div className="dot yellow" onClick={(e) => { e.stopPropagation(); minimizeWindow(windowName); }}></div>
            <div className="dot green" onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(windowName); }}></div>
          </div>
          <div className="content">
            <p>{windowName}</p>
          </div>
        </div>
        <div className="main-content">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
};

export default MacWindows;
