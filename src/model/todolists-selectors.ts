import type { RootState } from '../app/store'
import {Todolist} from "../types/types.ts";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists