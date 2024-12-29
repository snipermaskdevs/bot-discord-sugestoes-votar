# Bot de Sugestões para Discord

Este bot foi criado para gerenciar sugestões em um servidor do Discord. Ele permite que os membros sugiram ideias, que podem ser votadas positivamente ou negativamente pelos outros membros do servidor. Membros do staff têm a capacidade de encerrar a votação e marcar a sugestão como finalizada.

## Funcionalidades

- **Envio de Sugestões**: Membros podem enviar sugestões em um canal específico.
- **Votação**: As sugestões podem ser votadas positivamente (`👍`) ou negativamente (`👎`).
- **Encerramento de Sugestões**: O staff pode encerrar a votação utilizando o emoji `🔒`.
- **Exibição de Votação**: Exibe a quantidade de votos positivos, negativos e o total de votos, com porcentagens.

## Requisitos

- Node.js (v16 ou superior)
- Discord.js v14 ou superior
- Uma conta no Discord e um servidor com permissões de administrador para configurar o bot.

## Instalação

1. Clone o repositório para o seu computador:

    ```bash
    git clone https://github.com/snipermaskdevs/sugestoes-bot.git
    cd sugestoes-bot
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie um arquivo `.env` e defina o **token** do seu bot no Discord:

    ```env
    TOKEN=seu_token_aqui
    ```

4. Substitua as variáveis `canalSugestoesId` e `cargoStaffId` no código com os IDs corretos do seu canal de sugestões e cargo de staff.

    ```js
    const canalSugestoesId = 'ID_DO_CANAL_SUGESTOES';
    const cargoStaffId = 'ID_DO_CARGO_STAFF';
    ```

5. Execute o bot:

    ```bash
    node index.js
    ```

## Configuração do Discord

1. Crie um bot no [Portal de Desenvolvedores do Discord](https://discord.com/developers/applications).
2. Copie o **Token do Bot** e cole no arquivo `.env`.
3. Convide o bot para o seu servidor utilizando a URL de autorização gerada no portal de desenvolvedores.

### Permissões Necessárias para o Bot

Certifique-se de que o bot tem as permissões necessárias para:
- Ler e enviar mensagens.
- Reagir a mensagens.
- Gerenciar mensagens (para apagar sugestões).
- Enviar mensagens diretas para os usuários.

## Como Funciona

- **Sugestões**: As mensagens enviadas no canal de sugestões são processadas e transformadas em embeds.
- **Reações**: Os membros podem reagir com `👍`, `👎`, ou `🔒` para votar ou encerrar a votação.
- **Encerramento pelo Staff**: Somente membros com o cargo de staff podem encerrar a votação usando o emoji `🔒`.

## Licença
Copyright © Sniper Mask Dev |
Este projeto está licenciado sob a [MIT License](LICENSE).
