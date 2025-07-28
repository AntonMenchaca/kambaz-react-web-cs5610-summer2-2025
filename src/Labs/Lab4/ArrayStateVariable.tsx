import { useState } from "react";
import { Button } from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((_item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button variant="success" onClick={addElement}>Add Element</Button>
      <ul id='wd-list-group-lab4-array-state'>
        {array.map((item, index) => (
          <li key={index}> {item}
            <Button variant="danger" onClick={() => deleteElement(index)}>
              Delete</Button>
          </li>))}
      </ul><hr /></div>);
}