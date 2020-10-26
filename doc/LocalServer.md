# Local Server

### Why

In general public APIs for Literary Use Cases are very less and don't cover the sufficient breadth of the language. In case of verb conjugation there wasn't any. There is also problems of CORS restriction in case of some public APIs for browsers. But at the same time there is a wealth of command line tools which solve most of the use cases and since they don't have to face CORS restrictions.  

### What

The next problem with command line tools is that they are very application friends. So the need for a middle layer arose which would parse command line output and return data in a format which the chrome extension understood.  

### How

The [server.js] is an express server which executes commands and exposes their output as APIs. There is also a [Makefile] to facilitate installation of the required tools.  

### Features

The following features have been built on top of it:  

#### Verb Conjugation

Support for German Verb Conjugations for these tenses built using this [tool](https://github.com/nicksellen/german)  

- present (Only this is currently supported in the UI)
- past
- future
- perfect
- present-perfect
- past-perfect

#### Fallback Dictionary Translation

The Yandex API which is being used for translations is doesn't have sufficient depth. There is also the issue of API rate limit per month (1000 calls), which even though decent is restrictive.  

So as a fallback option, we are using this [tool](https://github.com/soimort/translate-shell) for translations, in case remote translation API (currently Yandex) fails. Despite its breadth there are short limitations. It doesn't understand gender of noun.  

So a hybrid approach is being used where best case scenario is that remote API (Yandex) returns translation / article + noun and worst case is that local API (command line tool) returns translation.  


[Makefile]: https://github.com/akashrajr1/Woterbuch/blob/master/Makefile
[server.js]: https://github.com/akashrajr1/Woterbuch/blob/master/server.js