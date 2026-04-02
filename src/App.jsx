import "./App.scss";
import Dock from "./components/DockWorks/Dock";
import Navbar from "./components/Navbar/Navbar";
import GithubWindow from "./components/windows/githubWindow/GithubWindow";
import MacWindows from "./components/windows/MacWindows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Dock />
      <GithubWindow/>
    </main>
  )
}

export default App
