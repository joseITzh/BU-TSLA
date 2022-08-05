import axios from "axios";
import { useState, useEffect, useContext, useMemo} from "react";
import { ReadContext } from "../../Contexts/ReadContext";
import { useNavigate, Navigate } from "react-router-dom";

function Read() {

const [tickets, setTicket] = useState();

 // Destructure the variables we get from the ReadContext. 
 const {setId} = useContext(ReadContext);

 const {setProblemType} = useContext(ReadContext);

 const {setProblemDescription} = useContext(ReadContext);

 const {setStepsToReproduce} = useContext(ReadContext);
 
 const {setExpectedBehviour} = useContext(ReadContext);
 
 const {setResultedBehaviour} = useContext(ReadContext);
 
 const {setPriority} = useContext(ReadContext);
  
  const [editButton, setEditButton] = useState(false);
  const navigate = useNavigate ();

  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";

  const [msgDeleted, setMsgDeleted] = useState("Ticket successfully deleted");

  //const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  
  // Get request.
  useEffect(() => { // This hook allows you to perform side effects such as fetching data. Runs on every render.
    axios.get(baseURL).then((response) => {
      setTicket(response.data); // Using the .data property, we obtain the response data.
    }
    );
  }, []);

  if (!tickets) return null;

const setData = (id, problemType, problemDescription, stepsToReproduce, expectedBehaviour, resultedBehaviour, priority) => 
{ return (
    setId(id),
    setProblemType(problemType),
    setProblemDescription(problemDescription),
    setStepsToReproduce(stepsToReproduce),
    setExpectedBehviour(expectedBehaviour),
    setResultedBehaviour(resultedBehaviour),
    setPriority(priority),
    setEditButton(true)
  )  
  }

if (editButton) {
    return <Navigate replace to ="/update" />
}
 
// Delete request.
const deleteTicket = (id) => { //Set ID to local storage.
  axios.delete(`${baseURL}/${id}`)
    .then((response) => {
      console.log(msgDeleted);
      // This is necessary so that the page rerenders.
      setTicket(tickets.filter((products) => {
        return tickets.id !== id;
      }))
    })
    .catch(() => {
      setMsgDeleted("Error");
      console.log(msgDeleted)
    })
    
};

return (
    <div>
    <table>
    <thead>
      <tr>
        <th><button type="button">ID</button></th>
        <th><button type="button">Title</button></th>
        <th><button type="button">Description</button></th>
        <th><button type="button">Steps To Reproduce</button></th>
        <th><button type="button">Expected Behaviour</button></th>
        <th><button type="button">Resulted Behaviour</button></th>
        <th><button type="button">Uploaded File</button></th>
        <th><button type="button">Priority</button></th>
        <th><button type="button">Created By</button></th>
        <th><button type="button">Created On</button></th>
        <th><button type="button">Updated On</button></th>
        <th><button type="button">Times Reported</button></th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((item, key) => (
        <tr key={item.id}> 
          <td>{item.id}</td>
          <td>{item.problemType}</td>
          <td>{item.problemDescription}</td>
          <td>{item.stepsToReproduce}</td>
          <td>{item.expectedBehaviour}</td>
          <td>{item.resultedBehaviour}</td>
          <td>{item.uploadedFile}</td>
          <td>{item.priority}</td>
          <td>{item.createdBy}</td>
          <td>{item.createdOn}</td>
          <td>{item.updatedOn}</td>
          <td>{item.tm}</td>
          <td><button className="deleteTicketbutton" onClick={() => deleteTicket(item.id)}>Delete</button>
          <button className="deleteTicketbutton" onClick={() => setData(item.id, item.problemType, item.problemDescription, item.stepsToReproduce, item.expectedBehaviour, item.resultedBehaviour, item.priority)}>Edit</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button className="createTicketbutton" onClick={() => navigate("/create")}>Create new ticket</button>
  </div>
);
}
export default Read;
