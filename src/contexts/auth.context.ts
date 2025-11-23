import { createContext } from 'react';

type AuthDialog = 'REGISTER' | 'LOG_IN' | undefined;

export type AuthDialogType = {
  dialog: AuthDialog;
  setDialog: (value: AuthDialog) => void;
};

export const AuthContext = createContext<AuthDialogType>({
  dialog: undefined,
  setDialog: () => {},
});
