import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function TrustSwitch({ checked, onChange }) {
  const label = checked ? `Trusted` : `Trust`;

  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color={'secondary'}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
export default TrustSwitch;
