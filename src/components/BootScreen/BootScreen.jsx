import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useOSStore from '../../store/useOSStore';
import { Apple } from 'lucide-react';
import './BootScreen.scss';

const BootScreen = () => {
  const { osState, finishBooting } = useOSStore();

  useEffect(() => {
    if (osState.isBooting) {
      const timer = setTimeout(() => {
        finishBooting();
      }, 3000); // 3 seconds boot sequence
      return () => clearTimeout(timer);
    }
  }, [osState.isBooting, finishBooting]);

  return (
    <AnimatePresence>
      {osState.isBooting && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="boot-logo-container"
          >
            <Apple fill="white" size={100} />
            <motion.div 
              className="loading-bar"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2.5, ease: "linear", delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
