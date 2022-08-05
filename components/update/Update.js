import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ReadContext } from "../../Contexts/ReadContext";

const Update = () => {

  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";

  // Destructure the variables we get from the ReadContext. 
  const {id} = useContext(ReadContext);
  const {problemType} = useContext(ReadContext);
  const {setProblemType} = useContext(ReadContext);
  const {problemDescription} = useContext(ReadContext);
  const {setProblemDescription} = useContext(ReadContext);
  const {stepsToReproduce} = useContext(ReadContext);
  const {setStepsToReproduce} = useContext(ReadContext);
  const {expectedBehaviour} = useContext(ReadContext);
  const {setExpectedBehviour} = useContext(ReadContext);
  const {resultedBehaviour} = useContext(ReadContext);
  const {setResultedBehaviour} = useContext(ReadContext);
  const {uploadedFile} = useContext(ReadContext);
  const {setUploadedFile} = useContext(ReadContext);
  const {priority} = useContext(ReadContext);
  const {setPriority} = useContext(ReadContext);

  const [updateButton, setUpdateButton] = useState(false);
  const [msgUpdated, setMsgUpdated] = useState("Ticket successfully updated");

  //const datetime = format(new Date(), 'MMMM dd, yyyy pp');

  const navigate = useNavigate();
  
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

  // Update request.
  const updateTicket = () => {
    axios
      .put(`${baseURL}/${id}`, { // The POST request takes two arguments, the url and the data we need to post.
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
        console.log(msgUpdated)
        setUpdateButton(true)
      })
      .catch(() => { // The catch method is invoked when a post request is failed and error has ocured.
      setMsgUpdated("Error")
      console.log(msgUpdated)
      });
  };


if (updateButton) {
  return <Navigate to ="/" />
}

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
            <button className="addTicketbutton" type="submit" onClick={() => updateTicket()}>Update Ticket</button>
            <button className="ticketDashboardbutton" onClick={() => navigate("/")}>View Tickets</button>
          </div>
        
      </form>
    </div>
    </div>
  );
}
export default Update;

// Retrieve data stored locally in the browser to fill form.
/** useEffect(() => {
    setID(localStorage.getItem('id'))
    setProblemType(localStorage.getItem('problemType'));
    setProblemDescription(localStorage.getItem('problemDescription'));
    setStepsToReproduce(localStorage.getItem('stepsToReproduce'));
    setExpectedBehviour(localStorage.getItem('expectedBehaviour'));    
    setResultedBehaviour(localStorage.getItem('resultedBehaviour'));
    setPriority(localStorage.getItem('priority'));
}, []) */