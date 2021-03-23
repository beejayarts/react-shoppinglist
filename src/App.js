import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  // const [loggedIn, setloggedIn] = useState(false)
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: true,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, 'danger', 'oga enter value')
    } else if (name && isEditing) {
      //deal with edit
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg})
  }

  //clearing the entire list
  const clearList =()=>{
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  //removing individual items
  const removeItem = (id) =>{
      showAlert(true, 'danger', 'item removed' );
      setList(list.filter((item)=> item.id!==id))
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert ={showAlert} />}
        <h3>Shopping list</h3>
        <div className="form-control">
          <input
            type="text"
            value={name}
            className="grocery"
            placeholder="e.g Okporoko"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>Clear items</button>
        </div>
      )}
    </section>
  );
  // return(
  //   <div>
  //     <h1>Food app</h1>
  //     <button onClick={()=>setloggedIn(!loggedIn)}>{loggedIn? 'Log out' :'Log in' }</button>
  //     {loggedIn? (
  //       <h3>Hello Beejay</h3>
  //     ) : (
  //       <h3>Kindly log in</h3>
  //     )}
  //   </div>
  // )
}

export default App;
