import { useMemo, useState } from 'react';

export const useBoolean = (
  initialState: boolean | (() => boolean) = false,
): [boolean, Record<'on' | 'off' | 'toggle', () => void>] => {
  const [state, setState] = useState(initialState);

  const customSetState = useMemo(
    () => ({
      on: () => setState(() => true),
      off: () => setState(() => false),
      toggle: () => setState((prevState) => !prevState),
    }),
    [setState],
  );

  return [state, customSetState];
};
