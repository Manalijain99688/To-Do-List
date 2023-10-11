import { useState,useRef } from "react";
import "./App.css"

function App() {

  const data=localStorage.getItem('lists') ?JSON.parse(localStorage.getItem('lists')):[];
  const [list, setList] = useState(data);
  const task = useRef("");
  const [search,setSearch]=useState("");

  function addTask() {
    localStorage.setItem('lists',JSON.stringify([...list, task.current.value]))
    setList([...list, task.current.value]); // Corrected the way to update the list state
    task.current.value="";
  }
  function update(e,i){
    const update=[...list];
    update.splice(i,1,e.target.value);
    setList(update);
    localStorage.setItem('lists',JSON.stringify(update))
  }
  function delteTask(i){
    const deleteList=[...list];
    deleteList.splice(i,1);
    setList(deleteList);
    localStorage.setItem('lists',JSON.stringify(deleteList))
  }

  return (
    <>
      <center>
         <div className="search">
          <input type="text" placeholder="Search Bar" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
         </div>

        <h1>To Do List</h1>
        <div className="heading">
          <div className="inputs">
            <input type="text" ref={task} />
            <button className="btn" onClick={addTask}>Add Task 👍</button>
          </div>
          <div className="container">
          {
            list.map((val,i)=>{
              if(val.toLowerCase().includes(search.toLowerCase())){
              return(
                <div className="list" key={i}>
            <input type="text" value={val} onChange={(e)=>{update(e,i)}}/>
            <span className="icon" onClick={()=>{delteTask(i)}}>✖</span>
          </div>
              )
            }})
          }

          </div>
        </div>
      </center>
    </>
  )
}

export default App;
