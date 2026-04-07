import React, { useState, useEffect, useRef } from 'react';
import useOSStore from '../../store/useOSStore';
import DateTime from '../DateTime';
import { Wifi, Battery, BatteryFull, Search, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import "./nav.scss";

const Navbar = () => {
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const { windows } = useOSStore();
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAppleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine active app name from windows
  const activeApp = Object.entries(windows).find(([_, state]) => state.isOpen && state.isFocused);
  const appName = activeApp ? activeApp[0].charAt(0).toUpperCase() + activeApp[0].slice(1) : 'Finder';

  const handleRestart = () => {
    setAppleMenuOpen(false);
    window.location.reload(); 
  }

  return (
    <nav className="mac-navbar">
        <div className="left">
            <div 
              className={`nav-item apple-icon ${appleMenuOpen ? 'active' : ''}`} 
              onClick={() => setAppleMenuOpen(!appleMenuOpen)}
            >
                <img src="./Nav-icons/apple.svg" alt="Apple" />
            </div>

            <AnimatePresence>
              {appleMenuOpen && (
                <motion.div 
                  ref={dropdownRef}
                  className="apple-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="menu-item" onClick={() => { setAppleMenuOpen(false); alert("Mac OS Portfolio by Ayush Rayal.\nReact + Vite + Zustand + Framer Motion") }}>About This Mac</div>
                  <div className="menu-divider"></div>
                  <div className="menu-item" onClick={() => setAppleMenuOpen(false)}>System Settings...</div>
                  <div className="menu-item" onClick={() => setAppleMenuOpen(false)}>App Store...</div>
                  <div className="menu-divider"></div>
                  <div className="menu-item" onClick={handleRestart}>Restart...</div>
                  <div className="menu-item" onClick={handleRestart}>Shut Down...</div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="nav-item app-name">
                <p>{appName === 'Github' ? 'Projects' : appName}</p>
            </div>
            <div className="nav-item"><p>File</p></div>
            <div className="nav-item"><p>Edit</p></div>
            <div className="nav-item"><p>View</p></div>
            <div className="nav-item"><p>Go</p></div>
            <div className="nav-item"><p>Window</p></div>
            <div className="nav-item"><p>Help</p></div>
        </div>
        <div className="right">
            <div className="nav-icon tray-icon">
               <BatteryFull size={16} fill="white" />
            </div>
            <div className="nav-icon tray-icon">
               <Wifi size={16} />
            </div>
            <div className="nav-icon tray-icon">
               <Search size={16} />
            </div>
            <div className="nav-icon tray-icon">
               <Settings2 size={16} />
            </div>
            <div className="nav-item datetime">
                <DateTime/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
