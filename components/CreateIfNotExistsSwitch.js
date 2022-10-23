import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function CreateIfNotExistsSwitch({ checked, onChange }) {
  const label = checked ? `Resolve Only` : `Create new Post Quantum Key`;

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
export default CreateIfNotExistsSwitch;
