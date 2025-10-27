# Sweetify - Frontend

Site para venda de docinhos artesanais.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── Home/             # Página inicial
│   ├── NotFound/         # Página 404
│   └── layouts/          # Layouts compartilhados
├── core/                  # Componentes e utilitários globais
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/              # Configurações de bibliotecas
│   ├── utils/            # Funções utilitárias
│   ├── constants/        # Constantes da aplicação
│   └── types/            # Tipos TypeScript globais
├── domain/               # Domínios de negócio (a serem implementados)
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Lint
npm run lint
```

## Configuração

1. Copie `.env.example` para `.env`
2. Configure as variáveis de ambiente:
   - `VITE_API_URL`: URL da API backend
   - `VITE_API_VERSION`: Versão da API (padrão: v1)
   - `VITE_API_TIMEOUT`: Timeout das requisições em ms (padrão: 30000)

## Desenvolvimento

O projeto segue uma arquitetura modular baseada em domínios:

- **app/**: Configuração inicial da aplicação
- **pages/**: Componentes de página para rotas
- **core/**: Funcionalidades compartilhadas entre domínios
- **domain/**: Lógica de negócio organizada por domínio funcional

### Convenções

- Componentes em PascalCase
- Arquivos de implementação: `main.tsx`
- Tipos: `types.ts`
- Estilos: `variants.ts`
- Exports centralizados: `index.ts`

## API

O frontend se comunica com a API REST através de dois clientes:

- `publicClient`: Endpoints públicos (`/api/v1/external`)
- `authenticatedClient`: Endpoints autenticados (`/api/v1/internal`)

Ambos configurados em `src/core/lib/api.ts`.