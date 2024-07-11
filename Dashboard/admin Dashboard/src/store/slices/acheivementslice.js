import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const acheivementSlice = createSlice({
  name: "acheivement",
  initialState: {
    loading: false,
    Acheivements: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllAcheivementsRequest(state, action) {
      state.Acheivements = [];
      state.error = null;
      state.loading = true;
    },
    getAllAcheivementsSuccess(state, action) {
      state.Acheivements = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllAcheivementsFailed(state, action) {
      state.Acheivements = state.Acheivements;
      state.error = action.payload;
      state.loading = false;
    },
    addNewAcheivementRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewAcheivementSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewAcheivementFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteAcheivementRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteAcheivementSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteAcheivementFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateAcheivementRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateAcheivementSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateAcheivementFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetAcheivementSlice(state, action) {
      state.error = null;
      state.Acheivements = state.Acheivements;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.Acheivements = state.Acheivements;
    },
  },
});

export const getAllAcheivements = () => async (dispatch) => {
  dispatch(acheivementSlice.actions.getAllAcheivementsRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/acheivement/getall",
      { withCredentials: true }
    );
    dispatch(acheivementSlice.actions.getAllAcheivementsSuccess(response.data.Acheivements));
    dispatch(acheivementSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      acheivementSlice.actions.getAllAcheivementsFailed(error.response.data.message)
    );
  }
};

export const addNewAcheivement = (data) => async (dispatch) => {
  dispatch(acheivementSlice.actions.addNewAcheivementRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/acheivement/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type":  "multipart/form-data" },
      }
    );
    console.log(response);
    console.log(response.data.message);
    dispatch(acheivementSlice.actions.addNewAcheivementSuccess(response.data.message));
    dispatch(acheivementSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(acheivementSlice.actions.addNewAcheivementFailed(error.response.data.message));
  }
};

export const updateAcheivement = (id, proficiency) => async (dispatch) => {
  dispatch(acheivementSlice.actions.updateAcheivementRequest());
  try {
    const response = await axios.put(
      `http://localhost:4000/api/v1/acheivement/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(acheivementSlice.actions.updateAcheivementSuccess(response.data.message));
    dispatch(acheivementSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(acheivementSlice.actions.updateAcheivementFailed(error.response.data.message));
  }
};

export const deleteAcheivement = (id) => async (dispatch) => {
  dispatch(acheivementSlice.actions.deleteAcheivementRequest());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/acheivement/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(acheivementSlice.actions.deleteAcheivementSuccess(response.data.message));
    dispatch(acheivementSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(acheivementSlice.actions.deleteAcheivementFailed(error.response.data.message));
  }
};

export const clearAllAcheivementErrors = () => (dispatch) => {
  dispatch(acheivementSlice.actions.clearAllErrors());
};

export const resetAcheivementSlice = () => (dispatch) => {
  dispatch(acheivementSlice.actions.resetAcheivementSlice());
};

export default acheivementSlice.reducer;