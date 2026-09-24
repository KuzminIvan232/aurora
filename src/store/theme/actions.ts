import { action } from 'mobx';
import { themeStore, ThemeMode } from './state';

export const setThemeMode = action((mode: ThemeMode) => {
    themeStore.mode = mode;
});