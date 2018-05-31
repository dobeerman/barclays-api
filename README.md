# barclays-api

```bash
$ git clone https://github.com/dobeerman/barclays-api.git
$ cd barclays-api
$ yarn start
```

## DB Initialize

```
http://localhost:8080/init
```

It should return the following object within a few seconds

```js
{
    "ok": true,
    "updated": true
}
```

## Endpoint

```
http://localhost:8080/atms?lat=[latitude]&lon=[longitude]
```
