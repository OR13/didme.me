import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function KeyTypeRadioButtons({ value, onChange, options }) {
  return (
    <FormControl>
      <FormLabel id="pqc-alg-group-label">Post Quantum Cryptography</FormLabel>
      <RadioGroup
        row
        aria-labelledby="pqc-alg-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => {
          return (
            <FormControlLabel
              key={opt.alg}
              value={opt.alg}
              control={<Radio />}
              label={opt.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
