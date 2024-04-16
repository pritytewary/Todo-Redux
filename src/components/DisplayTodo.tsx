import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Todo, TodoState } from "../store";
import { BiPencil, BiTrash } from "react-icons/bi";

export default function DisplayTodo() {
  const todos = useSelector((state: TodoState) => state.todos);

  const [showFinished, setShowFinished] = useState(true);

  const todosToShow = useMemo(() => {
    const t = showFinished ? todos : todos.filter((todo) => !todo.isCompleted);

    return t;
  }, [todos, showFinished]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Typography variant="h4">Your Todos</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={showFinished}
              onChange={(e) => {
                setShowFinished(e.target.checked);
              }}
              color="primary"
            />
          }
          label="Show Finished"
        />
      </div>

      <div>
        {todos.length === 0 && <Typography>No todos yet</Typography>}

        {todosToShow.map((todo, i) => (
          <TodoItem todo={todo} key={todo.id} index={i} />
        ))}
      </div>
    </div>
  );
}

function TodoItem({ todo }: { todo: Todo; index: number }) {
  const dispatch = useDispatch();

  const [isUpdating, setisUpdating] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.text);

  return (
    <Box
      key={todo.id}
      className="flex flex-col md:flex-row justify-between items-center my-1 p-1 rounded-md bg-white gap-4"
    >
      <div className="flex items-center gap-2 md:w-full lg:w-2/3">
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => {
            dispatch({
              type: "todos/update",
              payload: {
                id: todo.id,
                updated: {
                  isCompleted: !todo.isCompleted,
                  completedAt: todo.isCompleted ? null : new Date().getTime(),
                },
              } as Partial<Todo>,
            });
          }}
        />

        {isUpdating ? (
          <>
            <TextField
              variant="outlined"
              size="small"
              onChange={(e) => {
                setUpdatedText(e.target.value);
              }}
              value={updatedText}
              className="w-full"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setisUpdating(false);

                dispatch({
                  type: "todos/update",
                  payload: {
                    id: todo.id,
                    updated: {
                      text: updatedText,
                    },
                  } as Partial<Todo>,
                });
              }}
            >
              Update
            </Button>
          </>
        ) : (
          <>
            <Typography
              sx={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                color: todo.isCompleted ? "gray" : "black",
              }}
              className="w-full"
            >
              {todo.text}
            </Typography>

            <Button
              color="primary"
              onClick={() => {
                setisUpdating(true);
              }}
            >
              <BiPencil className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      <div className="flex justify-center md:justify-end">
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            dispatch({
              type: "todos/delete",
              payload: {
                id: todo.id,
              },
            });
          }}
        >
          <BiTrash className="w-5 h-5" />
        </Button>
      </div>
    </Box>
  );
}
