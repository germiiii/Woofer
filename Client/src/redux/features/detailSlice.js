import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserDetails = createAsyncThunk(
    "fetUserDetails",
    async (userId) => {
        try {
          const userData = await axios.get(`http://localhost:3001//user/${userId}`);
          return userData;
        } catch (error) {
          throw new EvalError("Error fetcing user details: "+ error.message);      
        };
    }
)



const initialState = {
    user: {

        name: "esteban",
        lastname: "Scalerandi",
        email: "ejemplo@gmail.com",
        address: "porr ahí",
        userName: "teten",
        image: "chan",
        rating: "",
        reviews: "",
        dog_count: "",
        dog_capacity: "",
    }
};

export const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        setUserDetails: (state, action) =>{
        const {name, lastname, email, address, image, rating, reviews, dog_count, dog_capacity} = action.payload;
        state.user = {
            name,
            lastname,
            email,
            address,
            image,
            rating,
            reviews,
            dog_count,
            dog_capacity
        };
        console.log("New state after setUserDetails:", state.user);
    },
    },
});

export const { setUserDetails } = userDetailSlice.actions;
export const  selectUserDetail = (state) => state.userDetail.user;

export default userDetailSlice.reducer;