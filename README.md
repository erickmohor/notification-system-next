# Live Demo
https://message-notification-system-erickm.vercel.app/

# Descrição do projeto
Projeto feito como forma de teste da Vibbra (https://vibbra.com.br/). Esse teste é de Fullstack.
Esse projeto tem como finalidade ser uma plataforma única de notificações (web push, sms, e-mail).

# Funcionalidades
Atualmente o backend funciona somente para requisições via HTTP pelo frontend, porém sua estrutura permite facilmente a implementação de requisições via API.

Já no frontend é possível:

## Configurar
APLICATIVO
- Configurar o nome do aplicativo
- Selecionar os canais desejados de integração

### WEB PUSH
Configurar as notificações Web Push, fornecendo:
````
- Nome do site;
- Endereço do site;
- Ícone do site;
- Mensagem de solicitação de permissão;
- Texto dos botões de permitir e negar permissão;
- Título de Boas Vindas
- Mensagem de Boas Vindas
- Habilitar ou desabilitar o link de destino;
- Link de destino.
````

### SMS
Configurar as notificações SMS, fornecendo:
````
- Provedor de SMS integrado;
- Login;
- Senha.
````

### E-MAIL
Configurar as notificações E-mail, fornecendo:
````
- Nome do servidor SMTP;
- Porta de envio;
- Login;
- Senha;
- Dados de envio;
- Nome do remetente;
- Email do remetente;
- Upload de templates em formato .html.
````

## Histórico
Nessa tela aparecem o histórico de todas as notificações enviadas pelo usuário.
É possível filtrar por: período de datas, canal de envio e origem de envio (disparo via plataforma ou API).
Ao clicar em um item, é possível ver todas as informações detalhadas da mensagem, como: canal de envio, data e hora de envio, confirmação de leitura e conteúdo da notificação.

## Enviar notificações
Nessa parte, é possível enviar as notificações. Confira abaixo os itens que compõem cada notificação.

WEB PUSH
- Audiência (atualmente, somente usuários já inscritos);
- Título da mensagem;
- Texto da mensagem;
- Image do ícone;
- Link de destino.

SMS
- Telefone dos usuários;
- Texto da mensagem.

EMAIL
- Emails dos destinatários;
- Opção de selecionar template (upado na tela de configurações).


# Tech Stack
**Frontend:** Next, Typescript
**Backend:** Node, Fastify, Typescript, Mongoose
**Database:** MongoDB


# Dependências
React Hook Form, Nookies, Toastfy, Zod, Date-fns, Eslint, entre outros.


# Variáveis de ambiente
## Frontend
NEXT_PUBLIC_API_URL (URL do servidor backend)

## Backend
NODE_ENV
JWT_SECRET
DATABASE_URL (URL do banco de dados MongoDB)

# Para rodar localmente (frontend)
Clone o diretório
```bash
  git clone 
```

Vá no diretório do projeto
```bash
  cd message-notification-system
```

Instale as dependências

```bash
  npm install
```

Com as variáveis de ambiente preenchidas, inicie o servidor

```bash
  npm run dev
```

# Para rodar localmente (backend)
Clone o diretório
```bash
  git clone 
```

Vá no diretório do projeto
```bash
  cd message-notification-system-server
```

Instale as dependências

```bash
  npm install
```

Com as variáveis de ambiente preenchidas, inicie o servidor

```bash
  npm run start:dev
```