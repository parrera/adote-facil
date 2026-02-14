# Code Smells e Refatorações
## Análise com SonarQube Cloud

Foi realizada a análise do projeto utilizando o SonarQube Cloud, integrado ao repositório GitHub.
A ferramenta identificou problemas de code smells relacionados principalmente à manutenibilidade do sistema, incluindo:

- Operadores ternários aninhados
- Uso de índice como chave em listas React
- Lógica JSX complexa que prejudica leitura

## Code Smells Identificados
### 1. Uso de índice como key em lista React

Arquivo:
frontend/src/app/area_logada/animais_disponiveis/[id]/AnimalDetailsPage.tsx

- Linha: 67
- Regra Sonar: Do not use Array index in keys
- Qualidade impactada: manutenibilidade e performance
- Severidade: média

#### Código original

```typescript
{animal.images.map((image, index) => (
  <S.AnimalPictureSwiperSlide key={index}>
    <Image
      src={`data:image/jpeg;base64,${image}`}
      alt="Animal"
      fill={true}
      objectFit="cover"
    />
  </S.AnimalPictureSwiperSlide>
))}
```

#### Problema
Usar índice como chave pode gerar bugs visuais, faz React recriar elementos, quebra preservação de estado e reduz performance.

#### Refatoração aplicada

```typescript
{animal.images.map((image) => (
  <S.AnimalPictureSwiperSlide key={image}>
    <Image
      src={`data:image/jpeg;base64,${image}`}
      alt="Animal"
      fill={true}
      objectFit="cover"
    />
  </S.AnimalPictureSwiperSlide>
))}
```
Agora a chave usa a própria string da imagem, garantindo estabilidade na renderização.

### 2. Operador ternário aninhado no JSX

Arquivo:
frontend/src/app/area_logada/animais_disponiveis/AvailableAnimalsPage.tsx

- Linha: 81–93
- Regra Sonar: Ternary operators should not be nested
- Qualidade impactada: manutenibilidade
- Severidade: média

#### Código original

```typescript
{loading ? (
  <p>Carregando...</p>
) : availableAnimals.length ? (
  <S.AnimalsListWrapper>
    {availableAnimals.map((animal) => (
      <AnimalCard
        key={animal.id}
        animal={animal}
        listType="animals-available-to-adopt"
      />
    ))}
  </S.AnimalsListWrapper>
) : (
  <EmptyAnimals page="animals-available-to-adopt" />
)}
```
#### Problema
O JSX utiliza ternários aninhados, o que dificulta leitura do componente,
aumenta complexidade cognitiva e dificulta manutenção futura.

#### Refatoração aplicada

```typescript
const renderAnimals = () => {
  if (loading) {
    return <p>Carregando...</p>
  }

  if (availableAnimals.length > 0) {
    return (
      <S.AnimalsListWrapper>
        {availableAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            listType="animals-available-to-adopt"
          />
        ))}
      </S.AnimalsListWrapper>
    )
  }

  return <EmptyAnimals page="animals-available-to-adopt" />
}
```
Agora o JSX principal fica apenas:
{renderAnimals()}. Fazendo com que a lógica seja isolada em função auxiliar, melhorando legibilidade e organização.

### 3. Operador ternário complexo na página de chat

Arquivo:
frontend/src/app/[...active-chat-id]/UserChatsPage.tsx

- Linha: 107–111
- Regra Sonar: Extract this nested ternary operation into an independent statement
- Qualidade impactada: manutenibilidade
- Severidade: média

#### Código original

```typescript
{chat.messages.length ? (
  chat.messages[0].senderId === loggedUser?.id ? (
    <ArrowUp size={16} />
  ) : (
    <ArrowDown size={16} />
  )
) : null}
```

#### Problema

O componente possui ternário dentro de ternário o que dificulta leitura do componente,
aumenta complexidade cognitiva e dificulta manutenção futura.

#### Refatoração aplicada

```typescript
const renderMessageArrow = () => {
  if (!chat.messages.length) return null

  const firstMessage = chat.messages[0]

  if (firstMessage.senderId === loggedUser?.id) {
    return <ArrowUp size={16} />
  }

  return <ArrowDown size={16} />
}
```
Uso no JSX: {renderMessageArrow()}