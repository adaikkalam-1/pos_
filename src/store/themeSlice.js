import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    activeMenu: window.sessionStorage.getItem('activeMenu') ? JSON.parse(window.sessionStorage.getItem('activeMenu')) : '/',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
            window.sessionStorage.setItem('activeMenu', JSON.stringify(action.payload));
        },
    },
});

export const { setActiveMenu } = themeSlice.actions;

export default themeSlice.reducer;