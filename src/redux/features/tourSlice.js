import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as API from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await API.getTours(page);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.getTour(id);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getToursUser = createAsyncThunk(
  "tour/getToursUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.getToursByUser(id);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.deleteTour(id);
      toast.success("Tour deleted successfully");
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, toast, updatedTourData, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.updateTour(updatedTourData, id);
      toast.success("Tour updated successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const searchTour = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await API.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const tagTours = createAsyncThunk(
  "tour/tagTours",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await API.getToursByTag(tag);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedTours = createAsyncThunk(
  "tour/relatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await API.getRelatedTours(tags);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.likeTour(id);
      return response.data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tours: [],
    tour: {},
    userTours: [],
    relatedTours: [],
    numberOfPages: null,
    currentPage: 1,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours.push(action.payload);
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getTours.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(getTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })
      .addCase(getTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.tours = state.tours.filter((tour) => tour._id !== id);
        }
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.tours = state.tours.map((tour) =>
            tour._id === id ? action.payload : tour
          );
        }
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(searchTour.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(searchTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(tagTours.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(tagTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(tagTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getRelatedTours.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRelatedTours.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedTours = action.payload;
      })
      .addCase(getRelatedTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(likeTour.pending, (state, action) => {})
      .addCase(likeTour.fulfilled, (state, action) => {
        const { arg: id } = action.meta;
        if (id) {
          state.tours = state.tours.map((tour) =>
            tour._id === id ? action.payload : tour
          );
        }
      })
      .addCase(likeTour.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(getToursUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getToursUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userTours = action.payload;
      })
      .addCase(getToursUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const tours = createSelector(
  (state) => state.tour,
  (tours) => tours
);

export const getToursSlice = createSelector(tours, (tours) => tours);

export const getTourById = createSelector(
  [tours, (state, tourId) => tourId, (state) => state.tour.loading],
  (tours, tourId, loading) => {
    return { tours: tours.tours.find((tour) => tour._id === tourId), loading };
  }
);

// export const getToursByUser = createSelector(
//   [tours, (state, userId) => userId, (state) => state.tour.loading],
//   (tours, userId, loading) => {
//     return {
//       tours: tours.tours?.filter((tour) => tour.creator === userId),
//       loading,
//     };
//   }
// );

export const getToursByUser = createSelector(
  [(state) => state.tour.userTours, (state) => state.tour.loading],
  (userTours, loading) => {
    return { tours: userTours, loading };
  }
);

export const getSingleTour = createSelector(
  [
    (state) => state.tour.tour,
    (state) => state.tour.loading,
    (state) => state.tour.error,
  ],
  (tour, loading, error) => {
    return { tours: tour, loading, error };
  }
);

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
