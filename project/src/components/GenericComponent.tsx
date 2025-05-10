import React from 'react';
import { useTranslation } from 'react-i18next';

const GenericComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('GenericComponentTitle')}</h1>
      <p>{t('GenericComponentDescription')}</p>
    </div>
  );
};

export default GenericComponent;
