# Пример использования NGINX в Docker

## Структура проекта

- host-client -  пример реализации UI, который является хостом MF, с использованием **nginx** в качестве сервера **раздачи статики**
- remote-client -  пример реализации UI, который является подключаемым микрофронтом, с использованием **nginx** в качестве сервера **раздачи статики**
- server - пример реализации сервера, который возвращает **json**, содеражащий **метод и путь**, по которым к нему **пришел запрос**
- proxy - настройки для прокси, который из **корня** раздает статику **UI**, а по **/api** перенаправляет запрос на **сервер**

## Использование

Для запуска необходимо выполнить команду

```shell
docker-compose up -d
```

После выполнения команды проект будет доступен по адресу http://localhost, при этом:
* http://localhost - хост микрофронтов
* http://localhost/remote - подключаемый микрофронт
* http://localhost/api/host - сервер хоста микрофронтов
* http://localhost/api/remote - сервер подключаемого микрофронта

## Пояснения по настройки прокси

Из коробки **nginx** **не умеет** работать с **переменными окружения**. Однако docker образ во время запуска использует утилиту **envsubst**, которая входит в состав системы linux, чтобы преобразовать шаблоны (по умолчанию это папка */etc/nginx/templates*), подставив в них переменные окружения, и скопировать в папку */etc/nginx/conf.d*, откуда уже nginx загружает их как обычные файлы конфигурации

Не надо перетирать без особой нуждый стандартный **/etc/nginx/nginx.conf**. Он уже содержит все необходимые для большинства задач параметры:

```Properties

user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

```

Все расширения конфигурации следует копировать в папку **/etc/nginx/conf.d**, куда и происходит копирование шаблонов после обработки.