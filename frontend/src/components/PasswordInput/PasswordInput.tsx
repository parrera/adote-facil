import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useState } from 'react';

import * as S from './PasswordInput.styles';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  fieldName: Path<T>;
  zodRegister: UseFormRegister<T>;
}

export function PasswordInput<T extends FieldValues>({
  fieldName,
  zodRegister,
}: InputProps<T>) {
  const [inputType, setInputType] = useState('password');

  const handleChangeInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <S.Wrapper>
      <input type={inputType} {...zodRegister(fieldName)} />
      <button type="button" onClick={handleChangeInputType}>
        {inputType === 'password' ? <Eye /> : <EyeSlash />}
      </button>
    </S.Wrapper>
  );
}
