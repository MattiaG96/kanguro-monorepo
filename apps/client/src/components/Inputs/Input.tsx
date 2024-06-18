import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

const CustomInput = styled.input`
  width: 100%;
  outline: none;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #acacac;
  background: white;
  color: black;
`;

interface InputProps {
  placeholder?: string;
  id?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ placeholder, id, value, onChange }) => {
  return (
    <CustomInput
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type="text"
    />
  );
};
