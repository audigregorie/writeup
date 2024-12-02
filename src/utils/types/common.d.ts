import { ReactNode } from 'react';

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
};

export type ProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  currentUser: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<boolean>>;
};
