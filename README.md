# Redux HackerNews

A small web application that displays the latest stories on HackerNews.

### Motivation

Over the past week I've been studying the Redux architecture. It's been something I've wanted to to do for a [while](https://www.youtube.com/watch?v=xsSnOQynTHs), but I was skeptical about its life-span. I witnessed the flurry of Flux inspired libraries come and go, but none of them really caught my eye. Some of their design choices made me question how they would cope at scale, one of the main problems the [original](https://github.com/facebook/flux) Flux library tried to solve.

After reading a large potion of the [offical documentation](http://rackt.org/redux), it felt like a good time to put the theory I'd learnt into practce. I needed a project idea that wasn't too complex, but covered enough to exercise common problems such as async operations and error handling. I decided I would create a basic application that talks to the [HackerNews API](https://github.com/HackerNews/API).

### Thoughts / Experience

At the start of the week, I began reading the official Redux documentation. It was nice to see that each part had its own section, making it easier to digest the core concepts. If it had been a continuous stream of text, I'd have likely found myself attempting to read the entire documentation all at once. Browsing the project's [GitHub repository](https://github.com/rackt/redux/) revealed the docs are frequently kept update with any API changes and/or helpful tips and tricks.

When I began working on my project, I found the code examples were great, offering guidance on how I should connect the pieces of Redux together. It was quite refreshing to find there were [other examples](http://rackt.org/redux/docs/introduction/Examples) that didn't just focus on the generic TODO application.

Although the code examples demonstrated how one could use Redux in practice, I was still unsure how an action made its way through the application. Luckily, I found [this article](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) that personified the Redux architecture through a series of interesting cartoon drawings.

**Immutable**

Lee Byron, the author of a library called [Immutable](https://github.com/facebook/immutable-js), gave an [outstanding talk](https://www.youtube.com/watch?v=I7IdS-PbEgI) at React Conf early this year. He demonstrated some of the great advantages developers could harness with immutable data structures. Naturally, some of the talk was set around how to increase the performance of React by using the shouldComponentUpdate lifecycle hook.

One of the reasons immutable data structures are so powerful is because mutations return new object references. This makes comparing state changes trivial, as only reference checks are required as opposed to deep comparison checks (dirty checking).

As it turns out, immutable data structures are an integral part to Redux. It's how the store determines if a change has been made by a reducer.

Unfortunately, my experience with Immutable was far from a walk in the park. The documentation lacked examples on how to use each method, and the unfamiliar syntax that described them, made it hard to understand what I was doing wrong when troubleshooting. I found the best way was to just experiment in the console.

Through perseverance, I was able to grasp the fundamentals of Immutable, and found it was a great combination with Redux. In comparison to the examples that used Object.assign, the logic inside the reducers felt much cleaner and easier to read.
