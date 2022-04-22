import React from 'react';
import { useTranslation } from 'react-i18next';

function HomePage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('pages.404.text')}</p>
    </div>
  );
}

export default HomePage;
