import { Container, Typography } from "@mui/material";
import AddTodo from "./AddTodo";
import DisplayTodo from "./DisplayTodo";

const Task = () => {
  return (
    <Container
      maxWidth="md"
      className="p-5 lg:bg-gray-100 rounded-md shadow-xl my-20 space-y-10 md:mx-auto "
    >
      <Typography variant="h3" align="center" className="text-3xl md:text-4xl">
        Todo App
      </Typography>

      <AddTodo />
      <DisplayTodo />
    </Container>
  );
};

export default Task;
