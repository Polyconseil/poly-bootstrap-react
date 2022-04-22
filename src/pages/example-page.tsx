import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ExamplePage(): JSX.Element {
  const { t } = useTranslation();
  const [value, setValue] = useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div>
      <p>{t('pages.example.text')}</p>
      <DateTimePicker
        value={value}
        onChange={handleChange}
        renderInput={(parameters) => <TextField {...parameters} />}
      />
    </div>
  );
}

export default ExamplePage;
