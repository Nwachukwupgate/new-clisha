import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { RootState } from '../store';
import { MessageType } from '../../types';
import { completeTask } from '../Rank';

// import url from "../../json/config";
const api = process.env.REACT_APP_API;
const api_task = process.env.REACT_APP_API_TASK;
const token = window.localStorage.getItem('token');
const config = { headers: { Authorization: `bearer ${token}` } };

export const getCalenderTask = createAsyncThunk('task/getCalenderTask', async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const getFirstDayOfMonth = () => new Date(year, month, 1);
  const getLastDayOfMonth = () => new Date(year, month + 1, 0);
  const startDate = moment(getFirstDayOfMonth()).format('YYYY-MM-DD');
  const endDate = moment(getLastDayOfMonth()).format('YYYY-MM-DD');
  const res = await axios.get(
    `${api_task}/calendar?start_date=${startDate}&end_date=${endDate}`,
    config
  );
  return res.data.data;
});

export const getCalenderTaskReload = createAsyncThunk('task/getCalenderTaskReload', async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const getFirstDayOfMonth = () => new Date(year, month, 1);
  const getLastDayOfMonth = () => new Date(year, month + 1, 0);
  const startDate = moment(getFirstDayOfMonth()).format('YYYY-MM-DD');
  const endDate = moment(getLastDayOfMonth()).format('YYYY-MM-DD');
  const res = await axios.get(
    `${api_task}/calendar/reload?start_date=${startDate}&end_date=${endDate}`,
    config
  );
  return res.data.data;
});

export const closeNotify = createAsyncThunk('task/closeNotify', async (id: string) => {
  const res = await axios.post(`${api}/user/messages/${id}`, null, config);
  return res.data.data;
});

export const addCalenderTask = createAsyncThunk('task/addCalenderTask', async (start_date) => {
  const month = `${start_date}-10`;
  const startDate = `${start_date}-01`;
  const endDate = moment(month).endOf('month').format('YYYY-MM-DD hh:mm');
  const res = await axios.get(
    `${api_task}/calendar?start_date=${startDate}&end_date=${endDate}`,
    config
  );
  return res.data.data;
});
export const getExperience = createAsyncThunk('task/getExperience', async () => {
  const res = await axios.get(`${api_task}/experience/points`, config);
  return res.data.data;
});

export const getTopUsers = createAsyncThunk('task/getTopUsers', async () => {
  const res = await axios.get(`${api_task}/clisha/latest-top/users`, config);
  return res.data.data.response;
});

export const getTopToken = createAsyncThunk('task/getTopToken', async () => {
  const res = await axios.get(`${api_task}/clisha/top/tokens`, config);
  return res.data.data;
});

export const getTeams = createAsyncThunk('task/getTeams', async () => {
  const res = await axios.get(`${api}/user/teams`, config);
  return res.data.data?.rows;
});

export const getCustomDateCallender = createAsyncThunk(
  'task/getCustomDateCallender',
  async ({ callenderDate }: { callenderDate: string }) => {
    const res = await axios.get(
      `${api_task}/daily/tasks?date=${moment(callenderDate).format('YYYY-MM-DD')}&page=1&size=25`,
      config
    );
    return res.data;
  }
);
export const getMessage = createAsyncThunk('task/getMessage', async () => {
  const res = await axios.get(`${api}/user/messages`, config);
  return res.data.data.banners[0];
});

export const getNotification = createAsyncThunk('task/getNotification', async () => {
  const res = await axios.get(`${api}/user/notifications`, config);
  return res.data.data.notifications;
});

export const getSurveyProfile = createAsyncThunk('task/getSurveyProfile', async () => {
  const res = await axios.get(`${api}/user/survey/status`, config);
  return res.data.data;
});

export const getUserSurveyProfile = createAsyncThunk('task/getUserSurveyProfile', async (data: any) => {
  const res = await axios.get(`${api}/user/survey/profile`, config);
  return res.data.survey;
});

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    calenderTask: [],
    experience: [],
    topUsers: [],
    topToken: [],
    callenderDate: '',
    callender_length: '',
    customDateTask: {},
    teams: [],
    task_status: false,
    message: null as MessageType | null,
    notification: '',
    taskModalList: [],
    reloadingCalendar: false,
    loading: false,
    completeSurveyProfile: null as any,
    surveyProfile: null as any,
  },

  reducers: {
    callenderDateFun: (state, action) => {
      state.callenderDate = action.payload.callenderDate;
      state.callender_length = action.payload.callender_length;
    },
    emptyDate: (state) => {
      state.customDateTask = '';
    },
    taskStatusFun: (state, action) => {
      state.task_status = action.payload;
      localStorage.setItem('task_status', action.payload);
    },
    updateTaskModalList: (state, action) => {
      const { list, len } = action.payload;
      state.taskModalList = list.slice(0, len);
    },
    // ChangeUserData: async (state, action) => {
    //     const res = await axios.post(`${api}/user/account/update/username`, action.payload, config)
    //     return res
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(closeNotify.fulfilled, () => {
      // Add user to the state array
      // state.message = action.payload
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      // Add user to the state array
      state.message = action.payload;
    });
    builder
      .addCase(getCalenderTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCalenderTask.fulfilled, (state, action) => {
        // Add user to the state array
        state.calenderTask = action.payload;
        state.loading = false;
      })
      .addCase(getCalenderTask.rejected, (state) => {
        state.loading = false;
      });
    builder.addCase(getCalenderTaskReload.pending, (state) => {
      state.reloadingCalendar = true;
    });
    builder.addCase(getCalenderTaskReload.fulfilled, (state, action) => {
      // Add user to the state array
      state.calenderTask = action.payload;
      state.reloadingCalendar = false;
    });
    builder.addCase(getCalenderTaskReload.rejected, (state) => {
      state.reloadingCalendar = false;
    });
    builder
      .addCase(addCalenderTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCalenderTask.fulfilled, (state, action) => {
        // Add user to the state array
        state.calenderTask = action.payload;
        state.loading = false;
      })
      .addCase(addCalenderTask.rejected, (state) => {
        state.loading = false;
      });
    builder.addCase(getExperience.fulfilled, (state, action) => {
      // Add user to the state array
      state.experience = action.payload;
    });
    builder.addCase(getTopUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.topUsers = action.payload;
    });
    builder.addCase(getTopToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.topToken = action.payload;
    });
    builder.addCase(getCustomDateCallender.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload);
      state.customDateTask = action.payload;
    });
    builder.addCase(getTeams.fulfilled, (state, action) => {
      // Add user to the state array
      state.teams = action.payload;
    });
    builder.addCase(getNotification.fulfilled, (state, action) => {
      // Add user to the state array
      state.notification = action.payload;
    });
    builder
    .addCase(getSurveyProfile.pending, (state) => {
        state.loading = true;
    })
    .addCase(getSurveyProfile.fulfilled, (state, action) => {
      // Add user to the state array
      state.completeSurveyProfile = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserSurveyProfile.fulfilled, (state, action) => {
      state.surveyProfile = action.payload;
    });
  },
});

export const generalSelectReloadingCalendar = (state: RootState) => state.general.reloadingCalendar;

export const generalSelectTaskModalList = (state: RootState) => state.general.taskModalList;

export const { taskStatusFun, callenderDateFun, emptyDate, updateTaskModalList } =
  generalSlice.actions;

export default generalSlice.reducer;
