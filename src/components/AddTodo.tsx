import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";

export default function AddTodo() {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");

  return (
    <div className="space-y-3 mb-5">
      <Typography variant="h4" style={{ fontFamily: "initial" }}>
        Add a Todo
      </Typography>

      <TextField
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        variant="outlined"
        fullWidth
        className="bg-zinc-50 shadow-xl"
        placeholder="Tomorrow I have to push this code on Github!"
      />
      <Button
        onClick={() => {
          dispatch({
            type: "todos/add",
            payload: {
              text: todo,
            },
          });
          setTodo("");
        }}
        disabled={todo.length < 2}
        variant="contained"
        color="success"
        startIcon={<BiPlusCircle className="h-5 w-5" />}
        sx={{
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        Save
      </Button>
    </div>
  );
}
