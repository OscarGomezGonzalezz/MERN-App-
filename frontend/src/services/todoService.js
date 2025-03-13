const API_URL = 'http://localhost:3500/tasks'; // Dirección de tu API


export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
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

