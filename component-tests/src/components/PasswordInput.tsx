import * as React from 'react';
import { useState } from 'react';

interface PasswordInputProps {
  fieldName: string;
  zodRegister: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ fieldName, zodRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div data-testid="password-input">
      <label>Password</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          {...zodRegister(fieldName)}
        />
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)}
          style={{ marginLeft: '8px' }}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;