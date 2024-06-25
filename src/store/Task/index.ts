import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import url from "../../json/config";
const api = `${process.env.REACT_APP_API_TASK}/available`;
const api_completeTask = process.env.REACT_APP_API_TASK;

const token = window.localStorage.getItem('token');
const config = { headers: { Authorization: `bearer ${token}` } };
const task_status = localStorage.getItem('task_status');

export const getTask = createAsyncThunk(
  'task/getTask',
  async ({ page, types = null }: { page: number; types?: string | null }) => {
    // console.log(types)
    const res = await axios.get(
      `${api}/tasks?page=${page}&size=9&type=${types}&publish=${task_status === 'true' ? 0 : 1}`,
      config
    );
    window.localStorage.setItem('taskPageNumber', String(page));
    return res.data.data;
  }
);
export const getTaskWebsite = createAsyncThunk(
  'task/getTaskWebsite',
  async ({ page, types = 'website_click' }: { page: number; types?: string }) => {
    // console.log(types)
    const res = await axios.get(
      `${api}/tasks?page=${page}&size=9&type=${types}&publish=${task_status === 'true' ? 0 : 1}`,
      config
    );
    window.localStorage.setItem('taskPageNumber', String(page));
    return res.data.data;
  }
);
export const getTaskGoogle = createAsyncThunk(
  'task/getTaskGoogle',
  async ({ page, types = 'google_search' }: { page: number; types?: string }) => {
    // console.log(types)
    const res = await axios.get(
      `${api}/tasks?page=${page}&size=9&type=${types}&publish=${task_status === 'true' ? 0 : 1}`,
      config
    );
    window.localStorage.setItem('taskPageNumber', String(page));
    return res.data.data;
  }
);
export const getTaskJourney = createAsyncThunk(
  'task/getTaskJourney',
  async ({ page, types = 'journey' }: { page: number; types?: string }) => {
    // console.log(types)
    const res = await axios.get(
      `${api}/tasks?page=${page}&size=9&type=${types}&publish=${task_status === 'true' ? 0 : 1}`,
      config
    );
    window.localStorage.setItem('taskPageNumber', String(page));
    return res.data.data;
  }
);
export const getTaskSearchJourney = createAsyncThunk(
  'task/getTaskSearchJourney',
  async ({ page, types = 'search_journey' }: { page: number; types?: string }) => {
    // console.log(types)
    const res = await axios.get(
      `${api}/tasks?page=${page}&size=9&type=${types}&publish=${task_status === 'true' ? 0 : 1}`,
      config
    );
    window.localStorage.setItem('taskPageNumber', String(page));
    return res.data.data;
  }
);

export const taskCompleted = createAsyncThunk('task/complete', async (task) => {
  try {
    const { data } = await axios.post(`${api_completeTask}/complete/task`, task, config);
    return data;
  } catch (err) {
    return {};
  }
});

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    data: [],
    website_click: [],
    google_search: [],
    journey: [],
    search_journey: [],
    showCounter: false,
    timerCounter: 0,
    isCopy: false,
    setIsCopy: false,
    getTaskLoading: false,
    getTaskWebsiteLoading: false,
    getTaskGoogleLoading: false,
    getTaskJourneyLoading: false,
    getTaskSearchJourneyLoading: false,
    completeTaskLoading: false,
  },
  reducers: {
    setshowCounter: (state, action) => {
      state.showCounter = action.payload;
    },

    setIsCopy: (state, action) => {
      state.isCopy = action.payload;
    },

    setTimerCounter: (state, action) => {
      state.timerCounter = action.payload;
    },

    failedTask: (_, action) => {
      axios
        .post(`${api_completeTask}/complete/task`, action.payload, config)
        .then(() => {
          setTimeout(() => {
            // window.location.href = "/dashboard/task"
          }, 2000);
        })
        .catch(() => {
          window.location.href = '/dashboard/task';
        });
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTask.pending, (state) => {
      state.getTaskLoading = true;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      state.data = action.payload;
      state.getTaskLoading = false;
    });
    builder.addCase(getTaskWebsite.pending, (state) => {
      state.getTaskWebsiteLoading = true;
    });
    builder.addCase(getTaskWebsite.fulfilled, (state, action) => {
      state.website_click = action.payload;
      state.getTaskWebsiteLoading = false;
    });
    builder.addCase(getTaskGoogle.pending, (state) => {
      state.getTaskGoogleLoading = true;
    });
    builder.addCase(getTaskGoogle.fulfilled, (state, action) => {
      state.google_search = action.payload;
      state.getTaskGoogleLoading = false;
    });
    builder.addCase(getTaskJourney.pending, (state) => {
      state.getTaskJourneyLoading = true;
    });
    builder.addCase(getTaskJourney.fulfilled, (state, action) => {
      state.journey = action.payload;
      state.getTaskJourneyLoading = false;
    });
    builder.addCase(getTaskSearchJourney.pending, (state) => {
      state.getTaskSearchJourneyLoading = true;
    });
    builder.addCase(getTaskSearchJourney.fulfilled, (state, action) => {
      state.search_journey = action.payload;
      state.getTaskSearchJourneyLoading = false;
    });
    builder.addCase(taskCompleted.pending, (state) => {
      state.completeTaskLoading = true;
    });
    builder.addCase(taskCompleted.fulfilled, (state) => {
      state.completeTaskLoading = false;
      // console.log(action.payload, "++++++++++++++++++++++++++++");
    });
  },
});

// export const {  } = taskSlice.actions;
export default taskSlice.reducer;
