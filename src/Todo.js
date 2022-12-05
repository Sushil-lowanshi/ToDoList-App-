
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
// import logo from "./image/Lodo.jpg";

const getLocalItmes = () => {
  let list = localStorage.getItem('lists');
  // console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}
 
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  //////////// Add items
  const addItem = () => {
    if (!inputData) {
      alert("plzz fill data");
    }else if(inputData && !toggleSubmit ){
setItems(
  items.map( (elem) => {
if(elem.id === isEditItem){
  return { ...elem, name:inputData}
}
return elem;
  })
)
setToggleSubmit(true);

setInputData('');

setIsEditItem(null);
      }
    else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }; //thoda advance
      setItems([...items, allInputData]); //...spride operator
      setInputData("");
    }
  };
  //////////// delet items
  const deletItem = (index) => {
    // console.log(id);
    const updateditems = items.filter((elem) => {
      return index != elem.id;
    });
    setItems(updateditems);
  };
  ///////////////// Edit items

  //1 get the id and name of the data which user clicked to edit
  //2 set the toggle mode to change the submit button into edit button
  //3 now update the value of the setinput with the new updated value to edit
  //4 to pass the current element id to new state variable for reference

  const editItem = (id) => {
    const newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    // console.log(newEditItem);
   setToggleSubmit(false);

   setInputData(newEditItem.name);

   setIsEditItem(id);

  };

  //// remove all
  const removeAll = () => {
    setItems([]);
  };

// add data to localStorage
useEffect(() => {
  localStorage.setItem('lists', JSON.stringify(items))
}, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src={logo} alt="todologo" /> */}
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items... "
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deletItem(elem.id)} ////// id pass krne k lie fetarro fun lgaya
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* clear all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
