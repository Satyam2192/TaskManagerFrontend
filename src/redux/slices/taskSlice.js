import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await fetch('/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(errorText);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch Tasks Error:', error.message); 
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData, thunkAPI) => {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return taskId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [], // Ensure items is initialized as an empty array
    status: 'idle', // Initial status is idle
    error: null, // Initialize error as null
  },
  reducers: {
    clearError(state) {
      state.error = null; // Clear any error message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'; // Set status to loading when fetching
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when fetching is successful
        state.items = action.payload; // Populate the items with the fetched data
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if the fetching fails
        state.error = action.payload; // Set error with the message
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload); 
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]; 
      })

  },
});

export const { clearError } = taskSlice.actions;

export default taskSlice.reducer;
