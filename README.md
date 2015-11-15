# Redux HackerNews

A small web application that displays the latest stories on HackerNews.

### Motivation

Over the past week I've been studying the Redux architecture. It's been something I've wanted to to do for a [while](https://www.youtube.com/watch?v=xsSnOQynTHs), but I was skeptical about its life-span. I witnessed the flurry of Flux inspired libraries come and go, but none of them really caught my eye. Some of their design choices made me question how they would cope at scale, one of the main problems the [original](https://github.com/facebook/flux) Flux library tried to solve.

After reading a large potion of the [offical documentation](http://rackt.org/redux) and [this](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6) superb article, it felt like a good time to put the theory I'd learnt into practce. I needed a project idea that wasn't too complex, but covered enough to exercise common problems such as async operations and error handling. I decided I would create a basic application that talks to the [HackerNews API](https://github.com/HackerNews/API).
