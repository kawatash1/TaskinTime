
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const API_URL= `${backendUrl}/api/tasks`


// Fetch all tasks
export const fetchAllTasks = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Fetch tasks by category
export const fetchTasksByCategory = async (category) => {
    const response = await fetch(`${API_URL}/category/${category}`);
    return response.json();
};

// Fetch tasks by id
export const fetchTaskById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  };


// Add a new task
export const addTask = async (task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    return response.json();
};

// Update a task
export const updateTask = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    return response.json();
};

// Delete a task
export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return response.json();
};