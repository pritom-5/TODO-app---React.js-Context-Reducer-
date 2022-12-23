import { createContext, useReducer, useState } from "react";
import initialTasks from "./Data";

const listContext = createContext({
  tasks: [],
  showEdit: false,
  changeHandler: (done, id) => {},
  editHandler: (id) => {},
  changedValueFn: (value, id) => {},
  deleteHandler: (id) => {},
  addItemHandler: (inputText, id) => {},
});
export default listContext;

///////////
const ACTIONS = { CHECK: "check", EDIT: "edit", DELETE: "delete", ADD: "add" };

const reducerFn = (state, action) => {
  if (action.type === ACTIONS.CHECK) {
    const { done, id } = action.payload;

    const existingItemIndex = state.findIndex((i) => i.id === id);
    let List = [...state];
    let existingItem = { ...List[existingItemIndex], done };

    List[existingItemIndex] = existingItem;

    return List;
  }
  if (action.type === ACTIONS.EDIT) {
    const { value, id } = action.payload;
    const existingItemIndex = state.findIndex((i) => i.id === id);
    let List = [...state];
    let existingItem = { ...List[existingItemIndex], text: value };

    List[existingItemIndex] = existingItem;
    return List;
  }
  if (action.type === ACTIONS.DELETE) {
    const id = action.payload;
    let List = [...state];

    const updatedList = List.filter((item) => item.id !== id);

    return updatedList;
  }
  if (action.type === ACTIONS.ADD) {
    const { id, text } = action.payload;
    const newItem = { id, text, done: false };
    let List = [...state];

    return List.concat(newItem);
  }

  return state;
};

export function ListContextProvider(props) {
  const [listState, dispatchFn] = useReducer(reducerFn, initialTasks);
  const [showEdit, setShowEdit] = useState({ id: null });

  function changeHandler(done, id) {
    dispatchFn({ type: ACTIONS.CHECK, payload: { done, id } });
  }

  // showEdit state
  // show edit button and input field or not
  function editHandler(id) {
    setShowEdit({ id });
  }

  function changeHandler(done, id) {
    dispatchFn({ type: ACTIONS.CHECK, payload: { done, id } });
  }

  // pulled value from input field and dispatch reducer edit
  function changedValueFn(value, id) {
    setShowEdit({ id: null });

    if (value.trim().length === 0) {
      return;
    }
    ////don't need this update of state just updata reducer fn
    dispatchFn({ type: ACTIONS.EDIT, payload: { value, id } });
  }

  //remove item from list on click
  function deleteHandler(id) {
    ////////
    dispatchFn({ type: ACTIONS.DELETE, payload: id });
  }

  function addItemHandler(inputText, id) {
    dispatchFn({ type: ACTIONS.ADD, payload: { id, text: inputText } });
  }

  return (
    <listContext.Provider
      value={{
        tasks: listState,
        showEdit,
        changeHandler,
        editHandler,
        changedValueFn,
        deleteHandler,
        addItemHandler,
      }}
    >
      {props.children}
    </listContext.Provider>
  );
}
