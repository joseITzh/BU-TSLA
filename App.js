import './App.css';
import Create from './components/create/Create';
import Read from './components/read/Read';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Update from './components/update/Update';
import './Form.css';
import './Table.css';
import {ReadContext} from "./Contexts/ReadContext"; // Use as a wrapper between the components.
// Pass a value(object) that will contain all the states that we want to share.
import {useState} from 'react';



function App() {


  const [id, setId] = useState("null");
  const [problemType, setProblemType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [expectedBehaviour, setExpectedBehviour] = useState("");
  const [resultedBehaviour, setResultedBehaviour] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [priority, setPriority] = useState("");

  return (
    
    <Router>
      <Routes>
          <Route exact path='/' element={ <ReadContext.Provider value={{id, setId, problemType, setProblemType, problemDescription, setProblemDescription, stepsToReproduce, setStepsToReproduce, expectedBehaviour, setExpectedBehviour, resultedBehaviour, setResultedBehaviour, uploadedFile, setUploadedFile, priority, setPriority}}><Read /></ReadContext.Provider>} />
          <Route exact path='/create' element={<Create />} />
          <Route path='/update' element={<ReadContext.Provider value={{id, setId, problemType, setProblemType, problemDescription, setProblemDescription, stepsToReproduce, setStepsToReproduce, expectedBehaviour, setExpectedBehviour, resultedBehaviour, setResultedBehaviour, uploadedFile, setUploadedFile, priority, setPriority}}><Update /></ReadContext.Provider>} />
      </Routes>    
    </Router>
  );
}

export default App;
