If you need package without `@babel/runtime`, you can use files from `/src` folder.

## How it work?
1) [add alias](https://github.com/retyui/redux-saga-document-visibility/blob/be48e3102304b92ee4cf8e25dd23c4cb9457a248/examples/webpack-build-without-babel-runtime/webpack.config.js#L14-L16)
2) [update babel-loader config](https://github.com/retyui/redux-saga-document-visibility/blob/be48e3102304b92ee4cf8e25dd23c4cb9457a248/examples/webpack-build-without-babel-runtime/webpack.config.js#L22-L25)

## Install and check
```sh
git clone https://github.com/retyui/redux-saga-document-visibility
cd examples/webpack-build-without-babel-runtime
yarn # install dependencies
yarn build # run build and open Webpack Bundle Analyzer
``
