# Análise de Code Smells e Refatorações

Este documento apresenta a identificação de Code Smells encontrados no backend e frontend do sistema Adote Fácil, bem como as refatorações aplicadas para melhoria da qualidade do código.

A análise foi realizada com apoio da ferramenta SonarLint no VS Code.

---

1. Unsafe Object Stringification

Arquivo: backend/src/controllers/animal/get-available.ts

Problema:
O SonarLint identificou risco de stringificação inadequada de objetos ao converter parâmetros da query utilizando String() diretamente.

Caso os valores fossem objetos, poderiam resultar em "[object Object]", comprometendo logs, validações e respostas da API.

Código original:

```typescript
gender: gender ? String(gender) : undefined
type: type ? String(type) : undefined
name: name ? String(name) : undefined
```

Refatoração aplicada:

```typescript
try {
  const genderParam =
    typeof gender === 'string' ? gender : undefined

  const typeParam =
    typeof type === 'string' ? type : undefined

  const nameParam =
    typeof name === 'string' ? name : undefined

  const result = await this.getAvailableAnimals.execute({
    userId: user?.id || '',
    gender: genderParam,
    type: typeParam,
    name: nameParam,
  })
}
```

Benefícios:

- Garantia de tipagem primitiva
- Evita stringificação incorreta
- Melhora confiabilidade da API
- Facilita manutenção futura

---

2. Mutable Props in React Component

Arquivo: frontend/src/components/AnimalCard/AnimalCard.tsx

Problema:
O SonarLint identificou que as props do componente não estavam definidas como somente leitura (readonly).

Isso permite que valores recebidos do componente pai sejam modificados internamente, violando o princípio de imutabilidade do React e podendo gerar efeitos colaterais inesperados.

Código original:

```typescript
interface AnimalCardProps {
  animal: {
    id: string
    name: string
    type: string
    gender: 'macho' | 'fêmea'
    race: string
    description: string
    images: Array<{
      id: string
      base64: string
    }>
  }
  listType: 'my-animals' | 'animals-available-to-adopt'
}
```

Refatoração aplicada:

```typescript
interface AnimalCardProps {
  readonly animal: {
    readonly id: string
    readonly name: string
    readonly type: string
    readonly gender: 'macho' | 'fêmea'
    readonly race: string
    readonly description: string
    readonly images: ReadonlyArray<{
      readonly id: string
      readonly base64: string
    }>
  }
  readonly listType: 'my-animals' | 'animals-available-to-adopt'
}
```

Benefícios:

- Garante imutabilidade das props
- Evita efeitos colaterais no componente
- Melhora previsibilidade do fluxo de dados
- Facilita manutenção e testes

---

3. Redundant React Fragment

Arquivo: frontend/src/components/AnimalFilterForm/AnimalFilterForm.tsx

Problema:
O SonarLint identificou que havia um Fragment (<></>) envolvendo apenas um único elemento filho.

Nesse caso, o Fragment é redundante e não traz benefício estrutural, apenas aumenta a verbosidade do JSX.

Código original:

```typescript
<>
  <S.Form onSubmit={handleSubmit(onSubmit)}>
    ...
  </S.Form>
</>
```

Refatoração aplicada:

```typescript
<S.Form onSubmit={handleSubmit(onSubmit)}>
  ...
</S.Form>
```

Benefícios:

- JSX mais limpo e direto
- Redução de código desnecessário
- Melhora legibilidade do componente
