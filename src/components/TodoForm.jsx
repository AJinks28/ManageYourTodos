import { useState } from 'react';
import {useTodo} from '../contexts/TodoContext'

function TodoForm() {
    //here todo is input text we are taking
    const [todo,setTodo]=useState("")
    //extracting addTodo from TodoContext file using useTodo()
    const {addTodo}=useTodo()

    const add = (e)=>{
        e.preventDefault();

        if(!todo) return
        //*In addtodo todo is an object
        // addTodo({id:Date.now(),todo:todo,completed:false})
        //we are already adding id:Date.now() in addTodo function and instaed of todo:todo we can write only todo
        addTodo({todo,completed:false})
        setTodo("");
        // line setTodo(""); is resetting the value of the todo state to an empty string after a new todo item has been added.
    }
    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

