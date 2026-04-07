import "./App.scss";
import useOSStore from "./store/useOSStore";
import Dock from "./components/DockWorks/Dock";
import Navbar from "./components/Navbar/Navbar";
import Cli from "./components/windows/Cli/Cli";
import GithubWindow from "./components/windows/githubWindow/GithubWindow";
import Notes from "./components/windows/NoteCode/Notes";
import Resume from "./components/windows/Resume/Resume";
import Spotify from "./components/windows/Spotify/Spotify";
import BootScreen from "./components/BootScreen/BootScreen";

const App = () => {
  const { windows } = useOSStore();

  return (
    <main>
      <BootScreen />
      
      <Navbar />
      <Dock />

      {/* Render windows continuously to keep them in memory, or unmount if closed. We will unmount closed to match previous behavior but store saves the state */}
      {windows.github.isOpen && <GithubWindow windowName="github" />}
      {windows.notes.isOpen && <Notes windowName="notes" />}
      {windows.resume.isOpen && <Resume windowName="resume" />}
      {windows.spotify.isOpen && <Spotify windowName="spotify" />}
      {windows.cli.isOpen && <Cli windowName="cli" />}
    </main>
  );
};

export default App;
