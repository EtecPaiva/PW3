# Testes de integração — Vitest + SuperTest + MySQL

Estes são arquivos de teste para adicionar à API original. Eles não pedem alterações em `index.js`, nos serviços, no arquivo de conexão, no `package.json`, no `package-lock.json`, na interface ou no SQL original.

## Requisitos

- Node.js instalado.
- MySQL ligado.
- Banco `atividade_pw` e tabelas `usuarios` e `tarefas` criados/importados a partir do arquivo SQL original.
- Credenciais em `data/index.js` válidas.
- Porta `3000` livre. Feche uma instância da API que já esteja executando, pois o teste inicia o `index.js` original como processo separado.

## Instalar as ferramentas sem editar os arquivos de dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install --no-save --package-lock=false vitest supertest
```

## Executar os testes

```bash
npx vitest run tests/tarefas.test.js
```

## O que será testado

1. Envia uma requisição real para cadastrar uma tarefa e consulta o MySQL para confirmar que o registro foi salvo.
2. Envia uma tarefa sem título, confirma o código HTTP `400` e verifica que não houve inserção.
3. Consulta um ID confirmado como inexistente no MySQL e verifica o código HTTP `404`.

Os testes não usam mocks: fazem requisições às rotas reais e consultam o banco de dados. Antes de começar, criam um usuário temporário com e-mail único. Ao terminar, removem apenas as tarefas e o usuário temporário criados por esta suíte.

Se houver falha, confirme o MySQL, o nome do banco, as tabelas, as credenciais e se a porta 3000 está livre. A execução completa precisa ser validada no computador com o banco ligado.
