import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { BiPlusCircle } from "react-icons/bi";

export default function AddTodo() {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");

  return (
    <div className="space-y-3 mb-5  ">
      <Typography
        variant="h4"
        className="font-sans  text-xl md:text-2xl lg:text-3xl"
      >
        Add a Todo
      </Typography>

      <TextField
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        variant="outlined"
        fullWidth
        className="bg-white shadow-md rounded-lg text-sm  lg:text-lg"
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
        color="primary"
        startIcon={<BiPlusCircle className="h-5 w-5" />}
        className="w-full"
        style={{ backgroundColor: "#3f51b5" }}
      >
        Save
      </Button>
    </div>
  );
}
