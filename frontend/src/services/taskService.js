const API_URL = 'http://localhost:3500/api/tasks'; // Server API URL


const token = localStorage.getItem("token");

export const getTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ description: task }),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const updateTask = async (id, updatedField) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: token,
       },
      body: JSON.stringify(updatedField),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};