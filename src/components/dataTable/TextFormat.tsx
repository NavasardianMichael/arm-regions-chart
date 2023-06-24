import { FC } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

type T_Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ value, onChange }) => {
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    box-sizing: border-box;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  return (
    <StyledTextarea
      aria-label="minimum height"
      minRows={16}
      placeholder="Paste your data here"
      value={value}
      onChange={onChange}
    />
  );
}