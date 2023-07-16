import React, { FC, ReactNode } from 'react';

export type TSelectProps = {
  label: string;
  value: string;
  children: ReactNode;
  onChange(value: string): void;
};

export const Select: FC<TSelectProps> = ({ onChange, label, value, children }) => {
  return (<label>
    {label}
    <select value={value} onChange={(e) => {
      onChange?.(e.target.value);
    }}>
      {children}
    </select>
  </label>)
};

export { Option } from './option';
