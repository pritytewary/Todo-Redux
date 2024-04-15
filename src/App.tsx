import { store } from "./store";
import Task from "./components";
import { Provider } from "react-redux";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Task />
      </Provider>
    </>
  );
}
