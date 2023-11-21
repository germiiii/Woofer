import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asincrónica para obtener la información del usuario
export const fetchUserDetails = createAsyncThunk(
    'userDetail/fetchUserDetails',
    async (userId) => { // Agregar userId como parámetro
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`); // Usar el userId en la URL
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data; 
      } catch (error) {
        throw new Error('Error fetching user details: ' + error.message);
      }
    }
  );
  

const initialState = {
  user: {
    name: "",
    lastName: "",
    email: "",
    address: "",
    image: "",
    rating: "",
    reviews: "",
    dog_count: "",
    dog_capacity: "",
  }
};

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUserDetails: (state, action) => {
        state.user = action.payload;
    }
  }
});

export const { updateUserDetails, setUserDetails } = userDetailSlice.actions;
export const selectUserDetails = (state) => state.userDetail.user;

export default userDetailSlice.reducer;
