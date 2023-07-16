import React, { FC } from 'react';

export type TOptionProps = {
  children: string;
  value: string;
};

export const Option: FC<TOptionProps> = ({ children, value }) => {
  return <option value={value}>{children}</option>;
};
