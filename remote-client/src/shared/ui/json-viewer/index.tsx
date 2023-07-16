import React, { FC } from 'react';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export type TJsonViewerProps = {
  data: unknown;
};

export const JsonViewer: FC<TJsonViewerProps> = ({ data }) => {
  const json = typeof data === 'string' ? JSON.parse(data) : data;

  return <JsonView data={json} style={defaultStyles} />;
}