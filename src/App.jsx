import "./App.scss";
import Dock from "./components/DockWorks/Dock";
import Navbar from "./components/Navbar/Navbar";
import GithubWindow from "./components/windows/githubWindow/GithubWindow";
import MacWindows from "./components/windows/MacWindows";
import Notes from "./components/windows/NoteCode/Notes";
import Resume from "./components/windows/Resume/Resume";
import Spotify from "./components/windows/Spotify/Spotify";

const App = () => {
  return (
    <main>
      <Navbar />
      <Dock />
      <GithubWindow/>
      <Notes/>
      <Resume/>
      <Spotify/>
    </main>
  )
}

export default App
