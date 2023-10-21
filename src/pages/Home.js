import { useEffect, useState } from 'react';
import { Toaster,toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import Comment from '../components/Comment';
// import FriendsList from '../components/FriendsList';
import CreateTodo from '../components/CreateTodo';
import Todo from '../components/Todo';
import { getTodoList,addApiUrl,deleteApiUrl } from '../api/index';
import styles from '../styles/home.module.css';
;


const Home = () => {
  //const todoIndexStarting = 201;
  const [todoIndex, setTodoIndex] = useState(201);
  const [todos, setTodos] = useState([]);
  const [titleInputValue, setTitleInputValue] = useState(''); // Holds the value of the input field
  const [completedStatusValue, setCompletedStatusValue] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);
  const [deletingTodo, setDeletingTodo] = useState(false);



  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  
  const [filter, setFilter] = useState('all'); // Holds the current filter type
  const [loadingStatus, setLoadingStatus] = useState(true); // Indicates whether the data is being loaded
  const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited

  //console.log("todos  --",todos);
  // console.log("addingTodo  --",addingTodo);
  // console.log("titleInputValue  --",titleInputValue);
  
  //detch todos from url at the page load time
  const fetchTodoList = async () => {
    try {
      const response = await getTodoList();

      //check whether api response and set state
      if (response.success) {
        setTodos(response.data);
      }
      setLoadingStatus(false);
      console.log("home api response",response); 
      
    } catch (error) {
      //error toast msg
      setLoadingStatus(false);
      
    }
  };

  

  const handleAddTodo = async () => {
    
    setAddingTodo(true);
    if (titleInputValue.trim() === '') {
      return;
    }

    const newTodo = {
      userId:1,
      title: titleInputValue,
      completed: completedStatusValue
    };
    

    try {
      //api for adding todo item
      const response = await addApiUrl(newTodo);


      
      // const responsez = await fetch('https://jsonplaceholder.typicode.com/todos', {
      //   method: 'POST',
      //   body: JSON.stringify(newTodo),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // });
      //const addedTodo = await response.json();
      console.log("added api res..", response)
      newTodo.id = todoIndex+1;
      setTodos((todos) => [newTodo, ...todos]);
      setTitleInputValue('');
      setTodoIndex(todoIndex+1);
      setAddingTodo(false);
    } catch (error) {
      console.log('Error adding todo:', error);
      setAddingTodo(false);
    }
  };

  // Handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };


 
  // Delete a todo item
  const handleDeleteTodo = async (todoItemId) => {
    try {
      //api call for deleting
      const response = await deleteApiUrl(todoItemId);
      console.log("delete api res..", response,"  ",todoItemId);
      if (response.success) {
        //setting tod list after filtering
        setTodos((todos) => todos.filter((todo) => todo.id !== todoItemId));
      }
      setDeletingTodo(false);
      
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };



  // Edit a task
  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTitleInputValue(taskToEdit.title);
  };

  // Update a task
  const handleUpdateTask = async () => {
    if (titleInputValue.trim() === '') {
      return;
    }

    const updatedTask = {
      title: titleInputValue,
      completed: false
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${editTaskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const updatedTaskData = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...task, title: updatedTaskData.title } : task
        )
      );
      setTitleInputValue('');
      setEditTaskId(null);
      toast.success('Task updated successfully');
    } catch (error) {
      console.log('Error updating task:', error);
      toast.error('Error updating task');
    }
  };



  // Edit a todolist
  const handleEditTodo = async (todoListId,newTitle,completedStatus) => {
    //checking values
    console.log("todoListId  ", todoListId, "  todoTitle ", newTitle, "completedStatus ", completedStatus);
    const updatedTask = {
      title: titleInputValue,
      completed: false
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      console.log("delete api res..", response,"  ",todoListId);
      const updatedTaskData = await response.json();
      //update values
      todos.map(t => {
        if (t.id === todoListId) {
          t.title=newTitle;
          t.completed=completedStatus;
        } 
      });
      setTodos(todos);
    } catch (error) {
      console.log('Error updating task:', error);
    }

    // //update values
    // todos.map(t => {
    //   if (t.id === todoListId) {
    //     t.title=newTitle;
    //     t.completed=completedStatus;
    //   } 
    // });
    // setTodos(todos);
    

  };

  useEffect(() => {
    fetchTodoList(); // Call the fetchTodoList function here
  }, []);

  // if (posts.loading) {
  //   return <Loader />;
  // }

  return (
    
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreateTodo 
            handleAddTodo={handleAddTodo}
            titleInputValue = {titleInputValue} 
            setTitleInputValue ={setTitleInputValue}
            completedStatusValue ={completedStatusValue}
            setCompletedStatusValue ={setCompletedStatusValue}
            addingTodo ={addingTodo}
            setAddingTodo ={setAddingTodo}
        />
        <div  className={styles.createpost_header + ' ' + styles.todolistheader}>Todo List</div>
        {todos.map((todo) => (
          <Todo 
            todo = {todo} 
            // key = {`todo-${todo.id}`} 
            key = {todo.id} 
            todos = {todos} 
            handleEditTodo = {handleEditTodo}  
            handleDeleteTodo = {handleDeleteTodo}   
            deletingTodo = {deletingTodo} 
            setDeletingTodo = {setDeletingTodo}     
          />
        ))}
        
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
