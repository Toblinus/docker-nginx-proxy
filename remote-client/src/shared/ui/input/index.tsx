import React, { FC } from 'react';

export type TInputProps = {
  label: string;
  value: string;
  onChange(value: string): void;
};

export const Input: FC<TInputProps> = ({ label, onChange, value }) => {
  return (<label>
    {label}
    <input type="text" value={value} onChange={(e) => {
      onChange?.(e.target.value);
    }} />
  </label>);
};
