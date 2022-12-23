import { useContext, useState } from "react";
import listContext from "./Store";

// type="delete/edit"
function Button({ text, id }) {
  const { deleteHandler, editHandler } = useContext(listContext);

  function clickHandler() {
    if (text === "edit") editHandler(id);
    if (text === "delete") deleteHandler(id);
  }

  return <button onClick={clickHandler}>{text}</button>;
}

///////////////////////
export function Input({ item, inputFn }) {
  const { id, text } = item;
  const [textState, setTextState] = useState(text);

  const submitHandler = (e) => {
    e.preventDefault();
    inputFn(textState, id);
    setTextState("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={(e) => setTextState(e.target.value)}
        value={textState}
      />
      <button type="submit" value="save">
        Save
      </button>
    </form>
  );
}

////////////////////////////////////
function ListItem({ item }) {
  const { changedValueFn, showEdit, changeHandler } = useContext(listContext);
  const { id, done, text } = item;

  return (
    <li className="listItem">
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => {
          changeHandler(e.target.checked, id);
        }}
      />
      {!!showEdit && showEdit.id === id ? (
        <Input item={item} inputFn={changedValueFn} />
      ) : (
        <p>{text}</p>
      )}

      {!showEdit.id && showEdit.id !== id && <Button id={id} text="edit" />}
      <Button id={id} text="delete" />
    </li>
  );
}
/////////////////////////////////////////
export function ListRender({ items }) {
  return (
    <ul>
      {items.map((i) => (
        <ListItem key={i.id} item={i} />
      ))}
    </ul>
  );
}
