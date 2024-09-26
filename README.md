# React native boilerplate with Expo

A bare minimal boilerplate for expo app.

- app initialization and assets loader
- basic navigation and screens so user can set his preferences for localization, theme and dark mode
- ready to go with your own libs (no store, no ui lib, just go)

## What's inside

Features:

- Dark mode
- Theme
- i18n ready - with 2 locales for example
- User preferences screens and storage (with i18n/theme/dark mode)

Comes with common dev tools:

- eslint
- prettier
- tests with jest
- husky / conventional commit
- local logger (you can extends with Sentry and so on)

Keep it bare so:

- No store (bring your own Redux, Zustand, ...). A Zustand one is used for Preferences and can easily be replaced or let working by its own.
- No ui librariry, just a few bare component (Typography, Box, Button, ...).
- No account nor business stuff

### Screenshots

[![Home](https://i.postimg.cc/rKwsdNPp/IMG-3620.png)](https://postimg.cc/rKwsdNPp)
[![Preferences](https://i.postimg.cc/2bdyWcY1/IMG-3621.png)](https://postimg.cc/2bdyWcY1)
[![Dark mode](https://i.postimg.cc/fSwLfcWB/IMG-3622.png)](https://postimg.cc/fSwLfcWB)
[![Themes](https://i.postimg.cc/hzRhfFkF/IMG-3623.png)](https://postimg.cc/hzRhfFkF)
[![Locale](https://i.postimg.cc/w3H7zp5L/IMG-3624.png)](https://postimg.cc/w3H7zp5L)
[![About](https://i.postimg.cc/75c5rJXZ/IMG-3625.png)](https://postimg.cc/75c5rJXZ)

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc` or `package.json`)
- Yarn (version specified in `package.json`)

### Installation

Clone the repository:

```sh
git clone https://github.com/tilap/expo-minimal-boilerplate.git
```

Install dependencies:

```sh
yarn install
```

Start the development server:

```sh
yarn start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
