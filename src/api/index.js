import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

//custom fetch common function
const customFetch = async (url, { body, ...customConfig }) => {

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data) {
      return {
        data: data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
      console.error('error',error);
      return {
        message: "error.message",
        success: false,
      };
  }
};



//get todolist using api
export const getTodoList = () => {
  return customFetch(API_URLS.defaultTodo(), {
    method: 'GET',
  });
};

//add todoitem using api
export const addApiUrl = (newTodo) => {
  return customFetch(API_URLS.defaultTodo(), {
    method: 'POST',
    body: newTodo,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
};

//delete todoitem using api
export const deleteApiUrl = (itemId) => {
  return customFetch(API_URLS.defaultTodo(), {
    method: 'DELETE',
    body: itemId,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
};

//edit todoitem using api
export const editApiUrl = (id) => {
  return customFetch(API_URLS.editTodoApi(id), {
    method: 'PUT',
    //body: newTodo,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });
};
