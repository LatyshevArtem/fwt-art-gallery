/* eslint-disable react/jsx-no-constructed-context-values */
import { useId, FC, PropsWithChildren } from 'react';
import { FormControlContext, FormControlContextValue } from './FormControlContext';

interface FormControlProviderProps extends PropsWithChildren {}

const FormControlProvider: FC<FormControlProviderProps> = ({ children }) => {
  const context: FormControlContextValue = { id: useId() };

  return <FormControlContext.Provider value={context}>{children}</FormControlContext.Provider>;
};

export { FormControlProvider };
