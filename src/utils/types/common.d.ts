import React, { ReactNode } from 'react';

export type AuthButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

export type ModalProps = {
  modal?: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenStyle?: string;
  children?: React.ReactNode;
};

export type AuthProps = {
  setSignRequest: (value: string) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  currentUser: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SignUpFormProps = LogInFormProps & {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type LogInFormProps = Omit<SignUpFormProps, 'username', 'confirmPassword'>;

export type InputProps = {
  type: string;
  name: string;
  label: string;
  form: SignUpFormProps;
  setForm: React.Dispatch<React.SetStateAction<SignUpFormProps>>;
};
