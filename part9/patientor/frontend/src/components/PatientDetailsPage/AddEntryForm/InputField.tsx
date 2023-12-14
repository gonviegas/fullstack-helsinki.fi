import { Input, InputLabel } from '@mui/material';

interface Props {
  label?: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}

const InputField = ({ label, value, type, onChange }: Props) => {
  return (
    <div style={{ flex: '0 100%' }}>
      {label && <InputLabel style={{ marginTop: '1em' }}>{label}</InputLabel>}
      <Input
        fullWidth
        type={type}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};

export default InputField;
