# Stripe with Next.js, Typescript and Tailwind example

This is a really simple project that implements the usage of the Stripe APIs

## How to run

```bash
npm i && npm run dev
```


## Project template
```bash
    PROJECTNAME="my-project-name"
    npx create-next-app ${PROJECTNAME} --example with-typescript
    cd ${PROJECTNAME}
    npm i -D postcss-preset-env tailwindcss
    npx tailwind init
    touch postcss.config.js
    echo "
module.exports = { 
  plugins: [ 
    'tailwindcss',
    'postcss-preset-env',
  ],
}
    " > postcss.config.js
    mkdir styles 
    touch styles/global.css
    echo "
@tailwind base;
@tailwind components;
@tailwind utilities;
    " > styles/global.css
    touch pages/_app.tsx
    echo "
import React from 'react'
import { AppProps } from 'next/app'

import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
    " > pages/_app.tsx
    npm i -D typescript@latest
```