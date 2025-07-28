import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroup, Button } from "react-bootstrap";
export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item key={todo.id}>
      <div style={{ display: "flex", justifyContent: "space-between", margin: 5, gap: 5 }}>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"> Delete </Button>
        <Button onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"> Edit </Button>
      </div>
      {todo.title}

    </ListGroup.Item>
  );
}
