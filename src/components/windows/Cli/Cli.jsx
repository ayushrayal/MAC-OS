import React, { useState, useRef, useEffect } from 'react';
import MacWindows from '../MacWindows';
import './cli.scss';
import useOSStore from '../../../store/useOSStore';

const helpText = `
Available commands:
  help      - Show this help message
  about     - About me
  projects  - Open projects directory
  resume    - Open resume document
  contact   - Show contact info
  clear     - Clear the terminal
  ls        - List directory contents
  pwd       - Print working directory
  cd        - Change directory
  whoami    - Print current user
  open <app>- Open a UI application (e.g., open spotify, open notes, open github)
  touch <f> - Create a new empty file
  mkdir <d> - Create a new directory
  cat <f>   - Read a file's contents
  echo <txt>- Print text to terminal
  matrix    - Enter the matrix
  weather   - Fetch local weather
  history   - View command history
`;

let fileSystem = {
  '/': ['home', 'usr', 'etc'],
  '/home': ['ayush'],
  '/home/ayush': ['projects', 'documents', 'desktop', 'portfolio.txt'],
  '/home/ayush/projects': ['mac-os', 'e-commerce', 'weather-app'],
};

let fileContents = {
  '/home/ayush/portfolio.txt': "Welcome to my portfolio! Built with React, Zustand, and Framer Motion."
};

const validApps = ['spotify', 'github', 'notes', 'resume'];

const Cli = ({ windowName }) => {
  const { openWindow } = useOSStore();
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to MacOS Terminal.' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [currentPath, setCurrentPath] = useState('/home/ayush');
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (isMatrixMode) {
      const interval = setInterval(() => {
        setHistory(prev => [...prev, { type: 'output', text: Math.random().toString(36).substring(2, 110) + Math.random().toString(36).substring(2, 110) }]);
      }, 50);
      
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsMatrixMode(false);
        setHistory(prev => [...prev, { type: 'output', text: "Matrix disconnected." }]);
      }, 3000); // Stop matrix after 3 seconds so it's not annoying

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isMatrixMode]);

  const resolvePath = (target) => {
    if (!target) return currentPath;
    if (target === '~') return '/home/ayush';
    let newPath = target.startsWith('/') ? target : `${currentPath === '/' ? '' : currentPath}/${target}`;
    if (newPath.endsWith('/')) newPath = newPath.slice(0, -1);
    return newPath;
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory([...history, { type: 'input', text: `ayush@macbook:${currentPath} $` }]);
      return;
    }

    const newHistory = [...history, { type: 'input', text: `ayush@macbook:${currentPath} $ ${trimmed}` }];
    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    if (commandHistory[commandHistory.length - 1] !== trimmed) {
      setCommandHistory([...commandHistory, trimmed]);
    }
    setHistoryIndex(-1);

    let output = '';

    switch (command) {
      case 'help':
        output = helpText;
        break;
      case 'about':
        output = "Hi, I'm Ayush Rayal. A Full Stack Developer passionate about building great UI/UX. Experienced in React, Node, and modern web architectures.";
        break;
      case 'projects':
        output = "Launching Projects Explorer...";
        openWindow('github');
        break;
      case 'resume':
        output = "Opening Resume PDF...";
        openWindow('resume');
        break;
      case 'contact':
        output = "Email: ayush@example.com\nLinkedIn: linkedin.com/in/ayush-rayal\nGitHub: github.com/ayushrayal";
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'pwd':
        output = currentPath;
        break;
      case 'whoami':
        output = "ayush";
        break;
      case 'history':
        output = commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n');
        break;
      case 'echo':
        output = args.slice(1).join(' ');
        break;
      case 'weather':
        output = "Fetching weather for your location...\n☀️ 24°C, Sunny. Perfect weather for coding!";
        break;
      case 'matrix':
        setIsMatrixMode(true);
        output = "Initializing matrix construct...";
        break;
      case 'sudo':
        output = "ayush is not in the sudoers file. This incident will be reported to a recruiter.";
        break;
      case 'open':
        const appToOpen = args[1]?.toLowerCase();
        if (validApps.includes(appToOpen)) {
          output = `Opening ${appToOpen}...`;
          openWindow(appToOpen);
        } else {
          output = `Application not found or cannot be opened via terminal. Available apps: ${validApps.join(', ')}`;
        }
        break;
      case 'ls':
        const contents = fileSystem[currentPath];
        if (contents) {
          output = contents.join('  ');
        } else {
          output = '';
        }
        break;
      case 'cd':
        const targetCd = args[1];
        if (!targetCd || targetCd === '~') {
          setCurrentPath('/home/ayush');
        } else if (targetCd === '..') {
          const parts = currentPath.split('/').filter(Boolean);
          if (parts.length > 0) {
            parts.pop();
            setCurrentPath('/' + parts.join('/'));
          } else {
            setCurrentPath('/');
          }
        } else {
          let newPath = resolvePath(targetCd);
          if (fileSystem[newPath] || newPath === '/') {
            setCurrentPath(newPath);
          } else {
            output = `cd: ${targetCd}: No such directory`;
          }
        }
        break;
      case 'touch':
        const touchFile = args[1];
        if (!touchFile) {
          output = "touch: missing file operand";
        } else {
          if (!fileSystem[currentPath]) fileSystem[currentPath] = [];
          if (!fileSystem[currentPath].includes(touchFile)) {
            fileSystem[currentPath].push(touchFile);
            fileContents[resolvePath(touchFile)] = '';
          }
        }
        break;
      case 'mkdir':
        const dirName = args[1];
        if (!dirName) {
          output = "mkdir: missing operand";
        } else {
          if (!fileSystem[currentPath]) fileSystem[currentPath] = [];
          if (!fileSystem[currentPath].includes(dirName)) {
            fileSystem[currentPath].push(dirName);
            fileSystem[resolvePath(dirName)] = [];
          }
        }
        break;
      case 'cat':
        const catFile = args[1];
        if (!catFile) {
          output = "cat: missing file operand";
        } else {
          const catPath = resolvePath(catFile);
          if (fileContents[catPath] !== undefined) {
            output = fileContents[catPath];
          } else {
            output = `cat: ${catFile}: No such file or is a directory`;
          }
        }
        break;
      default:
        output = `Command not found: ${command}. Type 'help' to see available commands.`;
    }

    if (output) {
      newHistory.push({ type: 'output', text: output });
    }
    
    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setInputVal(commandHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIdx = historyIndex + 1;
        if (newIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(newIdx);
          setInputVal(commandHistory[newIdx]);
        }
      }
    }
  };

  return (
    <MacWindows windowName={windowName}>
      <div className="cli-container" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        {!isMatrixMode && (
          <div className="terminal-input-line">
            <span className="prompt">ayush@macbook:{currentPath} $ </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </MacWindows>
  );
};

export default Cli;