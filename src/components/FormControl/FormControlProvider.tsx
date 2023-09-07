import { useId, FC, PropsWithChildren, useMemo } from 'react';
import { FormControlContext, FormControlContextValue } from './FormControlContext';

interface FormControlProviderProps extends PropsWithChildren {
  isDarkTheme?: boolean;
}

const FormControlProvider: FC<FormControlProviderProps> = ({ children, isDarkTheme }) => {
  const id = useId();
  const context: FormControlContextValue = useMemo(() => ({ isDarkTheme, id }), [isDarkTheme, id]);

  return <FormControlContext.Provider value={context}>{children}</FormControlContext.Provider>;
};

export { FormControlProvider };
