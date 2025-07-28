import ClickEvent from "./clickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import StringStateVariables from "./StringStateVariables";
import BooleanStateVariables from "./BooleanStateVariables";
import ArrayStateVariable from "./ArrayStateVariable";
import './index.css'
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  console.log('Hello World from Lab 4!');
  return (
    <div id="wd-lab4">
      <h3>Anton Menchaca - Lab 4</h3>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
    </div>
  );
}