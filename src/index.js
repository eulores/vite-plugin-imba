import { basename } from 'path';
import { compile } from 'imba/dist/compiler.js';
const debug = require('debug')('imba')

import { join, dirname } from 'path';
const vitePath = require.resolve('vite', require.main);
const resolverPath = join(dirname(vitePath), 'resolver') // Ugly hack! Need to add .imba to the supported extensions for the Resolver, but that array is not exported...
const { supportedExts } = require(resolverPath)
if (!supportedExts.includes('.imba')) supportedExts.push('.imba');

/*
Relevant options:
-----------------

onlyDev: boolean false // run the transform only during development, but skip for production builds. In that case, a rollup-based plugin will have to provide for Imba compilation
useCache: boolean false // pending open issue 662: https://github.com/vitejs/vite/issues/662
externalCSS: boolean | string false // path to save CSS, or leave inlined
*/
function imbaPlugin(pluginOptions = {}) {
  return {
    transforms: [
      {
        test: ({ path }) => /\.imba$/.test(path),
        transform: ({ code, path, isBuild, notModified }) => {
          debug(`transform - cache ${notModified} - compiling ${path}`);
          const options = {
            target: 'web',
            format: 'esm',
            es6: true,
            standalone: false,
            sourceMap: true,
            evaling: true,
            css: false,
            filename: basename(path),
            sourceRoot: '',
            sourcePath: basename(path),
            targetPath: '',
          };
          Object.assign(options, pluginOptions);
          if (options.externalCSS) options.css = 'separate';
          if (options.onlyDev && isBuild) return;
          let {
            js,
            sourcemap,
            css,
            styles, // contains scss & sass style definitions from multi-line comments (purpose unclear)
            warnings
          } = compile(code, options); // consider extracting warnings for custom display (switch of evaling!)
          // if (result.styles.inlined !== yes) write out css to separate file
          delete sourcemap.maps; // debugging leftover?
          return {
            code: js,
            map: sourcemap
          };
        }
      }
    ]
  }
}

export default imbaPlugin;