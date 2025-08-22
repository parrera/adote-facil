

// Simple mock component for testing only
const AnimalCard = ({ animal, listType }: any) => {
  return (
    <div data-testid="animal-card">
      <h3>{animal.type}</h3>
      <p>{animal.gender}</p>
      <p>{animal.race}</p>
      
      {listType === 'animals-available-to-adopt' && (
        <button>Saiba mais</button>
      )}
      
      {listType === 'my-animals' && (
        <>
          <button>Confirmar adoção</button>
          <button>🗑️</button>
        </>
      )}
    </div>
  );
};

export default AnimalCard;