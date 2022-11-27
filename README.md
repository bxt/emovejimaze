emovejimaze
===========

The game **emovejimaze** is an fun puzzle game where you have to hunt emojis by moving through a maze – and moving the maze itself. It's a simple web app based on [Preact](https://preactjs.com/), [vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/).

[Go here to play emovejimaze](http://bxt.github.io/emovejimaze/).

Developing
----------

First install the dependencies:

```sh
npm install
```

Then run:

```sh
npm run dev
```

This will continuously watch the files for changes and recompile.

In case you editor does not do it automatically you might want to run the linter every now and then:

```sh
npm run format
```

Deploying
---------

To check how the apps looks in production you can run:

```sh
npm run build
npm run preview
```

If you're happy with the results just run:

```sh
./deploy.sh
```

