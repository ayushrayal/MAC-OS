import "./App.scss";
import { useState } from "react";
import Dock from "./components/DockWorks/Dock";
import Navbar from "./components/Navbar/Navbar";
import Cli from "./components/windows/Cli/Cli";
import GithubWindow from "./components/windows/githubWindow/GithubWindow";
import Notes from "./components/windows/NoteCode/Notes";
import Resume from "./components/windows/Resume/Resume";
import Spotify from "./components/windows/Spotify/Spotify";

const App = () => {
  const [windowState, setWindowState] = useState({
    github: false,
    notes: false,
    resume: false,
    spotify: false,
    cli: false,
  });
  return (
    <main>
      <Navbar />
      <Dock setWindowState={setWindowState} />
      {windowState.github && <GithubWindow windowName="github" setWindowState={setWindowState} />}
      {windowState.notes && <Notes windowName="notes" setWindowState={setWindowState} />}
      {windowState.resume && <Resume windowName="resume" setWindowState={setWindowState} />}
      {windowState.spotify && <Spotify windowName="spotify" setWindowState={setWindowState} />}
      {windowState.cli && <Cli windowName="cli" setWindowState={setWindowState} />}
    </main>
  )
}

export default App
