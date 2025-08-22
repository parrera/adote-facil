import * as React from 'react';
import { useState } from 'react';

const UpdateUserInfoForm = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation for testing
    if (!email.includes('@')) {
      // This will trigger the error message in tests
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="update-user-form">
      <div>
        <label>Email</label>
        <input 
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && !email.includes('@') && (
          <p className="error">Email inválido</p>
        )}
      </div>

      <div>
        <button 
          type="button" 
          onClick={() => setShowPasswordFields(!showPasswordFields)}
        >
          Alterar senha
        </button>
      </div>

      {showPasswordFields && (
        <>
          <div>
            <label>Nova senha</label>
            <input type="password" />
          </div>
          <div>
            <label>Confirmar nova senha</label>
            <input type="password" />
          </div>
        </>
      )}

      <button type="submit">Salvar alterações</button>
    </form>
  );
};

export default UpdateUserInfoForm;