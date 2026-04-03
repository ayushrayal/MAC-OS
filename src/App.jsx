import "./App.scss";
import Dock from "./components/DockWorks/Dock";
import Navbar from "./components/Navbar/Navbar";
import GithubWindow from "./components/windows/githubWindow/GithubWindow";
import MacWindows from "./components/windows/MacWindows";
import Notes from "./components/windows/NoteCode/Notes";

const App = () => {
  return (
    <main>
      <Navbar />
      <Dock />
      <GithubWindow/>
      <Notes/>
    </main>
  )
}

export default App
