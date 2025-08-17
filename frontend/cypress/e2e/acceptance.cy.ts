describe('Testes de Aceitação - Sistema de Adoção', () => {
    //
    //  Cadastro de Usuário
    //
    describe('Cadastro de Usuário', () => {
        it('Cenário Principal: deve cadastrar usuário e redirecionar para /login', () => {
            cy.intercept('POST', '/users', { statusCode: 201, body: { message: 'Created' } }).as('createUser')

            cy.visit('/cadastro')

            const unique = Date.now()
            cy.get('input[name="name"]').type('Teste')
            cy.get('input[name="email"]').type(`test+${unique}@example.com`)
            cy.get('input[name="password"]').type('password123')
            cy.get('input[name="confirmPassword"]').type('password123')

            cy.contains('button', 'Cadastrar').click()
            cy.wait('@createUser')

            cy.on('window:alert', (txt) => {
                expect(txt).to.match(/Cadastro efetuado com sucesso/i)
            })
            cy.url().should('include', '/login')
        })

        it('Cenário Alternativo: deve exibir erro quando as senhas não coincidem', () => {
            cy.visit('/cadastro')

            cy.get('input[name="name"]').type('Teste')
            cy.get('input[name="email"]').type('test@example.com')
            cy.get('input[name="password"]').type('password123')
            cy.get('input[name="confirmPassword"]').type('different')

            cy.contains('button', 'Cadastrar').click()
            cy.contains('As senhas não coincidem').should('be.visible')
        })
    })

    //
    //  Login
    //
    describe('Login', () => {
        it('Cenário Principal: deve realizar login e salvar usuário no localStorage', () => {
            cy.intercept('POST', '**/login', {
                statusCode: 201,
                body: { token: 'fake-token', user: { id: '1', name: 'Teste', email: 'test@example.com' } },
            }).as('login')

            cy.visit('/login')
            cy.get('input[name="email"]').type('test@example.com')
            cy.get('input[name="password"]').type('password123')
            cy.contains('button', 'Login').click()

            cy.wait('@login')
            cy.window().then((win) => {
                const user = JSON.parse(win.localStorage.getItem('user') || 'null')
                expect(user).to.have.property('email', 'test@example.com')
            })
        })

        it('Cenário Alternativo: deve exibir alerta ao tentar logar com credenciais inválidas', () => {
            cy.intercept('POST', '**/login', { statusCode: 401, body: { message: 'Invalid credentials' } }).as('loginFail')

            cy.visit('/login')
            cy.get('input[name="email"]').type('wrong@example.com')
            cy.get('input[name="password"]').type('wrongpass')

            const alerts: string[] = []
            cy.on('window:alert', (txt) => alerts.push(txt))

            cy.contains('button', 'Login').click()
            cy.wait('@loginFail')

            cy.wrap(null).then(() => {
                expect(alerts.length).to.be.greaterThan(0)
            })
            cy.url().should('include', '/login')
        })
    })

    //
    //  Lista de Animais Disponíveis
    //
    describe('Lista de Animais Disponíveis', () => {
        const gerarTokenFake = (expOffsetSeconds = 3600) => {
            const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' }))
                .toString('base64')
                .replace(/=+$/, '')
            const payload = Buffer.from(
                JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expOffsetSeconds })
            )
                .toString('base64')
                .replace(/=+$/, '')
            return `${header}.${payload}.`
        }

        beforeEach(() => {
            cy.visit('/')
            cy.setCookie('token', gerarTokenFake(), { path: '/' })
        })

        it('Cenário Principal: deve exibir lista de animais quando API retorna resultados', () => {
            const animals = [
                { id: 'a1', name: 'Sorriso', type: 'Cachorro', gender: 'Macho', race: 'SRD', description: 'Amigável', images: ['dGVzdA=='] },
                { id: 'a2', name: 'Python', type: 'Gato', gender: 'Fêmea', race: 'Siames', description: 'Calma', images: ['dGVzdA=='] },
            ]

            cy.intercept('GET', '**/animals/available**', { statusCode: 200, body: { animals } }).as('getAvailable')

            cy.visit('/area_logada/animais_disponiveis')
            cy.wait('@getAvailable')

            cy.contains('Sorriso').should('exist')
            cy.contains('Python').should('exist')
            cy.contains('button', 'Saiba mais').should('have.length.at.least', 1)
        })

        it('Cenário Alternativo: deve exibir mensagem quando não houver animais disponíveis', () => {
            cy.intercept('GET', '**/animals/available**', { statusCode: 200, body: { animals: [] } }).as('getAvailableEmpty')

            cy.visit('/area_logada/animais_disponiveis')
            cy.wait('@getAvailableEmpty')

            cy.contains('Desculpe, no momento não temos nenhum animal disponível para adoção').should('exist')
        })

        it('Cenário Alternativo: deve mostrar mensagem apropriada ao aplicar filtro sem resultados', () => {
            cy.intercept('GET', '**/animals/available**', (req) => {
                if (req.url.includes('?')) {
                    req.reply({ statusCode: 200, body: { animals: [] } })
                } else {
                    req.reply({
                        statusCode: 200,
                        body: { animals: [{ id: 'a1', name: 'Sorriso', type: 'Cachorro', gender: 'Macho', race: 'SRD', description: 'Ok', images: ['dGVzdA=='] }] },
                    })
                }
            }).as('getAvailableFilterDynamic')

            cy.visit('/area_logada/animais_disponiveis')
            cy.wait('@getAvailableFilterDynamic')

            cy.contains('Filtrar').click()
            cy.get('form').should('be.visible')

            cy.get('form').contains('Selecione um tipo').click()
            cy.get('[role="option"]').contains('Cachorro').click()

            cy.get('form').within(() => {
                cy.contains('button', 'Filtrar').click()
            })

            cy.contains('Desculpe, no momento não temos nenhum animal disponível para adoção').should('exist')
        })
    })
})