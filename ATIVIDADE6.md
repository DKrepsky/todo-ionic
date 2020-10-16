# Atividade 5: Sincronismo de tarefas com storage local

## Objetivo

Permitir o uso do aplicativo quando o usuário estiver offline.

## User Histories

### Persistência das tarefas

Ao abrir o aplicativo a lista de tarefas e apresentada ao usuário independente da conexão com a internet.
Todas as funcionalidades da aplicação devem estar disponíveis quando o usuário estiver offline.

### Falha no carregamento

Remover o botão de reconectar e as mensagens de conectando, o funcionamento do app deve ser transparente para o usuário no quesito conexão com o servidor.

## Instruções

Utilize o plugin [Storage](https://capacitorjs.com/docs/apis/storage) do capacitor para salvar a lista de tarefas no modo offline.

Durante a inicialização e encerramento da aplicação, sincronizar a lista de tarefas local com a do servidor.

Adicionar os campos created_at, updated_at e deleted_at nas tarefas para realizar o sincronismo com o servidor.
