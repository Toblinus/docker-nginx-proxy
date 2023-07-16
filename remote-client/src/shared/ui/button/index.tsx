import React, { FC, ReactNode } from 'react';

export type TButtonProps = {
  children: ReactNode,
  onClick(): void;
};

export const Button: FC<TButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>
};
