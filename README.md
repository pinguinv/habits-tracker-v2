# Habits Tracker v2

I decided to rewrite my first ***Habits tracker*** project in Angular.  
The first version's frontend was a mess (my bad 😅), so I'm making it cleaner and better this time.

Focusing on frontend for now, backend comes later.

## Tools & technologies used 🛠️

### Frontend

* [Angular 20](https://angular.dev/)
* [Angular Material Components](https://material.angular.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Nx](https://nx.dev/) & [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

#### Future Plans

* Maybe add [NgRx Signal Store](https://ngrx.io/guide/signals/signal-store) for state management.

### Backend

Will use **Spring** like v1, but I'll try to make it more elgant and simpler this time. 😋

## Project Setup ⚙️

To install dependencies, use the `--legacy-peer-deps` option to avoid npm errors. Note that `@ngrx/signals@19.2.1` is not yet updated for Angular 20 but works fine. [Learn more about this issue »](https://github.com/ngrx/platform/issues/4787)

```sh
npm install --legacy-peer-deps
```

*Note: Use `npx` before below commands if **Nx** isn't installed globally.*

## Run Development Server 🖥️

Launch the development server:

```sh
nx serve 
```

## Build the Project 🏗️

Create a production build:

```sh
nx build 
```

## Unit Tests 🧪

Run Angular unit tests:

```sh
nx run test
```

## E2E Tests 🛡️

Run end-to-end tests with Cypress:

```sh
nx e2e e2e
```

## Tip 💡

Get the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) Extension for VS Code. It makes running Nx commands way easier. 😉
