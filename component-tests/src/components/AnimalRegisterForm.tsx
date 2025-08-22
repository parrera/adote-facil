import * as React from 'react';
import { useState } from 'react';

const AnimalRegisterForm = () => {
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="animal-register-form">
      <div>
        <label>Tipo *</label>
        <input name="type" />
        {showValidation && <p className="error">O tipo é obrigatório</p>}
      </div>

      <div>
        <label>Gênero *</label>
        <select name="gender">
          <option value="">Selecione</option>
          <option value="macho">Macho</option>
          <option value="fêmea">Fêmea</option>
        </select>
        {showValidation && <p className="error">O gênero é obrigatório</p>}
      </div>

      <div>
        <label>Fotos *</label>
        <input type="file" multiple />
        {showValidation && <p className="error">Adicione ao menos uma foto do animal</p>}
      </div>

      <div>
        <label>Nome *</label>
        <input name="name" />
        {showValidation && <p className="error">O nome é obrigatório</p>}
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default AnimalRegisterForm;