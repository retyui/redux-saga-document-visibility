If you need package without `@babel/runtime`, you can use files from `/src` folder.

## How it work?
1) add alias
2) update babel-loader config

## Install and check
```sh
git clone https://github.com/retyui/redux-saga-document-visibility
cd examples/webpack-build-without-babel-runtime
yarn # install dependencies
yarn build # run build and open Webpack Bundle Analyzer
``