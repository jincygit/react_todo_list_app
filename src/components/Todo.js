//---------------------------Todo Component---------------
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../styles/home.module.css';



const Todo = ({ todo, 
                todos, 
                handleEditTodo,
                handleDeleteTodo,
                deletingTodo,
                setDeletingTodo
              }) => {
  //console.log(todos);
  const [editStatus, setEditStatus] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoId, setTodoId] = useState(todo.id);
  const [completedStatus, setCompletedStatus] = useState(todo.completed);
  
  
  // function edit a task
  const handleTodoUpdate = (todoListId) => {
    // setEditStatus(false);
    handleEditTodo(todoId,todoTitle,completedStatus);
  };

  return (
    <div>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>
                    <img className={styles.actioniconimage}
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/to-do-list-7972669-6324684.png"
                      alt="post-pic"
                    />
                  </td>
                  <td className={styles.titleTd}>
                      {/* show edit input only by clicking edit icon */}
                      {!editStatus 
                          ?<p>{todo.title}</p>:
                          <div className={styles.titletext}>
                              <input value={todoTitle} 
                              onChange={(e) => setTodoTitle(e.target.value)} />
                          </div>
                      }
                  </td>
                  <td>
                        {/* show select input for edit based on editStatus */}
                        {!editStatus 
                        ? <span className={todo.completed ? styles.completed:styles.pending}>
                            {todo.completed ? 'Completed': 'Pending'}
                          </span>
                        : <select name="positions"
                            value={completedStatus} 
                            onChange={(e) => setCompletedStatus(!completedStatus)}
                          >
                            <option value={todo.completed ? true:false}>{todo.completed ? 'Completed': 'Pending'}</option>
                            <option value={!todo.completed ? true:false}>{!todo.completed ? 'Completed': 'Pending'}</option>
                          </select>
                      }
                  </td>
                  <td>
                        {/* show edit button and update button  based on editStatus */}
                        {!editStatus 
                          ? <button 
                              className={styles.actionicon} 
                              onClick={(e) => setEditStatus(true)}>
                              <img 
                                className={styles.actioniconimage}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFx5EmaIWUIF5VpUW_y24CdKV0s3AB16_VJw&usqp=CAU"
                                alt="edit-pic"
                                
                              />
                            </button>
                        :   <button 
                              className={styles.actionicon} 
                              onClick={() => {setEditStatus(false);handleTodoUpdate(todo.id);}}>
                              <img 
                                className={styles.actioniconimage}
                                src="https://www.pngall.com/wp-content/uploads/4/Update-Button-PNG-Free-Image.png"
                                alt="update-pic" 
                                
                              />
                            </button>
                        } 
                  </td>
                  <td>
                      {/* show delete button or deleting button  based on deletingTodo value */}
                      {!deletingTodo
                        ? <button 
                            className={styles.actionicon}
                            onClick={() => {setDeletingTodo(true);handleDeleteTodo(todo.id);}}>
                            <img 
                              className={styles.actioniconimage}
                              src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/delete.png"
                              alt="delete-pic"
                            />
                          </button>
                        : <button 
                            className={styles.actionicon}
                            onClick={() => {setDeletingTodo(true);handleDeleteTodo(todo.id);}}>
                            <img 
                              className={styles.actioniconimage}
                              src="https://www.shutterstock.com/shutterstock/videos/1058485897/thumb/6.jpg?ip=x480"
                              alt="delete-pic"
                            />
                          </button>
                        }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          

         
          
        </div>
      </div>
    </div>
  );
};

// prop validation
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default Todo;
