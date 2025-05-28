import {ThemeMode} from "../types/types.ts";
import {RootState} from "../app/store.ts";

export const selectAppTheme = (state: RootState): ThemeMode => state.app.themeMode
