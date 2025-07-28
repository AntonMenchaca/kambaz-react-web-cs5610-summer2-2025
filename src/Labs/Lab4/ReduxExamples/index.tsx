// import { useSelector, useDispatch } from "react-redux";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";
export default function ReduxExamples() {
  return (
    <div id="wd-redux-examples">
      <h1>Redux Examples</h1>
      <br />
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}
