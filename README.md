# Dimer demo app

The application using `Dimer` to generate documentation and serve it over HTTP and uses `Nuxt` to consume the API and display it as HTML.

## How to run?

1. `cd` in to the project root.
2. Run `dimer serve` to start the dimer process.
3. `cd` into `nuxt-app`
4. Run `npm install` to install dependencies
5. Run `npm run dev` to run the nuxt app.

## What are we trying to achieve?
When we change the `markdown` file, it tells dimer process about the change and not the Nuxt process. We want somehow (if possible) to tell the nuxt process about the change and do hot-reload.