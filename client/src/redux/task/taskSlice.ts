import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export type SingleTaskProps = {
  task?: string;
  createdAt?: string;
  userID?: string;
  __v?: number;
  _id?: string;
} | any

export type TaskProps = {
  tasks?: object | null,
  loading: boolean;
  error: any;
  success: boolean | undefined;
  singleTask: SingleTaskProps;
  tasksById: object | null;
  createTask: object | null;
  updateTask: object | null;
  deleteTask: object | null;
  taskAuthor: object | null;
  loadingSingle: boolean;
  loadingDelete: boolean;
  loadingUpdate: boolean;
  likeLoading: boolean;
  createTaskSuccess: boolean;
  updateTaskSuccess: boolean;
  deleteTaskSuccess: boolean;
}

const initialState: TaskProps = {
  tasks: null,
  loading: false,
  error: false,
  success: false,
  singleTask: {},
  tasksById: null,
  createTask: null,
  updateTask: null,
  deleteTask: null,
  taskAuthor: null,
  loadingSingle: false,
  loadingDelete: false,
  loadingUpdate: false,
  likeLoading: false,
  createTaskSuccess: false,
  updateTaskSuccess: false,
  deleteTaskSuccess: false
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state: typeof initialState) => {
      state.loading = true
      state.createTaskSuccess = false
    },
    createTaskSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.loading = false
      state.createTaskSuccess = true
      state.createTask = action.payload
    },
    createTaskError: (state, action: PayloadAction<TaskProps>) => {
      state.loading = false
      state.createTaskSuccess = false
      state.error = action.payload
    },
    resetCreateTask: (state: typeof initialState) => {
      state.createTask = null
      state.createTaskSuccess = false
    },
    resetUpdateTask: (state: typeof initialState) => {
      state.updateTask = null
      state.updateTaskSuccess = false
    },

    readTasks: (state: typeof initialState) => {
      state.loading = true
    },
    readTasksSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.loading = false
      state.success = true
      state.tasks = action.payload
    },
    readTasksError: (state, action: PayloadAction<TaskProps>) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    readSingleTask: (state: typeof initialState) => {
      state.loadingSingle = true
    },
    readSingleTaskSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.loadingSingle = false
      state.success = true
      state.singleTask = action.payload
    },
    readSingleTaskError: (state, action: PayloadAction<TaskProps>) => {
      state.loadingSingle = false
      state.success = false
      state.error = action.payload
    },
    updateTask: (state: typeof initialState) => {
      state.loading = true
    },
    updateTaskSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.loading = false
      state.updateTaskSuccess = true
      state.updateTask = action.payload
    },
    updateTaskError: (state, action: PayloadAction<TaskProps>) => {
      state.loading = false
      state.updateTaskSuccess = false
      state.error = action.payload
    },

    deleteTask: (state: typeof initialState) => {
      state.loadingDelete = true
    },
    deleteTaskSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.loadingDelete = false
      state.deleteTaskSuccess = true
      state.deleteTask = action.payload
    },
    deleteTaskError: (state, action: PayloadAction<TaskProps>) => {
      state.loadingDelete = false
      state.deleteTaskSuccess = false
      state.error = action.payload
    },

    resetDeleteTask: (state: typeof initialState) => {
      state.deleteTask = null
      state.loadingDelete = false
      state.deleteTaskSuccess = false
      state.error = false
    },

    resetSingleTask: (state: typeof initialState) => {
      state.singleTask = {}
      state.loadingSingle = false
      state.success = false
      state.error = false
    },

    addLike: (state: typeof initialState) => {
      state.likeLoading = true
    },

    addLikeSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.likeLoading = false
      state.updateTaskSuccess = true
      state.updateTask = action.payload
    },
    addLikeError: (state, action: PayloadAction<TaskProps>) => {
      state.likeLoading = false
      state.updateTaskSuccess = false
      state.error = action.payload
    },

    removeLike: (state: typeof initialState) => {
      state.likeLoading = true
    },

    removeLikeSuccess: (state, action: PayloadAction<TaskProps>) => {
      state.likeLoading = false
      state.updateTaskSuccess = true
      state.updateTask = action.payload
    },

    removeLikeError: (state, action: PayloadAction<TaskProps>) => {
      state.likeLoading = false
      state.updateTaskSuccess = false
      state.error = action.payload
    },
  },
})

// Selector function return
export const taskSelector = (state: { task: TaskProps }) => state.task

// Action creators are generated for each case reducer function
export const {
  readTasks,
  readTasksSuccess,
  readTasksError,
  readSingleTask,
  readSingleTaskSuccess,
  readSingleTaskError,
  createTask,
  createTaskSuccess,
  createTaskError,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskError,
  updateTask,
  updateTaskSuccess,
  updateTaskError,
  addLike,
  addLikeSuccess,
  addLikeError,
  removeLike,
  removeLikeSuccess,
  removeLikeError,
  resetDeleteTask,
  resetSingleTask,
  resetCreateTask,
  resetUpdateTask,
} = taskSlice.actions

export default taskSlice.reducer
