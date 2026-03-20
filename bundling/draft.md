
Webpack is a bundler
Node commonJS
ESModules vanilla are slow, related to the network, to js engine
functions poluting the global scope, before we used to use IFEES

IFEES avoid the polution of global scope with identifiers.
using multiple script tags is slow on browser.
Webpack bundles into a single file
Module.exports or commonJS was created by Node.js

vite uses native es modules


dev server webpack needs to rebuild the application


commonjs - copy the data, does not have live binding
esmodules - has live binding

browser does not support commonjs

tree shaking remove unused code

commonjs needs object as a reference to persist data. primitive data are copies



Tree shaking
Bundler 

Babel - compiler
Terser- minifier
