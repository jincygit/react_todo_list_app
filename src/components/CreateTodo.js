import { useState } from 'react';
import { Toaster,toast } from 'react-hot-toast';
import styles from '../styles/home.module.css';

const CreatePost = ({
                      titleInputValue, 
                      setTitleInputValue, 
                      completedStatusValue,
                      setCompletedStatusValue,
                      handleAddTodo,
                      addingTodo,
                      setAddingTodo
                    }) => {
  
  return (
    <div>
      <div className={styles.createPost}>
        <div className={styles.createpost_header}>Add List</div>
          {/* todo title */}
          <textarea
            placeholder='EnterTodo list title'
            className={styles.addPost}
            value={titleInputValue}
            onChange={(e) => setTitleInputValue(e.target.value)}
            required
          />
          {/* todo completed status */}
          <select name="positions" id="positions"
                  value={completedStatusValue} 
                  onChange={(e) => setCompletedStatusValue(e.target.value)}
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>

          <div>
            {/* if input is not present, then restrict button click  */}
            <button
              className={styles.addPostBtn}
              onClick={titleInputValue===""?null:handleAddTodo}
              disabled={addingTodo}
            >
              {/* adding button text changes on loading period */}
              {addingTodo ? 'Adding list...' : 'Add list'}
            </button>
          </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreatePost;
