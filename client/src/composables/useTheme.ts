import { Ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

export interface ThemeComposition {
  isDark: Ref<boolean>;
  toggleDark: () => boolean;
}

export const useTheme = (): ThemeComposition => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
  });
  const toggleDark = useToggle(isDark);

  return {
    isDark,
    toggleDark,
  };
}