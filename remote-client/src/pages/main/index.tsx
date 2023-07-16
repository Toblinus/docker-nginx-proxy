import React, { FC, useState } from 'react';
import { Card } from '../../shared/ui/card';
import { Input } from '../../shared/ui/input';
import { Select, Option } from '../../shared/ui/select';
import { Button } from '../../shared/ui/button';
import { JsonViewer } from '../../shared/ui/json-viewer';
import { request } from '../../shared/api';

export const MainPage: FC = () => {
  const [path, setPath] = useState('/user/1');
  const [method, setMethod] = useState('post');

  const [result, setResult] = useState<unknown>({ result: '-' });

  const clickSendButtonHandler = () => {
    request(method, path).then(setResult).catch((e) => {
      setResult({
        result: 'error',
        message: e?.message,
      })
    });
  }

  return (<Card>
    <h3>Remote</h3>
    <Card>
      <Input label='Путь запроса' value={path} onChange={setPath} />
      <Select label='Метод запроса' onChange={setMethod} value={method}>
        <Option value='post'>post</Option>
        <Option value='get'>get</Option>
        <Option value='put'>put</Option>
        <Option value='delete'>delete</Option>
      </Select>
      <Button onClick={clickSendButtonHandler}>Отправить запрос</Button>
    </Card>
    <Card>
      Результат
      <JsonViewer data={result} />
    </Card>
  </Card>);
};
