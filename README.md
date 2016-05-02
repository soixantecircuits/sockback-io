# sockback-io

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> An app to record an playback socket.io messages


## Develop

#### Prerequisites

* `node >= v4.0.0` ([use nvm](https://github.com/creationix/nvm))
* `webpack` ([download here](https://github.com/webpack/webpack)) (install `npm install webpack -g`)
* Follow [JavaScript Standard Style](https://github.com/feross/standard) and use a [text editor plugin](https://github.com/feross/standard#text-editor-plugins)

#### Stack

- [Neodymium](https://github.com/soixantecircuits/neodymium) with front-end, electron, FSM and native API support. Some work will have to be done on the router.
- Some of [the libs we use](https://github.com/soixantecircuits/awesome-app-js).
- We use [standard](https://github.com/feross/standard) coding style and now you do too 😉.

#### Install dependencies

```
$ npm install
```
*(Yeoman should have done this for you)*

#### Workflow

We follow [a successful git branching model](http://nvie.com/posts/a-successful-git-branching-model/).

We also version our apps, following [semver](http://semver.org/). You pass a version when merging `dev` into `master`. Obviously, you'll update version number and tags in the `master` branch.
To do so, [npm is here](https://docs.npmjs.com/cli/version) to help you out. **Make sure your `git` working directory is clean**.

```
$ npm version major|minor|patch
```

You can also run `$ npm test` before you commit to make sure you don't give anyone a good reason to blame you.

#### Run

##### In the browser

```
$ gulp dev
```
And then rendez-vous at `http://127.0.0.1:6060`.

##### In electron

```
$ gulp dev
```

And in an other shell window:

```
$ npm start
# For Windows users :
$ npm start-win
```

#### In node
```
$ npm start
```

## Build

We use [electron-packager](https://github.com/maxogden/electron-packager).

```
$ webpack
$ npm run build-osx # osx 64bits app
$ npm run build-linux # linux 64bits app
$ npm run build-win # windows 64bits app
```

## Troubleshooting

#### Webpack

- [This howto](https://github.com/petehunt/webpack-howto) also explains a lot of useful things.
- [This page](https://github.com/webpack/docs/wiki/shimming-modules) too.

## License

MIT © gabrielstuff
