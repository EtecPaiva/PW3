Claro — abaixo está um prompt completo, pensado para colar em uma ferramenta de geração de interfaces no Figma/Figma Make, usando a API que você forneceu como base funcional.

 Prompt para criação do aplicativo mobile de gestão de treinamentos

Crie uma aplicação **mobile-first, responsiva e funcional de gestão de treinamentos corporativos**, baseada na especificação da API fornecida abaixo.

 A aplicação deve ter aparência de um produto corporativo moderno, premium e confiável, voltado para empresas que precisam administrar funcionários, treinamentos, instrutores, participantes, certificados, evidências, assinaturas e permissões.

 ## 1\. Direção visual

 Crie uma identidade visual sofisticada utilizando:

 - **Roxo como cor principal**.
- **Dourado** para detalhes, destaques, indicadores e elementos premium.
- **Vermelho** para alertas, erros, cancelamentos e situações críticas.
- Branco, cinza e tons neutros para superfícies no tema claro.
- Tons de roxo profundo, preto e cinza escuro no tema escuro.
- Bordas discretas, sombras suaves e cards com cantos arredondados.
- Tipografia moderna, altamente legível e adequada para dispositivos móveis.
- Ícones simples e consistentes.
- Hierarquia visual clara.
- Espaçamento confortável para uso com toque.
- Aparência profissional, evitando excesso de elementos decorativos.

 Sugestão de paleta:

 **Tema claro**

 - Primary: #6D28D9
- Primary Dark: #4C1D95
- Gold: #D4A72C
- Gold Light: #F3D77A
- Red: #DC2626
- Background: #F7F7FA
- Surface: #FFFFFF
- Text: #17131F
- Secondary Text: #6B6575
- Border: #E5E1EA

 **Tema escuro**

 - Primary: #8B5CF6
- Primary Dark: #6D28D9
- Gold: #E2B93B
- Red: #EF4444
- Background: #100D16
- Surface: #1A1622
- Surface Elevated: #241E2E
- Text: #F8F7FA
- Secondary Text: #B5ADBF
- Border: #352D40

 O usuário deve conseguir alternar entre **tema claro e tema escuro** através de um botão de troca de tema acessível nas configurações e também, se apropriado, no cabeçalho.

 ## 2\. Plataforma

 A interface deve ser prioritariamente para **smartphones**, mas deve se adaptar a diferentes tamanhos de tela.

 Criar componentes responsivos para:

 - iPhone.
- Android.
- Smartphones pequenos.
- Smartphones grandes.
- Tablets, quando houver espaço suficiente.

 Utilizar navegação inferior no mobile com:

 - Início
- Treinamentos
- Certificados
- Perfil

 Adicionar botão/menu "Mais" para funcionalidades administrativas.

 ## 3\. Autenticação

 Criar uma tela de login moderna.

 Elementos:

 - Logo/nome da empresa.
- Título: "Bem-vindo de volta"
- Campo de e-mail.
- Campo de senha.
- Botão "Entrar".
- Opção para mostrar/ocultar senha.
- Mensagem de erro para credenciais inválidas.
- Estado de carregamento.
- Link "Esqueci minha senha".
- Identidade visual roxa com detalhes dourados.

 Utilizar:

 POST `/api/login`

 Request:

```
{
  "email": "carlo.souza@empresa.com",
  "senha": "senhaSegura123"
}
```

 Após login, armazenar o token retornado e utilizar:

 `Authorization: Bearer token-fake`

 ## 4\. Dashboard

 Criar uma tela inicial personalizada.

 No topo:

 - Saudação: "Olá, Carlos!"
- Nome do funcionário.
- Avatar.
- Ícone de notificações.
- Atalho para alternar tema.

 Exibir cards resumidos:

 - Funcionários.
- Treinamentos.
- Instrutores.
- Certificados.

 Utilizar:

 GET `/api/dashboard`

 Exemplo:

```
{
  "quantidadeFuncionarios": 1,
  "quantidadeUsuarios": 1,
  "quantidadeTreinamentos": 1,
  "quantidadeInstrutores": 1,
  "quantidadeCertificados": 1
}
```

 Abaixo dos indicadores, mostrar:

 - Próximos treinamentos.
- Treinamentos em andamento.
- Certificados recentes.
- Alertas importantes.
- Atalhos rápidos.

 ## 5\. Tela "Meus treinamentos"

 Criar uma lista visual de treinamentos.

 Cada card deve mostrar:

 - Nome do treinamento.
- Status.
- Data.
- Horário.
- Carga horária.
- Instrutor.
- Indicador de progresso.
- Badge de status.

 Status:

 - Pendente — dourado.
- Em andamento — roxo.
- Concluído — verde.
- Cancelado — vermelho.

 Utilizar:

 GET `/api/treinamentos`

 Permitir filtros por:

 - Status.
- Data.
- Busca por nome.

 Adicionar campo de pesquisa no topo.

 ## 6\. Detalhes do treinamento

 Ao tocar em um treinamento, abrir uma tela detalhada.

 Mostrar:

 - Título.
- Descrição.
- Status.
- Data de início.
- Data de término.
- Carga horária.
- Instrutores.
- Responsáveis.
- Participantes.
- Evidências.
- Assinaturas.
- Certificados relacionados.

 Utilizar:

 GET `/api/treinamentos/{id}/completo`

 Criar seções expansíveis para não deixar a interface excessivamente longa.

 Adicionar ações contextuais de acordo com as permissões do usuário.

 ## 7\. Participantes

 Criar tela de participantes de um treinamento.

 Mostrar:

 - Nome.
- Matrícula.
- Cargo.
- Status.
- Data de inscrição.
- Situação da conclusão.

 Status:

 - Pendente.
- Aprovado.
- Reprovado.

 Utilizar:

 GET `/api/treinamentoParticipantes`

 Permitir filtro por:

 - treinamentoId
- funcionarioId

 Permitir, para usuários autorizados:

 - Inscrever participante.
- Alterar status.
- Remover participante.

 ## 8\. Funcionários

 Criar módulo administrativo de funcionários.

 Lista com:

 - Avatar.
- Nome.
- Matrícula.
- Cargo.
- Setor.

 Ações:

 - Visualizar.
- Criar.
- Editar.
- Excluir.

 Endpoints:

 GET `/api/funcionarios`

 POST `/api/funcionarios`

 GET `/api/funcionarios/{id}`

 PUT `/api/funcionarios/{id}`

 PATCH `/api/funcionarios/{id}`

 DELETE `/api/funcionarios/{id}`

 Utilizar modal ou tela própria para criação/edição.

 ## 9\. Instrutores

 Criar módulo de instrutores.

 Mostrar:

 - Nome.
- Especialidade.
- Registro profissional.
- E-mail.
- Indicador "Interno" ou "Externo".

 Permitir:

 - Criar.
- Editar.
- Visualizar.
- Excluir.

 Endpoints:

 GET `/api/instrutores`

 POST `/api/instrutores`

 GET `/api/instrutores/{id}`

 PUT `/api/instrutores/{id}`

 PATCH `/api/instrutores/{id}`

 DELETE `/api/instrutores/{id}`

 ## 10\. Certificados

 Criar uma área de certificados com aparência mais premium.

 Cada certificado deve aparecer em um card com:

 - Número.
- Nome do treinamento.
- Funcionário.
- Data de emissão.
- Data de validade.
- Status.

 Status:

 - Válido.
- Expirado.
- Cancelado.

 Usar dourado de maneira elegante para destacar certificados válidos.

 Endpoints:

 GET `/api/certificados`

 GET `/api/certificados/{id}`

 GET `/api/certificados/{id}/completo`

 Criar uma tela de detalhes do certificado com aparência semelhante a um certificado digital.

 Adicionar botão:

 "Visualizar certificado"

 "Compartilhar"

 "Baixar"

 ## 11\. Evidências

 Criar módulo para evidências dos treinamentos.

 Tipos possíveis:

 - Foto.
- Vídeo.
- Documento.

 Exibir miniaturas quando possível.

 Utilizar:

 GET `/api/evidencias`

 POST `/api/evidencias`

 GET `/api/evidencias/{id}`

 PUT `/api/evidencias/{id}`

 PATCH `/api/evidencias/{id}`

 DELETE `/api/evidencias/{id}`

 ## 12\. Assinaturas

 Criar interface para controle de assinaturas.

 Mostrar:

 - Participante.
- Tipo.
- Data da assinatura.
- Status.
- Hash.

 Permitir registrar assinatura quando o usuário tiver permissão.

 Utilizar:

 GET `/api/assinaturas`

 POST `/api/assinaturas`

 GET `/api/assinaturas/{id}`

 ## 13\. Administração

 Criar área administrativa acessível somente de acordo com as permissões do usuário.

 Menu:

 - Funcionários.
- Usuários.
- Instrutores.
- Perfis.
- Permissões.
- Vínculos.
- Auditoria.

 ## 14\. Usuários e permissões

 Criar gerenciamento de:

 - Usuários.
- Perfis.
- Permissões.
- Usuário ↔ Perfil.
- Perfil ↔ Permissão.

 Utilizar os endpoints:

 `/api/usuarios`

 `/api/perfis`

 `/api/permissoes`

 `/api/usuarioPerfis`

 `/api/perfilPermissoes`

 A interface deve respeitar o conceito de RBAC.

 Cada ação deve verificar se o usuário possui a permissão correspondente.

 Exemplos:

 - TREINAMENTOS:LISTAR
- TREINAMENTOS:CRIAR
- FUNCIONARIOS:LISTAR
- FUNCIONARIOS:CRIAR

 Não exibir ações que o usuário não possui autorização para executar.

 ## 15\. Auditoria

 Criar tela de auditoria com timeline.

 Cada evento deve mostrar:

 - Data.
- Usuário.
- Entidade.
- Ação.
- Detalhes.

 Utilizar:

 GET `/api/auditorias`

 Permitir filtros por:

 - Entidade.
- Usuário.
- Data.

 Visualmente, utilizar uma timeline vertical elegante.

 ## 16\. Perfil do usuário

 Criar tela "Meu perfil".

 Mostrar:

 - Avatar.
- Nome.
- E-mail.
- Matrícula.
- Cargo.
- Setor.
- Perfis de acesso.
- Status da conta.

 Utilizar:

 GET `/api/me`

 Também incluir:

 - Configurações.
- Tema claro/escuro.
- Notificações.
- Privacidade.
- Sair.

 ## 17\. Estados da interface

 Criar estados completos para todas as telas:

 - Loading.
- Skeleton loading.
- Empty state.
- Error state.
- Success state.
- Confirmation modal.
- Toast de sucesso.
- Toast de erro.
- Offline.
- Sem permissão.
- Registro não encontrado.

 Exemplos:

 "Você ainda não possui treinamentos."

 "Treinamento carregado com sucesso."

 "Não foi possível carregar os dados."

 "Você não possui permissão para realizar esta ação."

 ## 18\. Componentes

 Criar uma biblioteca de componentes reutilizáveis no Figma:

 - Buttons.
- Icon buttons.
- Inputs.
- Selects.
- Search bar.
- Cards.
- Status badges.
- Avatars.
- Bottom navigation.
- Top navigation.
- Tabs.
- Chips.
- Modals.
- Bottom sheets.
- Toasts.
- Alerts.
- Skeletons.
- Empty states.
- Error states.
- Data cards.
- Training cards.
- Certificate cards.
- User cards.
- Employee cards.

 Criar variantes dos componentes para:

 - Light.
- Dark.
- Default.
- Hover.
- Pressed.
- Disabled.
- Loading.
- Error.
- Success.

 ## 19\. Navegação

 Criar fluxo completo:

 Splash → Login → Dashboard

 Dashboard → Treinamentos → Detalhes → Participantes/Evidências/Certificado

 Dashboard → Certificados → Detalhes

 Dashboard → Perfil → Configurações

 Menu administrativo → Funcionários

 Menu administrativo → Instrutores

 Menu administrativo → Usuários

 Menu administrativo → Perfis

 Menu administrativo → Permissões

 Menu administrativo → Auditoria

 Implementar navegação por bottom navigation no mobile.

 ## 20\. Responsividade

 A interface deve ser projetada primeiro para mobile.

 Utilizar Auto Layout, constraints e componentes reutilizáveis.

 Não criar telas simplesmente reduzidas de uma versão desktop.

 Em telas maiores:

 - Expandir cards.
- Utilizar grids.
- Transformar listas em tabelas quando houver espaço.
- Utilizar sidebar em vez de bottom navigation quando apropriado.

 ## 21\. Experiência do usuário

 Priorizar:

 - Poucos toques para ações frequentes.
- Hierarquia visual clara.
- Feedback imediato.
- Navegação previsível.
- Botões grandes o suficiente para toque.
- Formulários simples.
- Busca rápida.
- Filtros acessíveis.
- Confirmação antes de ações destrutivas.

 Excluir deve sempre apresentar confirmação.

 ## 22\. Tema claro e escuro

 Implementar o tema como uma variável global.

 Criar:

 `Theme / Light`

 `Theme / Dark`

 Todos os componentes devem responder automaticamente à alteração do tema.

 O botão deve possuir uma animação visual suave entre:

 ☀️ Tema claro

 🌙 Tema escuro

 O dourado deve continuar legível nos dois temas.

 ## 23\. API e comportamento funcional

 Considerar como base funcional todos os endpoints da API fornecida.

 Base URL:

 `http://localhost:3000`

 A aplicação deve trabalhar com:

 - GET.
- POST.
- PUT.
- PATCH.
- DELETE.

 Implementar tratamento dos códigos:

 -
  200.
-
  201.
-
  404.
-
  401.
-
  403.
-
  409.
- 422/erro de validação.
-
  500.

 Mensagens devem ser apresentadas de forma amigável ao usuário.

 ## 24\. Dados e relacionamentos

 Respeitar os relacionamentos:

 Funcionário → Usuário

 Usuário → Perfil

 Perfil → Permissões

 Treinamento → Responsáveis

 Treinamento → Instrutores

 Treinamento → Participantes

 Participante → Funcionário

 Participante → Assinaturas

 Participante → Certificado

 Treinamento → Evidências

 Usuário → Auditorias

 ## 25\. Entregável no Figma

 Crie:

 1. Design System.
2. Variáveis de cores.
3. Variáveis tipográficas.
4. Componentes reutilizáveis.
5. Tema claro.
6. Tema escuro.
7. Todas as telas principais.
8. Estados de loading.
9. Estados vazios.
10. Estados de erro.
11. Modais.
12. Bottom sheets.
13. Fluxos de navegação.
14. Protótipo navegável.
15. Layouts responsivos.
16. Auto Layout em todos os componentes possíveis.
17. Componentes com variantes.
18. Interações de troca de tema.
19. Fluxo completo de login.
20. Fluxo completo de consulta e gerenciamento de treinamentos.

 O resultado deve parecer um **aplicativo corporativo real pronto para desenvolvimento**, e não apenas um conjunto de telas conceituais.

 Priorize uma experiência visual premium, limpa e moderna, utilizando **roxo como identidade principal, dourado como elemento de destaque e vermelho para estados críticos**, com excelente acessibilidade, contraste e legibilidade.