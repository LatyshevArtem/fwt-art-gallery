import { createContext } from 'react';

interface FormControlContextValue {
  id?: string;
}

const defaultValue: FormControlContextValue = {};

const FormControlContext = createContext<FormControlContextValue>(defaultValue);

export type { FormControlContextValue };
export { FormControlContext };
