import React, { FC, ReactNode } from 'react';
import styles from './styles.module.css';

export type TCardProps = {
  children: ReactNode;
};

export const Card: FC<TCardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>
};
