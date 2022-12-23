import { useContext } from "react";
import { Input, ListRender } from "./HelperFn";
import listContext from "./Store";

export default function App() {
  const { tasks, addItemHandler } = useContext(listContext);

  const nextId = tasks.length;

  return (
    <div className="main">
      <Input inputFn={addItemHandler} item={{ id: nextId, text: "" }} />
      <ListRender items={tasks} />
    </div>
  );
}
