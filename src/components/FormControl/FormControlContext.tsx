import { createContext } from 'react';

interface FormControlContextValue {
  isDarkTheme?: boolean;
  id?: string;
}

const FormControlContext = createContext<FormControlContextValue>({});

export type { FormControlContextValue };
export { FormControlContext };
