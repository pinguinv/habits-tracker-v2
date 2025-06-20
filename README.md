# HabitsTrackerV2

I decided to rewrite my first 'Habits tracker' project in Angular.  
Fronted in the first version was made by some silly goopher back then (*me*) and from the time perspective it looks terrible so I want to make it look not as bad in this project. 😅

Generally now I'm working only on frontend, backend will be introduced later.

## Tools & technologies used 🛠️

### Frontend

* Nx & NxCLI for VS Code
* Angular 20
* Angular material components
* TailwindCSS

Might add in the future:

* SignalStore

### Backend

Gonna be made in Spring like the first version, but I'll try to make it more elgant and simpler. 😋

## Some Commands

*Note: Prefix all commands with `npx` if you don't have **nx** installed.*

Run the dev server:

```sh
nx serve 
```

Create a production bundle:

```sh
nx build 
```

Run Angular's unit tests:

```sh
nx run test
```

Run e2e test with Cypress:

```sh
nx e2e e2e
```

Generally, I recommend downloading and installing [Nx CLI Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console).  
It makes life much easier. 😉
