# Redux HackerNews (Server)

This directory contains the RESTful API server. Since I want to explore async operations on the [client](/client), this server helps to abstract away implementation detail when requesting data from the [HackerNews API](https://github.com/hackernews/API).

To keep things simple, it only supports requesting the top 50 most recent items. This is accessible via the ```/latest``` endpoint, which returns a collection of [items](https://github.com/hackernews/API#items).

### Getting Started

To launch the server, type the following into your terminal:

```bash
npm start
```

This will launch up an Express web server at localhost:8080.

### Libraries

- [Express](https://www.npmjs.com/package/express)
- [Bluebird](https://www.npmjs.com/package/bluebird)
- [Fetch](https://www.npmjs.com/package/isomorphic-fetch)

### Future Improvements

- Handle failed requests properly. Either by retrying, or requesting an older item.
- The current implementation requests 50 items, but not all items are stories. This means the client often receives an inconsistant list of results.
- Invalidate cached items after a given period.
- Store cached items to persistant storage in intervals. Currently cached items are stored in memory and are therefore lost when the server is restarted.
