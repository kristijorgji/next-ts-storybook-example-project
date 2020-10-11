## Demo project
I try to create here a full inclusive demo project, properly organised for production ready.

This simple demo is one small blog with localisation, routing.

It includes the following added features/configurations
- next.js
- typescript
- storybook
- int18
- sass support
- styled components


## Getting Started

### Running the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Using storybook

```bash
yarn storybook
```

### Export static site

```bash
yarn export
```

Then all the generated html files will be out in the `out` folder


### Start production server

First is recommended to prerender anything for performance reason like
```bash
yarn build
```

Then run 
```bash
yarn start
```

The above command starts the prod server that will serve your next.js app.


## Licence

Just use it, give credit to https://github.com/kristijorgji for providing this demo
