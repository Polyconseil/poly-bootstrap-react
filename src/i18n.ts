import i18next, { ReadCallback } from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .use({
    type: 'backend',
    read: (language: string, namespace: string, callback: ReadCallback) => {
      import(`./locales/${language}_${namespace}.json`)
        .then((resources) => {
          callback(undefined, resources);
        })
        .catch((error) => {
          callback(error, false);
        });
    },
  })
  .init({
    fallbackLng: ['fr', 'en'],
  });
