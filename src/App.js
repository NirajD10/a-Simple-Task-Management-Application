import "./App.css";
import TaskCard from "./components/TaskCard";
import TaskContextProvider from "./context/TaskContext";

function App() {
  return (
    <TaskContextProvider>
      <div className="content">
        <TaskCard />
      </div>
    </TaskContextProvider>
  );
}

export default App;
