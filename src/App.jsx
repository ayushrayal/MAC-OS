import "./App.scss";
import Dock from "./components/DockWorks/Dock";
import Navbar from "./components/Navbar/Navbar";
import MacWindows from "./components/windows/MacWindows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Dock />
      <MacWindows><h1>ayush rayal -ysh</h1></MacWindows>
    </main>
  )
}

export default App
