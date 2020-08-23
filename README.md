# vite-plugin-imba

Use the [Imba compiler](https://v2.imba.io/) (v2) to build `*.imba` files from source using [Vite](https://github.com/vitejs/vite).

## Quick start

### Create a sample directory and download the plugin

```sh
mkdir sample
cd sample
npm init
npm --dev add vite
npm --dev add @eulores/vite-plugin-imba
```

#### vite.config.js

Create or edit `vite.config.js` to add the `vite-plugin-imba` plugin

```js
import imbaPlugin from '@eulores/vite-plugin-imba';

export default {
  plugins: [imbaPlugin()],
  open: true,
  optimizeDeps: {
    exclude: ['imba'],
    include: ['imba/src/imba/index'],
  }
}
```

### Create some source files

#### ./index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imba project</title>
</head>
<body>
    <script src="./sample.imba"></script>
</body>
</html>
```

#### ./sample.imba

```html
// use TABS to indent the code. Check how you save the source in your editor!
tag app-root
    def render
        <self>
            <h1> "It works!"

imba.mount <app-root>
```

### Start developing your application.

`npx vite`

### Create a production build in ./dist

`npx vite build`
