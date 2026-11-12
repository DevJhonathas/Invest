# Invest.

Plataforma de acompanhamento de investimentos voltada inicialmente ao mercado financeiro brasileiro. O objetivo é reunir cotações, acompanhamento de carteira e alertas personalizados de valorização em uma interface simples, responsiva e fácil de entender.

> **Status:** em desenvolvimento. A primeira etapa contempla a construção do frontend. Backend, banco de dados, integração com provedores de cotações e autenticação real serão implementados posteriormente.


<p align="center">
<img width="48%" src="https://github.com/user-attachments/assets/5b929471-2c22-4203-9883-25f3be5c88e0" />
<img width="48%" src="https://github.com/user-attachments/assets/747ebbea-c126-4bd0-bdb4-e630dbf20975" />
</p>


## Objetivo do projeto

O Invest. pretende ajudar o usuário a acompanhar seus investimentos sem precisar monitorar cada ativo manualmente durante todo o dia.

Além de consultar ações e outros ativos, o usuário poderá registrar suas operações, visualizar a evolução da carteira e configurar uma meta percentual para cada ativo. Quando a valorização atingir o limite definido, a plataforma deverá enviar um alerta para que o usuário avalie a possibilidade de realizar lucro.

**O alerta não executa ordens de compra ou venda.** A decisão e a operação continuam sendo responsabilidade do usuário. As informações têm caráter informativo e não constituem recomendação de investimento.

## Funcionalidades planejadas

### 1. Página inicial

- Apresentação do propósito e dos recursos da plataforma.
- Navegação para cotações e carteira.
- Acesso às telas de login e cadastro.
- Layout limpo, responsivo e com chamada para criação de conta.

### 2. Cotações — `/search`

Página para consultar ativos do mercado brasileiro, com pesquisa por ticker ou nome e filtros por categoria.

Categorias previstas:

- Ações.
- Fundos imobiliários (FIIs).
- ETFs.
- BDRs.
- Índices de mercado.

Informações que poderão ser exibidas conforme a categoria e a disponibilidade dos dados:

- Código de negociação e nome do ativo.
- Último preço e variação do dia.
- Máxima e mínima do pregão.
- Volume negociado.
- Valor de mercado, quando aplicável.
- Horário da última atualização e indicação de eventual atraso na cotação.

Uma etapa futura poderá oferecer uma página de detalhes para cada ativo, com histórico de preços, gráfico de candles, volume e indicadores fundamentalistas ou específicos de FIIs.

### 3. Minha carteira — `/carteira`

Área privada para acompanhar os investimentos registrados pelo usuário.

Indicadores planejados:

- Patrimônio atual.
- Total aportado e custo das posições.
- Lucro ou prejuízo não realizado.
- Resultado realizado em operações encerradas.
- Rentabilidade percentual.
- Proventos recebidos, incluindo dividendos, JCP e rendimentos de FIIs.
- Evolução do patrimônio ao longo do tempo.
- Distribuição por classe de ativo, setor e ativo.
- Melhores e piores desempenhos da carteira.

A interface deverá diferenciar valorização dos investimentos de novos aportes e retiradas. O simples aumento do patrimônio causado por um depósito não deve ser tratado como lucro. Os métodos de cálculo de rentabilidade, como TWR ou XIRR, deverão ser definidos e documentados na implementação da lógica financeira.

### 4. Alertas personalizados de valorização

Este é um dos principais diferenciais do projeto.

O usuário poderá configurar uma meta individual para cada ativo acompanhado. Por exemplo:

| Ativo | Preço de referência ilustrativo | Meta | Preço-alvo ilustrativo |
|---|---:|---:|---:|
| PETR4 | R$ 30,00 | +15% | R$ 34,50 |
| ITUB4 | R$ 35,00 | +10% | R$ 38,50 |
| MXRF11 | R$ 10,00 | +8% | R$ 10,80 |

Os valores acima são apenas exemplos. A referência usada no cálculo — por exemplo, preço médio de aquisição ou outro valor definido pelo usuário — deverá ser explícita para evitar interpretações incorretas.

Quando a cotação alcançar ou ultrapassar o preço-alvo, o sistema deverá:

1. Identificar que a condição do alerta foi atingida.
2. Registrar a ocorrência para evitar notificações repetidas indevidas.
3. Notificar o usuário pelos canais habilitados, inicialmente com possibilidade de aviso dentro da plataforma e por e-mail.
4. Apresentar o ativo, a cotação observada, a meta configurada e o horário da ocorrência.
5. Sugerir que o usuário avalie a posição e decida se deseja realizar lucro.

O usuário deverá poder editar, pausar, reativar ou excluir alertas. Também será necessário definir como um alerta poderá ser disparado novamente após uma nova configuração ou reativação.

### 5. Login e cadastro

Telas e fluxos planejados:

- Cadastro com e-mail e senha.
- Login com e-mail e senha.
- Autenticação com Google.
- Recuperação de senha.
- Verificação de e-mail.
- Encerramento de sessão.
- Perfil e preferências do usuário.

As telas poderão ser construídas no frontend inicialmente, mas a autenticação só será considerada real e segura após integração com um serviço de autenticação e validação no servidor. Não armazenar senhas ou tokens sensíveis diretamente no frontend.

### 6. Páginas de erro e estados da interface

- Página 404 para endereços inexistentes.
- Estado de carregamento (skeleton ou indicador de carregamento).
- Carteira sem investimentos cadastrados.
- Pesquisa sem resultados.
- Erro ao carregar cotações ou carteira.
- Aviso de cotação desatualizada.
- Estados de usuário autenticado e não autenticado.

## Gráficos

Bibliotecas consideradas:

- **Recharts:** gráficos de evolução patrimonial, distribuição da carteira, comparação de rentabilidade e histórico de proventos.
- **TradingView Lightweight Charts:** gráficos financeiros de ativos, incluindo candles e volume negociado.

As bibliotecas são responsáveis pela visualização. Elas não fornecem, por si só, os dados de mercado. As cotações e séries históricas deverão ser disponibilizadas futuramente pelo backend ou por um provedor de dados autorizado.

## Tecnologias

Tecnologias previstas para o frontend:

- **Next.js** — estrutura da aplicação e roteamento.
- **React** — construção dos componentes e interfaces.
- **TypeScript** — tipagem e manutenção do código.
- **Tailwind CSS** — estilização e responsividade.
- **Recharts** — gráficos da carteira.
- **TradingView Lightweight Charts** — gráficos detalhados de ativos, em uma etapa posterior.

O projeto está organizado usando o **Pages Router** do Next.js. Portanto, as páginas devem seguir a convenção de arquivos do diretório `pages`, e não a convenção `app` do App Router.

## Tema e experiência de uso

- Interface clean, com hierarquia visual clara e poucos elementos decorativos.
- Layout responsivo para desktop, tablet e celular.
- Navbar com navegação desktop e menu hamburguer em telas menores.
- Footer simples com identificação do projeto e aviso informativo.
- Tema claro e escuro, com preferência salva para visitas futuras.
- Valores financeiros formatados em Real brasileiro (BRL) por padrão.
- Estados visuais claros para valorização, desvalorização, alertas, carregamento e erros.
- Acessibilidade básica: navegação por teclado, rótulos em controles e contraste adequado.

## Modelo de dados previsto

Os modelos abaixo servem como referência para a futura integração com o backend. Não representam tabelas ou endpoints já implementados.

- `User`: dados da conta e preferências.
- `Portfolio`: carteira pertencente a um usuário.
- `Asset`: identificação e categoria de um ativo.
- `Holding`: posição atual do usuário em determinado ativo.
- `Transaction`: compras, vendas, aportes e demais movimentações relevantes.
- `AssetQuote`: cotação observada em determinado instante.
- `HistoricalPrice`: série histórica de preços.
- `Dividend`: proventos anunciados ou recebidos.
- `CorporateAction`: eventos corporativos, como desdobramentos, grupamentos e bonificações.
- `PriceAlert`: ativo, referência de preço, percentual ou preço-alvo, status e histórico de disparos.
- `Notification`: avisos enviados ou apresentados ao usuário.

## Fonte e atualização dos dados

A integração com o mercado brasileiro será feita em uma etapa de backend. Antes de escolher o provedor, será necessário verificar cobertura dos ativos, frequência de atualização, latência, histórico disponível, limites de uso, licença e permissão para redistribuir os dados aos usuários.

A interface deverá informar quando uma cotação foi atualizada pela última vez e não deverá apresentar dados simulados como se fossem cotações reais. Durante o desenvolvimento do frontend, dados fictícios devem estar identificados claramente como demonstração.

## Segurança e privacidade

- Dados de carteira e operações devem ser privados e associados ao usuário autenticado.
- A autorização deverá ser validada no backend, não apenas pela interface.
- Segredos, chaves privadas e credenciais de provedores não devem ser incluídos no código público do frontend.
- A comunicação com serviços deverá utilizar HTTPS.
- O usuário deverá ter controle sobre suas preferências e notificações.

## Etapas de desenvolvimento

1. **Estrutura visual:** Home, Navbar, Footer, responsividade e tema.
2. **Páginas principais:** Cotações, Carteira e página 404.
3. **Autenticação:** telas de login, cadastro, Google e recuperação de senha.
4. **Carteira e gráficos:** indicadores, posições, operações e visualizações com dados simulados.
5. **Cotações e detalhes:** pesquisa, filtros, página individual de ativos e gráficos financeiros.
6. **Alertas:** configuração de metas, histórico de disparos e interface de notificações.
7. **Backend:** autenticação real, banco de dados, integração com fontes de mercado e processamento dos alertas.
8. **Validação:** testes, acessibilidade, segurança, desempenho e publicação.

## Aviso

O Invest. é uma ferramenta de organização e acompanhamento de informações financeiras. Alertas de preço ou valorização não garantem resultados e não devem ser interpretados como recomendação individual de investimento. O usuário é responsável por avaliar os riscos e decidir sobre suas operações.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

Você é livre para utilizar, copiar, modificar, distribuir e comercializar este software, desde que mantenha os avisos de direitos autorais e o texto da licença original.

