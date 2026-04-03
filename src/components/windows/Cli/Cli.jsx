import Terminal from 'react-console-emulator'
import MacWindows from '../MacWindows'
import "./cli.scss"
const Cli = ({windowName, setWindowState}) => {
  console.log(Terminal.default) // check
const commands = {
  echo: {
    description: 'Echo a passed string',
    usage: 'echo <string>',
    fn: (...args) => args.join(' ')
  },
  whoami: {
    description: 'Display user information',
    usage: 'whoami',
    fn: () => 'Ayush Rayal - Full Stack Developer'
  },
  pwd: {
    description: 'Print working directory',
    usage: 'pwd',
    fn: () => '/home/ayushrayal/portfolio'
  },
  ls: {
    description: 'List portfolio projects',
    usage: 'ls',
    fn: () => `projects/\n├── E-Commerce Platform\n├── Task Management App\n├── Weather Dashboard\n└── Real-time Chat Application`
  },
  projects: {
    description: 'List and describe all projects',
    usage: 'projects',
    fn: () => `📁 Projects:\n1. E-Commerce Platform - React, Node.js, MongoDB\n2. Task Management App - Vue.js, Firebase\n3. Weather Dashboard - React, OpenWeather API\n4. Real-time Chat - Socket.io, Express.js`
  },
  contact: {
    description: 'Display contact information',
    usage: 'contact',
    fn: () => `📧 Email: ayush@example.com\n🔗 GitHub: github.com/ayushrayal\n💼 LinkedIn: linkedin.com/in/ayushrayal\n🐦 Twitter: @ayushrayal`
  },
  skills: {
    description: 'Display technical skills',
    usage: 'skills',
    fn: () => `Frontend: React, Vue.js, HTML, CSS, JavaScript\nBackend: Node.js, Express, Python\nDatabase: MongoDB, Firebase, PostgreSQL\nTools: Git, Docker, Webpack, Vite`
  },
  about: {
    description: 'About this portfolio',
    usage: 'about',
    fn: () => `🎨 Portfolio v1.0\nCreated by Ayush Rayal\nA macOS-inspired portfolio built with React & Vite\nType 'help' to see all available commands`
  },
}
  return (
    <MacWindows windowName={windowName} setWindowState={setWindowState}>
      <div className="cli-window">
        <Terminal.default
          commands={commands}
          welcomeMessage={`Welcome to Ayush's Portfolio Terminal!\n\nType 'help' to see all available commands\n\nQuick commands:\n  help      - Show all available commands\n  whoami    - About me\n  projects  - View my projects\n  skills    - Technical skills\n  contact   - Get in touch\n  about     - About this portfolio\n\n`}
          promptLabel={'ayushrayal:~$'}
          promptLabelStyle={{ color: 'green' }}
        />
      </div>
    </MacWindows>
  )
}

export default Cli