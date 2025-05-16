import type { RootState } from '../app/store'
import {TasksState} from "../types/types.ts";

export const selectTasks = (state: RootState): TasksState => state.tasks