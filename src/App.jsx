import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
function App() {
  const [todos,setTodos]=useState([])

  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
  //prev yaha pr latest todos array de rha hai
  //to apan ne ek naya object bna ke starting mei rkha hai : [{/*Naya object*/},...prev]
  //we know date.now() hamesha unique rhega isliye object ki id wo set ki hai aur bacha hua parameters(todo,completed) jo hai apan ko default parameters jaisa hi rkhna hai : {id:Date.now(),...todo}

  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
  }
  //map ek loop method hai
  //prevTodo matlab prev array ka har ek todo
  //agar prevTodo ki id apne id se match ho gyi to apna naya wala todo update kro wrna purana wala prevTodo rhne do


  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id!=id))
  }
  //filter method hota hai basically filter krne ke liye 
  //isme naya prev bnega jo condition follow krega
  //yaha pe condition hai ki agar prevTodo item ki id apan ne di hui id se match nhi hoti to usko prev mei rkho wrna mat rkho

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? {...prevTodo,completed:!prevTodo.completed} :prevTodo)))
  }



  // ***LOCAL STORAGE*** //

  //reload krte hi jo pehle se kuch default todos dikhane ho
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    //todo mei kuch hoga tbhi setTodos krenge
    if(todos && todos.length>0){
      setTodos(todos);
    }
  },[])

  //setItem mei key-value pair dene pdte hai
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])



  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#1c2f4b] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 
                <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo)=>(
                  <div key={todo.id}
                  className='w-full'>
                    <TodoItem todo={todo}/>
                  </div>
                ))}
            </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
