import axios from "axios";
import { useState} from "react";
import { Navigate} from 'react-router-dom'

function Create() {

  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";

  const [msgAdded, setMsgAdded] = useState("Ticket successfully added");
  const [createButton, setCreateButton] = useState(false);


  //const datetime = format(new Date(), 'MMMM dd, yyyy pp');

  const [problemType, setProblemType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [expectedBehaviour, setExpectedBehviour] = useState("");
  const [resultedBehaviour, setResultedBehaviour] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [priority, setPriority] = useState("");
  
  const handlerSetProblemType = (event) => {
      setProblemType(event.target.value);
    };
    const handlerSetProblemDescription = (event) => {
      setProblemDescription(event.target.value);
    };
    const handlerSetStepsToReproduce = (event) => {
      setStepsToReproduce(event.target.value);
    };
    const handlerSetExpectedBehviour = (event) => {
      setExpectedBehviour(event.target.value);
    };
    const handlerSetResultedBehaviour = (event) => {
      setResultedBehaviour(event.target.value);
    };
    const handlerSetUploadedFile = (event) => {
      setUploadedFile(event.target.value);
    };
    const handlerSetPriority = (event) => {
      setPriority(event.target.value);
    };


  // Post request.
  const addTicket = () => {
    axios
      .post(baseURL, { // The POST request takes two arguments, the url and the data we need to post.
        problemType: problemType,
        problemDescription: problemDescription,
        stepsToReproduce: stepsToReproduce,
        expectedBehaviour: expectedBehaviour,
        resultedBehaviour: resultedBehaviour,
        uploadedFile: uploadedFile,
        priority: priority,
      })
      // At final we chain it with then() method and catch() method.
      .then((response) => { // The then method is invoked when a post request is succesful.
        setCreateButton(true)
        console.log(msgAdded)
      })
      .catch(() => { // The catch method is invoked when a post request is failed and an error has ocured.
      setMsgAdded("Error")
      console.log(msgAdded)
      });
  };

// Redirects to page "read".  
if (createButton) {
  return <Navigate replace to ="/" />
}

// Form handler.
const handleSubmit = (event) => {
  event.preventDefault();
};

  return (
    <div>
     <div className="container">
      <form className="form" onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>
          <div className="form_divs">
            <select
              value={problemType}
              name="problem-types"
              onChange={handlerSetProblemType}
            >
              <option value="">Problem Type:</option>
              <option value="Login Error">Login error</option>
              <option value="Tag Error">Tag error</option>
              <option value="Click Error">Can't click on option</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form_divs">
            <input type="text" placeholder="Problem title:"></input>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Problem description:"
              value={problemDescription}
              maxLength="400"
              onChange={handlerSetProblemDescription}
            ></textarea>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Steps to reproduce:"
              type="text"
              value={stepsToReproduce}
              onChange={handlerSetStepsToReproduce}
            ></textarea>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Expected behaviour:"
              value={expectedBehaviour}
              onChange={handlerSetExpectedBehviour}
            ></textarea>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Resulted behaviour:"
              value={resultedBehaviour}
              onChange={handlerSetResultedBehaviour}
            ></textarea>
          </div>
          <div className="form_divs">
            <input
              type="file"
              value={uploadedFile}
              onChange={handlerSetUploadedFile}
              multiple
            ></input>
          </div>
          <div className="form_divs">
            <select
              name="problem-types"
              value={priority}
              onChange={handlerSetPriority}
            >
              <option value="">Ticket priority </option>
              <option value="URGENT">URGENT</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            <button className="addTicketbutton" type="submit" onClick={() => addTicket()}>Create Ticket</button>
          </div>
        
      </form>
    </div>
    </div>
  );
}
export default Create;