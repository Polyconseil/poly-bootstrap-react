# React bootstrap
  - typescript@4.6.3
  - react@18
  - react-router-dom@6
  - mui@5 with dark-theme support
  - webpack@5 build system
  - i18n ready
  - date-fns library for date-time manipulation
  - lint & prettier enabled

## Development server
```sh
yarn install
yarn start
```

## Production server
```sh
yarn install
yarn build
python3 -m http.server 9001 -d ./dist
```