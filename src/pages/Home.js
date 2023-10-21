import { useEffect, useState } from 'react';
import CreateTodo from '../components/CreateTodo';
import Loader from '../components/Loader';
import Todo from '../components/Todo';
import { getTodoList,addApiUrl,deleteApiUrl,editApiUrl } from '../api/index';
import styles from '../styles/home.module.css';
;


const Home = () => {
  //new index for todo item
  const [todoIndex, setTodoIndex] = useState(201);
  //todo list
  const [todos, setTodos] = useState([]);
  //Holds the value of the title input field
  const [titleInputValue, setTitleInputValue] = useState(''); 
  //Holds the value of the completed status select input field
  const [completedStatusValue, setCompletedStatusValue] = useState(false);
  //add list loadibg
  const [addingTodo, setAddingTodo] = useState(false);
  //delete list loading
  const [deletingTodo, setDeletingTodo] = useState(false);
  //page loader
  const [loadingStatus, setLoadingStatus] = useState(true);
  
  
  
  //detch todos from url at the page load time
  const fetchTodoList = async () => {
    try {
      //listing api call
      const response = await getTodoList();
      //check whether api response and set state
      if (response.success) {
        //setting todo list
        setTodos(response.data);
      }
      setLoadingStatus(false);
      //console.log("home api response",response);     
    } catch (error) {
      //error toast msg
      setLoadingStatus(false);     
    }
  };

  //add todo item
  const handleAddTodo = async () => {
    setAddingTodo(true);
    if (titleInputValue.trim() === '') {
      return;
    }
    //new todo item
    const newTodo = {
      userId:1,
      title: titleInputValue,
      completed: completedStatusValue
    };
  
    try {
      //api for adding todo item
      const response = await addApiUrl(newTodo);
      //adding only when api call successful
      if (response.success) {
        newTodo.id = todoIndex+1;
        //setting new todo item
        setTodos((todos) => [newTodo, ...todos]);
        setTitleInputValue('');
        setTodoIndex(todoIndex+1);
      }
      setAddingTodo(false);
    } catch (error) {
      console.log('Error adding todo:', error);
      setAddingTodo(false);
    }
  };
 
  // Delete a todo item
  const handleDeleteTodo = async (todoItemId) => {
    try {
      //api call for deleting
      const response = await deleteApiUrl(todoItemId);
      //updation only when api call successful
      if (response.success) {
        //setting tod list after filtering
        setTodos((todos) => todos.filter((todo) => todo.id !== todoItemId));
      }
      setDeletingTodo(false);
      
    } catch (error) {
      console.log('Error deleting todo:', error);
      setDeletingTodo(false);
    }
  };

  // Edit a todo item
  const handleEditTodo = async (todoListId,newTitle,completedStatus) => {    
    try {
      //edit api call
      const response = await editApiUrl(todoListId);
      //updation only when api call successful
      if (response.success) {
          //update values
          todos.map(t => {
            if (t.id === todoListId) {
              t.title=newTitle;
              t.completed=completedStatus;
            } 
          });
          setTodos(todos);
      }
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  useEffect(() => {
    // Call the fetchTodoList function for setting todo list
    fetchTodoList(); 
  }, []);

  //page loader for initial loading
  if (loadingStatus) {
    return <Loader />;
  }

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
            key = {todo.id} 
            todos = {todos} 
            handleEditTodo = {handleEditTodo}  
            handleDeleteTodo = {handleDeleteTodo}   
            deletingTodo = {deletingTodo} 
            setDeletingTodo = {setDeletingTodo}     
          />
        ))}
        
      </div>
    </div>
  );
};

export default Home;
