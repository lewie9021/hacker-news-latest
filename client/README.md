# Redux HackerNews (Client)

This directory contains the client application logic, the main focus of the project. Here we explore [Redux](https://www.npmjs.com/package/redux) paired with [immutable data structures](https://www.npmjs.com/package/immutable) and [React](https://www.npmjs.com/package/react). The usefulness of this application isn't important, rather the goal is to understand how Redux works.

### Getting Started

To launch the application, type the following into your terminal:

```bash
npm start
```

This will start the build process and launch up an Express web server at localhost:3000.

__Note:__ You will need to launch the [RESTful API Server](/server) to fetch stories from HackerNews.

### Libraries

- [Webpack](https://www.npmjs.com/package/webpack) ([Configurator](https://www.npmjs.com/package/webpack-configurator))
- [Express](https://www.npmjs.com/package/express)
- [Babel](https://www.npmjs.com/package/babel) ([React](https://www.npmjs.com/package/babel-preset-react) | [ES2015](https://www.npmjs.com/package/babel-preset-es2015))
- [Redux](https://www.npmjs.com/package/redux) ([Thunk](https://www.npmjs.com/package/redux-thunk) | [Logger](https://www.npmjs.com/package/redux-logger))
- [React](https://www.npmjs.com/package/react) ([DOM](https://www.npmjs.com/package/react-dom) | [Redux](https://www.npmjs.com/package/react-redux))
- [Immutable](https://www.npmjs.com/package/immutable)
- [Fetch](https://www.npmjs.com/package/isomorphic-fetch)
- [Moment](https://www.npmjs.com/package/moment)
