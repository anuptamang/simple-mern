import axios from 'axios';
import { API_URL, configHeaders } from '../../configs';
import { TaskProps, createTask, createTaskError, createTaskSuccess, deleteTask, deleteTaskError, deleteTaskSuccess, readTasks, readTasksError, readTasksSuccess, updateTask, updateTaskError, updateTaskSuccess, resetCreateTask, resetUpdateTask, resetDeleteTask, readSingleTask, readSingleTaskSuccess, readSingleTaskError } from './taskSlice';

type DispatchCreateTaskProps = {
  payload: TaskProps | undefined
  type: 'task/createTask' | 'task/createTaskSuccess' | 'task/createTaskError';
};

type DispatchResetCreateTaskProps = {
  type: 'task/resetCreateTask';
};

type DispatchResetUpdateTaskProps = {
  type: 'task/resetUpdateTask';
};


type DispatchResetDeleteTaskProps = {
  type: 'task/resetDeleteTask';
};


type DispatchReadTasksProps = {
  type: 'task/readTasks' | 'task/readTasksSuccess' | 'task/readTasksError';
};

type DispatchUpdateTaskProps = {
  type: 'task/updateTask' | 'task/updateTaskSuccess' | 'task/updateTaskError';
};


type DispatchDeleteTaskProps = {
  type: 'task/deleteTask' | 'task/deleteTaskSuccess' | 'task/deleteTaskError';
};

type DispatchReadSingleTaskProps = {
  type: 'task/readSingleTask' | 'task/readSingleTaskSuccess' | 'task/readSingleTaskError';
};

interface TaskCreatePayloadProps {
  task: string
}

interface PatchTaskPayloadProps {
  task?: string,
}

export const taskCreate = (payload: TaskCreatePayloadProps, token: string) =>
  async (dispatch: (arg0: DispatchCreateTaskProps) => any) => {
    dispatch(createTask());

    try {
      const response = await axios.post(`${API_URL}/task`, payload, configHeaders(token))
      dispatch(createTaskSuccess(response.data));
    } catch (err: any) {
      dispatch(createTaskError(err));
    }
  };

export const resetTaskCreate = () => async (dispatch: (arg0: DispatchResetCreateTaskProps) => any) => {
  dispatch(resetCreateTask());
}

export const resetTaskUpdate = () => async (dispatch: (arg0: DispatchResetUpdateTaskProps) => any) => {
  dispatch(resetUpdateTask());
}

export const resetTaskDelete = () => async (dispatch: (arg0: DispatchResetDeleteTaskProps) => any) => {
  dispatch(resetDeleteTask());
}


export const getAllTasks = () => async (dispatch: (arg0: DispatchReadTasksProps) => any) => {
  dispatch(readTasks());

  try {
    const response = await axios.get(`${API_URL}/task`)
    dispatch(readTasksSuccess(response.data));
  } catch (err: any) {
    dispatch(readTasksError(err));
  }
};

export const taskUpdate = (payload: PatchTaskPayloadProps, taskId: string, token: string) =>
  async (dispatch: (arg0: DispatchUpdateTaskProps) => any) => {
    dispatch(updateTask());

    try {
      const response = await axios.patch(`${API_URL}/task/${taskId}`, payload, configHeaders(token))
      dispatch(updateTaskSuccess(response.data));
    } catch (err: any) {
      dispatch(updateTaskError(err));
    }
  };

export const taskDelete = (taskId: string, token: string) =>
  async (dispatch: (arg0: DispatchDeleteTaskProps) => any) => {
    dispatch(deleteTask());

    try {
      const response = await axios.delete(`${API_URL}/task/${taskId}`, configHeaders(token))
      dispatch(deleteTaskSuccess(response.data));
    } catch (err: any) {
      dispatch(deleteTaskError(err));
    }
  };

export const getTaskById = (taskId: string) => async (dispatch: (arg0: DispatchReadSingleTaskProps) => any) => {
  dispatch(readSingleTask());

  try {
    const response = await axios.get(`${API_URL}/task/${taskId}`)
    dispatch(readSingleTaskSuccess(response.data));
  } catch (err: any) {
    dispatch(readSingleTaskError(err));
  }
};