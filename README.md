# Redux HackerNews

A small web application that displays the latest stories on HackerNews.

### Motivation

Studying the Redux architecture has been something I've wanted to do for a [while](https://www.youtube.com/watch?v=xsSnOQynTHs), but I was skeptical about its life-span. I witnessed the flurry of Flux inspired libraries come and go, but none of them really caught my eye. Some of their design choices made me question how they would cope at scale, one of the main problems the [original](https://github.com/facebook/flux) Flux library tried to solve.

After reading a large potion of the [offical documentation](http://rackt.org/redux), it felt like a good time to put the theory I'd learnt into practce. I needed a project idea that wasn't too complex, but covered enough to exercise common problems such as async operations and error handling. I decided I would create a basic application that talks to the [HackerNews API](https://github.com/HackerNews/API).

### Thoughts / Experience

Before I started work on this project, I first read the official Redux documentation. It was nice to see that each part had its own section, making it easier to digest the core concepts. I found the offical code examples to be a great help, offering guidance on how I should connect the pieces of Redux together. It was quite refreshing to find [other examples](http://rackt.org/redux/docs/introduction/Examples), not just the generic todo application.

Although I'd read most the docs, I was still unsure how actions made their way through the application. Fortunately, I found [this article](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) that personified the Redux architecture through a series of interesting cartoon drawings.

**Immutable**

Lee Byron, the author of a library called [Immutable](https://github.com/facebook/immutable-js), gave an [outstanding presentation](https://www.youtube.com/watch?v=I7IdS-PbEgI) at React Conf earlier this year. The talk was largely around the advantages of immutablity and the problems it tries to solve. He later explains how it can improve the performance of React using the shouldComponentUpdate lifecycle hook.

One of the reasons immutability is so powerful is because making mutations produce new references. This makes comparing state changes trivial, as only cheap reference checks are required as opposed to expensive deep comparison checks (often referred to as dirty checking).

Implementing undo functionality becomes remarkably easy with immutability. After a mutation is made, the new reference can be stored in a 'history' array. When the user hits undo, we apply the penultimate item in the array to reveal the previous state. Thanks to [structural sharing](https://en.wikipedia.org/wiki/Persistent_data_structure), this isn't as memory intensive as you might think. Where mutable structures would require a deep clone for each state change, immutable structures can make guarantees about the data. In particular, it knows the data can not be directly changed, therefore it tries to make use of as much of the last state as possible.

As it turns out, immutability is an integral part of Redux. It's how the store determines if a change has been made by a reducer.

Unfortunately, my experience with the Immutable library was far from a walk in the park. The documentation lacked examples on how to use each method, and the unfamiliar syntax that described them, made it hard to understand what I was doing wrong while troubleshooting. In the end, I found the best way was to just experiment in the console. However, once I understood the fundamentals of Immutable, I realised what a great combination it was with Redux. In comparison to the official examples that use Object.assign, the logic inside the reducers felt much cleaner and easier to read.

**Central App State**

The idea of using a single store for the entire application felt quite intimidating. In the original Flux implementation, an application could have several stores, each responsible for a particular domain. The question I had with Redux was:

> How would I structure the store of a large application with several screens and a lot of user interaction?

I found the best advice was to structure the store in a similar way to a relational database. Normalization could help reduce issues such as trying to keep the same data in several places in sync. I've yet to look further into route-driven applications with Redux, but I imagine the store would contain a 'routes' property at the top level that maps route paths to route specific state. Route state would be kept minimal, often storing foreign keys pointing to other areas of the store (in this application, it would contain story IDs rather than the actual stories).

If a user stumbles upon an error, having the entire application state in a single object can be very beneficial. Bug reporting could be implemented by simply sending a dump of the application state at the time the bug occurred. Later, a developer could replace their application state with that of the user, making the debugging process much slicker. Improving this, the bug reporter could also send a series of actions that were triggered just before the crash, providing hints on what the user was attempting to achieve.

**Hot Module Replacement**

A benefit of Redux is that the store isn't coupled with the logic that handles mutations. This means reducers can be [hot swapped](https://webpack.github.io/docs/hot-module-replacement) without wiping out the application state in the process, making iterations extremely fast! Unfortunately, I wasn't able to apply [hot swapping for React components](https://github.com/gaearon/babel-plugin-react-transform) during the development of this project due to the major Babel 6 update.

**Testing**

I had a pleasant experience testing Redux components. I think this was mainly because of the way it tries to make the application as pure as possible. I didn't have to deal with any class instances that require cleanup after each spec to avoid state pollution. Redux is mostly built around simple functions that given the same input, will always provide the same output. With that said, even async action creators that produce side-effects were relatively easy to test thanks to [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store).

I encountered an issue quite early on with IE due to its lack of ES6 features, particularly Promises. When I ran the specs with [Karma](https://github.com/karma-runner/karma), [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) would fail to find the Promise constructor on the window. Since this project is using the newly released Babel 6, it's possible that the older versions shipped polyfills by default.

Trying to mock isomorphic-fetch proved harder than I thought. I spent hours trying to get [fetch-mock](https://github.com/wheresrhys/fetch-mock) to play nicely with it. I needed to mock the network requests so that the RESTful API server wasn't a dependency. In the end, I had to import isomorphic-fetch onto the window object so that fetch-mock could work its magic.

In this project, I decided to change the way I wrote specs to avoid testing implementation detail. Previously, I used a range of stubbing tricks to gain access to the internals, making it very difficult to change even subtle parts of the code, without having to fix a number of failing specs. Writing specs in this way meant that I didn't need to make extensive use of the Sinon library either. I found that I only needed its spying functionality to ensure action creators were triggered correctly.

By the time I began testing the Story component, I realised I'd made the mistake of grouping together too many expectations into a single spec. When a spec failed, it was difficult to locate exactly what went wrong without scanning through the code. What made matters worse was I often named the specs *"it should render correctly"*. I decided to split out the expectations into specs with descriptive names. Doing so, made it easy to identify exactly what the component should achieve, while simplifying the debugging process of failing specs.

A common issue I had was the specs would test a particular behaviour with only one dataset. To tackle this problem, I had each spec run through the expectations across several datasets defined at the top of file. These state scenarios worked as sanity checks to ensure the tests aren't flagging as false positives. For instance, testing the addition functionality of a calculator would require several datasets to ensure it's working as expected. This is because it's possible the spec could pass if the method simply returned the expected result without any calculations.

Using inline styles with React components opened up a new way of testing UI. I was able to pick out important styles and ensure they were applied as expected. For instance, the styling for the list group requires the first item to have a border-top rule. This is something I've never been able to do before.

**Inline Styles**

I tried to stay away from using CSS throughout this project as an opportunity to explore inline styles with React. I was able to tweak the styling of the application with a much more direct approach. With CSS, you have to do this via proxy, that is, to either apply an id or a class to an element. While this helps to keep the markup clean, it does leave your UI open to bugs. The JavaScript doesn't have full control over what styles are applied. It has to make an assumption that there is a CSS selector somewhere in your stylesheet(s) that will take care of it.

While the majority of the experience went quite well, I did however run into a problem regarding the :hover state of an element. Although you could in fact implement this using a combination of mouse enter/leave events and a hover state property, it certainly isn't as elegant as the CSS counterpart. A more difficult problem would be to implement media queries such that an onresize event handler isn't attached for each component that's mounted.

Since the focus of this project was to understand Redux, I decided to opt out of an inline style solution when it came to anything more advanced such as element state styles and media queries. Instead, I created a style tag in the main HTML file (it didn't feel necessary to add both [style-loader](https://github.com/webpack/style-loader) and [css-loader](https://github.com/webpack/css-loader) to my Webpack configuration for a few lines of styling). Going forward, I would like to investigate a library called [Radium](https://github.com/FormidableLabs/radium) that tries to solve these problems.
