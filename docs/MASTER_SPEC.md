# PROJETO: ECOSSISTEMA DIGITAL TRIUNFO FM 87,9

Atue como uma equipe sênior multidisciplinar composta por:

- Arquiteto de software
- Desenvolvedor full-stack
- Engenheiro de banco de dados
- Engenheiro DevOps
- Especialista em segurança
- Product Manager
- Designer UI/UX
- Web designer
- Especialista em acessibilidade
- Especialista em SEO técnico
- Especialista em GEO — Generative Engine Optimization
- Jornalista e editor digital
- Copywriter
- Especialista em marketing e monetização de mídia

Sua responsabilidade é planejar, estruturar e implementar um ecossistema digital profissional para a rádio Triunfo FM 87,9.

O produto será composto por:

1. Portal público de notícias, rádio, turismo, eventos, cultura, esportes e podcasts.
2. Plataforma administrativa própria para gerenciar todo o portal.
3. API preparada para futuro aplicativo móvel e integrações externas.
4. Sistema de rádio ao vivo com programação e player persistente.
5. Central de anúncios, patrocinadores e monetização.
6. Estrutura editorial avançada de SEO e GEO.
7. Painel de análise, usuários, permissões e auditoria.

Não crie apenas uma landing page ou um protótipo estático. Desenvolva a base funcional de um produto real, escalável, seguro, responsivo e administrável.

---

# 1. IDENTIDADE E POSICIONAMENTO

Marca:

Triunfo FM 87,9

Slogan principal:

“A voz da cidade mais bonita do Sertão.”

Mensagem institucional secundária:

“Informação, cultura e turismo em um só lugar.”

Posicionamento:

A Triunfo FM deve deixar de ser percebida apenas como uma estação de rádio e se tornar o principal hub digital de informação, turismo, cultura, entretenimento e negócios de Triunfo, Pernambuco.

O portal deve atender:

- Moradores de Triunfo e região
- Turistas
- Empresas locais
- Órgãos públicos
- Organizadores de eventos
- Ouvintes da rádio
- Anunciantes
- Produtores de conteúdo
- Visitantes interessados no Sertão de Pernambuco

Idioma padrão:

Português do Brasil.

Localização:

Triunfo, Pernambuco, Brasil.

Fuso horário:

America/Recife.

Frequência da rádio:

87,9 FM.

Não invente telefones, endereços, apresentadores, músicas, anunciantes ou notícias como se fossem reais. Quando faltarem dados, utilize conteúdo demonstrativo claramente identificado como “Conteúdo de demonstração”.

Todos os contatos, links, redes sociais, endereços e dados institucionais devem ser administráveis pelo painel.

---

# 2. ARQUIVOS VISUAIS DE REFERÊNCIA

Analise os arquivos:

- triunfo-fm-logo.png
- triunfo-fm-frontend-reference.png
- news-portal-layout-reference.jpg

Use `triunfo-fm-frontend-reference.png` como principal referência visual para a homepage.

Use `triunfo-fm-logo.png` para extrair:

- Roxo institucional
- Dourado institucional
- Proporções da marca
- Formas e linguagem gráfica

Use `news-portal-layout-reference.jpg` apenas como referência de:

- Organização editorial
- Densidade de conteúdo
- Hierarquia de notícias
- Distribuição de categorias
- Estrutura de rodapé

Não copie integralmente layouts, textos, imagens, ícones ou componentes proprietários das referências.

Crie uma identidade original para a Triunfo FM.

---

# 3. DIREÇÃO DE DESIGN

A experiência deve transmitir:

- Credibilidade jornalística
- Identidade regional
- Modernidade
- Organização
- Proximidade com a cidade
- Valorização do turismo
- Facilidade para ouvir a rádio
- Qualidade comparável a grandes portais regionais

Referências conceituais:

- G1: organização editorial
- CNN Brasil: destaque da manchete principal
- Apple: espaçamento e clareza
- Spotify: experiência do player
- Airbnb: valorização das fotografias
- National Geographic: apresentação do turismo

Não reproduza visualmente essas marcas.

Princípios visuais:

- Branco predominante
- Roxo como cor institucional
- Dourado em detalhes, CTAs, estados ativos e destaques
- Muito espaço em branco
- Fotografias grandes
- Tipografia forte
- Bordas discretas
- Sombras suaves
- Cantos moderadamente arredondados
- Layout editorial limpo
- Excelente legibilidade
- Interface premium, mas regional e acolhedora

Tipografia:

- Utilizar Montserrat em títulos, navegação, botões e interface.
- Montserrat também pode ser utilizada no corpo inicialmente.
- Preparar o sistema para permitir uma fonte editorial específica em matérias longas no futuro.

Crie design tokens centralizados.

Cores iniciais sugeridas, que devem ser ajustadas com base no logotipo:

- Roxo profundo: #2B0757
- Roxo institucional: #46117F
- Roxo intermediário: #6322A3
- Dourado: #F2A900
- Dourado claro: #FFC53D
- Branco: #FFFFFF
- Fundo neutro: #F7F7F9
- Texto principal: #17131F
- Texto secundário: #686271
- Bordas: #E8E5EC
- Sucesso: #1B7F4D
- Alerta: #C98200
- Erro: #B42318

Valide contraste e acessibilidade antes de consolidar os tokens.

O layout deve funcionar perfeitamente nas larguras aproximadas:

- 1440 px
- 1280 px
- 1024 px
- 768 px
- 390 px

Atender, no mínimo, às recomendações WCAG 2.2 nível AA.

---

# 4. STACK E ARQUITETURA

Implemente uma arquitetura de monólito modular, evitando microserviços prematuros.

Stack preferencial:

- Next.js com App Router
- TypeScript com modo estrito
- React
- Tailwind CSS
- shadcn/ui ou componentes próprios acessíveis
- PostgreSQL
- Prisma ORM
- Auth.js ou solução equivalente compatível com RBAC
- Zod para validação
- React Hook Form para formulários
- TipTap para editor de conteúdo
- Armazenamento S3-compatible para mídia
- Docker e Docker Compose
- Vitest para testes unitários
- Playwright para testes de interface e fluxos críticos
- ESLint
- Prettier

Utilizar componentes de servidor por padrão e componentes de cliente apenas quando necessários.

Organize como monorepositório:

/apps
  /web
  /admin

/packages
  /ui
  /database
  /auth
  /config
  /seo
  /analytics
  /validation
  /types

/docs
  architecture.md
  data-model.md
  design-system.md
  editorial-workflow.md
  seo-geo.md
  deployment.md
  security.md

Caso seja mais eficiente manter portal e painel na mesma aplicação Next.js, isso é permitido, desde que exista separação clara de módulos, layouts, permissões e rotas.

Rotas sugeridas:

Portal público:
- /
- /noticias
- /noticias/[slug]
- /categoria/[slug]
- /turismo
- /turismo/[slug]
- /eventos
- /eventos/[slug]
- /esportes
- /politica
- /cultura
- /podcasts
- /podcasts/[slug]
- /podcasts/[podcastSlug]/[episodeSlug]
- /programacao
- /programas/[slug]
- /ao-vivo
- /busca
- /guia-comercial
- /anuncie
- /sobre
- /contato
- /politica-de-privacidade
- /termos-de-uso

Painel:
- /admin
- /admin/conteudos
- /admin/conteudos/novo
- /admin/editorial
- /admin/home
- /admin/categorias
- /admin/tags
- /admin/midias
- /admin/radio
- /admin/programacao
- /admin/programas
- /admin/podcasts
- /admin/turismo
- /admin/eventos
- /admin/anunciantes
- /admin/campanhas
- /admin/anuncios
- /admin/seo
- /admin/geo
- /admin/analytics
- /admin/usuarios
- /admin/permissoes
- /admin/auditoria
- /admin/configuracoes

---

# 5. HOMEPAGE DO PORTAL

Implemente a homepage tomando como base a referência visual gerada.

## Cabeçalho

Incluir:

- Logotipo da Triunfo FM
- Notícias
- Turismo
- Eventos
- Esportes
- Política
- Cultura
- Podcasts
- Busca
- Botão “AO VIVO”

No mobile, utilizar menu acessível e preservar acesso rápido ao player.

## Hero principal

Utilizar imagens panorâmicas em carrossel de Triunfo (1 a 3 imagens com alternância).

Sobre a imagem:

- Indicador “AO VIVO”
- TRIUNFO FM
- 87,9
- Botão “Ouvir agora”

Ao lado ou sobreposto (Card de Destaques):

- **Até 3 Matérias em Destaque selecionáveis** (com botões 1, 2, 3 para alternar)
- Categoria, Selo (URGENTE / DESTAQUE), Horário
- Título, Resumo, Tempo de leitura e Link “Leia a matéria completa”

As 3 matérias de destaque são escolhidas e ordenadas diretamente pelo painel administrativo (`/admin/editorial`).

## Navegação por categorias

Criar faixa visual com ícones para:

- Notícias
- Turismo
- Eventos
- Esportes
- Política
- Cultura
- Podcasts

## Canal do YouTube (`/admin/youtube`)

Seção dedicada exibindo os últimos vídeos do canal oficial da Triunfo FM.
- No painel administrativo (`/admin/youtube`), o operador insere apenas a URL do vídeo do YouTube.
- O portal extrai automaticamente o ID do vídeo e mantém o layout padronizado com thumbnail, título, duração e contagem de visualizações, além de modal interativo para reprodução direta.

## Aplicativo Móvel Triunfo FM

Seção posicionada imediatamente abaixo da seção de vídeos do YouTube e acima do rodapé.
- Apresenta as vantagens do aplicativo oficial para iOS e Android.
- Inclui **mockup de smartphone mobile interativo** simulando a tela interna do app (player de rádio ao vivo, locutor no ar e abas de navegação).
- Botões de download para Google Play e App Store com QR Code de acesso rápido.


## Últimas notícias

Criar:

- Uma matéria principal com imagem grande
- Lista de matérias secundárias
- Categoria
- Título
- Data relativa ou data de publicação
- Link para a editoria

## Ouça agora

Criar player visual contendo:

- Programa no ar
- Fotografia do locutor
- Horário
- Música ou conteúdo atual
- Nome do artista, quando disponível
- Play e pause
- Volume
- Compartilhamento
- Link para programação completa

## Agenda da cidade

Exibir eventos em cards com:

- Data
- Imagem
- Título
- Local
- Categoria
- Link

## Descubra Triunfo

Criar cards fotográficos para:

- Teleférico
- Lago João Barbosa
- Cine Teatro Guarany
- Cachaçarias
- Museus
- Gastronomia
- Hotéis
- Cachoeiras

O conteúdo deve ser administrável e não ficar hard-coded.

## Podcasts em destaque

Exibir:

- Capa
- Nome
- Apresentador
- Botão de reprodução
- Link para página do podcast

## Faixa institucional

Incluir:

“A voz da cidade mais bonita do Sertão.”

Aplicar ilustração ou elementos visuais inspirados em marcos de Triunfo, sem comprometer a legibilidade.

## Rodapé

Incluir áreas administráveis para:

- Aplicativo
- Institucional
- Links úteis
- Redes sociais
- Contatos
- Política de privacidade
- Termos
- Anuncie
- Programação
- Turismo
- Podcasts

## Player persistente

Criar player fixo na parte inferior durante a navegação.

O player deve:

- Continuar ativo durante a troca de páginas sempre que tecnicamente possível
- Mostrar status ao vivo
- Mostrar programa atual
- Mostrar conteúdo atual
- Ter play, pause, volume e recolhimento
- Ser acessível por teclado
- Não bloquear conteúdo no mobile

---

# 6. SISTEMA EDITORIAL

A plataforma administrativa deve funcionar como uma redação digital profissional.

Status editoriais:

- DRAFT
- IN_REVIEW
- CHANGES_REQUESTED
- APPROVED
- SCHEDULED
- PUBLISHED
- UNPUBLISHED
- ARCHIVED

Fluxo padrão:

Redator → Revisor → Editor → Publicação

Permitir:

- Criar matéria
- Salvar rascunho
- Enviar para revisão
- Solicitar correções
- Aprovar
- Agendar
- Publicar
- Retirar do ar
- Arquivar
- Restaurar versão anterior
- Duplicar matéria
- Visualizar prévia
- Comparar revisões
- Registrar atualização de matéria em andamento

Campos de uma matéria:

- Título
- Subtítulo
- Slug
- Resumo
- Corpo
- Imagem principal
- Legenda
- Crédito da imagem
- Galeria
- Vídeo
- Áudio
- Autor
- Revisor
- Editor
- Categoria
- Subcategoria
- Tags
- Localização
- Data do acontecimento
- Data da publicação
- Data da atualização
- Fontes
- Links externos
- Links internos
- Conteúdos relacionados
- Status
- Prioridade
- Urgente
- Destaque
- Exclusivo
- Patrocinado
- Conteúdo sensível
- Permitir comentários, caso o recurso seja ativado futuramente

O editor deve armazenar conteúdo estruturado em JSON e produzir HTML sanitizado para renderização.

Criar salvamento automático e prevenção contra perda de conteúdo.

---

# 7. CONSTRUTOR DA HOMEPAGE

A equipe deve poder organizar a homepage sem editar código.

Criar um sistema controlado de blocos, sem liberdade total que possa quebrar o design.

Tipos de blocos:

- Hero principal
- Notícia urgente
- Grid de notícias
- Lista horizontal
- Lista vertical
- Matéria especial
- Player da rádio
- Programação
- Agenda
- Turismo
- Podcasts
- Galeria
- Banner publicitário
- Patrocinador
- Newsletter
- Chamada para aplicativo
- Conteúdo institucional

Cada bloco deve permitir:

- Título
- Subtítulo
- Fonte automática ou seleção manual
- Quantidade de itens
- Ordem
- Estado ativo ou inativo
- Período de exibição
- Segmentação por desktop ou mobile
- Visualização de prévia
- Reordenação
- Agendamento

---

# 8. RÁDIO, PROGRAMAÇÃO E STREAMING

Criar módulo de rádio contendo:

- URL do streaming
- Stream principal
- Stream alternativo
- Estado online ou offline
- Programa atual
- Locutor atual
- Música ou conteúdo atual
- Capa
- Patrocinador
- Horário de início
- Horário de encerramento
- Grade semanal
- Programas especiais
- Avisos
- Histórico de execução

Modelar:

- Program
- Presenter
- ScheduleSlot
- LiveStream
- NowPlaying
- Sponsor

A programação semanal deve permitir recorrência.

Preparar uma interface para integração futura com sistemas externos de automação de rádio.

Na ausência de integração, o painel deve permitir atualização manual.

---

# 9. PODCASTS

Cada podcast deve possuir:

- Nome
- Slug
- Capa
- Descrição
- Apresentador
- Categoria
- Patrocinador
- Links para Spotify
- Links para YouTube
- Feed RSS
- Episódios
- Transcrição
- Capítulos
- Convidados
- Links relacionados
- Botões de compartilhamento

Cada episódio deve possuir:

- Título
- Resumo
- Descrição completa
- Arquivo de áudio ou URL
- Duração
- Data
- Capa
- Transcrição
- Convidados
- Fontes
- Patrocinadores
- SEO
- GEO

O player deve ser acessível e funcionar em desktop e mobile.

---

# 10. TURISMO E GUIA DA CIDADE

Criar módulo estruturado de turismo.

Tipos de locais:

- Atrativo turístico
- Hotel
- Pousada
- Restaurante
- Bar
- Cachaçaria
- Museu
- Cachoeira
- Trilha
- Loja
- Serviço
- Espaço cultural

Campos:

- Nome
- Slug
- Descrição curta
- Descrição completa
- Endereço
- Coordenadas
- Mapa
- Telefone
- WhatsApp
- Site
- Redes sociais
- Horários
- Faixa de preço
- Acessibilidade
- Fotografias
- Vídeos
- Comodidades
- Categoria
- Tags
- Como chegar
- Informações úteis
- Perguntas frequentes
- Conteúdos relacionados
- Patrocinado
- Verificado
- Data da última verificação

Preparar o módulo para planos comerciais e empresas em destaque.

Identificar claramente conteúdos patrocinados.

---

# 11. EVENTOS E AGENDA

Criar módulo de eventos contendo:

- Nome
- Slug
- Imagem
- Descrição
- Categoria
- Data inicial
- Data final
- Horário
- Local
- Endereço
- Coordenadas
- Organizador
- Telefone
- WhatsApp
- Link de ingresso
- Evento gratuito ou pago
- Faixa de preço
- Patrocinadores
- Links
- Galeria
- Status
- Destaque
- Evento recorrente
- Cancelado
- Adiado

Permitir:

- Calendário mensal
- Lista
- Filtro por categoria
- Filtro por data
- Compartilhamento
- Adição ao calendário
- Eventos relacionados

---

# 12. ANÚNCIOS E MONETIZAÇÃO

Criar uma central própria de publicidade.

Modelos principais:

- Advertiser
- Campaign
- Creative
- Placement
- AdSlot
- AdImpression
- AdClick
- Sponsorship
- CommercialPlan

Formatos:

- Banner no topo
- Banner no meio da homepage
- Banner lateral
- Banner dentro da matéria
- Banner no rodapé
- Patrocínio de editoria
- Patrocínio do player
- Patrocínio de programa
- Patrocínio de podcast
- Conteúdo patrocinado
- Evento patrocinado
- Empresa em destaque
- Turismo patrocinado

Permitir:

- Cadastro de anunciante
- Período de campanha
- Orçamento opcional
- Limite de impressões
- Limite de cliques
- URL de destino
- Parâmetros UTM
- Criativos diferentes por dispositivo
- Página ou categoria de exibição
- Prioridade
- Peso de rotação
- Estado
- Aprovação
- Prévia
- Relatório

Registrar impressões e cliques respeitando privacidade, LGPD e consentimento.

Não registrar dados pessoais desnecessários.

Diferenciar visualmente publicidade e conteúdo editorial.

---

# 13. SEO TÉCNICO E EDITORIAL

Implementar:

- Metadata dinâmica
- Título SEO
- Meta description
- Slug editável
- URL canônica
- Robots
- Sitemap XML
- Sitemap de notícias
- Sitemap de imagens
- RSS
- Open Graph
- Twitter Cards
- Breadcrumbs
- Redirecionamentos 301 e 302
- Página 404
- Página 500
- Prévia do Google
- Prévia de compartilhamento
- Texto alternativo obrigatório para imagens editoriais
- Links internos sugeridos
- Conteúdos relacionados
- Busca interna
- Paginação indexável
- Prevenção de conteúdo duplicado
- URLs consistentes
- Data de publicação
- Data de modificação
- Autor identificado
- Página de autor
- Organização responsável
- Política editorial
- Política de correções

Dados estruturados aplicáveis:

- Organization
- NewsMediaOrganization
- RadioStation
- WebSite
- SearchAction
- NewsArticle
- Article
- BreadcrumbList
- Person
- Event
- TouristAttraction
- LocalBusiness
- Hotel
- Restaurant
- PodcastSeries
- PodcastEpisode
- AudioObject
- VideoObject
- FAQPage, somente quando o conteúdo realmente possuir perguntas e respostas
- ImageObject

Nunca gerar marcação estruturada enganosa.

Criar painel de auditoria SEO com alertas para:

- Título ausente ou inadequado
- Meta description ausente
- Slug ruim
- Imagem sem texto alternativo
- Ausência de links internos
- Ausência de fontes
- Conteúdo duplicado
- Links quebrados
- Matéria sem autor
- Matéria sem data de atualização
- Problemas de indexação

---

# 14. GEO — GENERATIVE ENGINE OPTIMIZATION

Criar uma camada editorial própria para tornar o conteúdo compreensível e citável por mecanismos generativos.

Cada conteúdo poderá possuir:

- Resposta curta
- Resumo executivo
- Principais fatos
- Contexto
- Pessoas mencionadas
- Organizações mencionadas
- Lugares mencionados
- Datas relevantes
- Números e estatísticas
- Perguntas frequentes
- Fontes primárias
- Fontes secundárias
- Links oficiais
- Última verificação
- Responsável pela verificação
- Correções
- Conteúdos relacionados
- Entidades estruturadas

Para conteúdos turísticos, incluir:

- Onde fica
- Como chegar
- Horários
- Valores
- Contatos
- Melhor época
- Acessibilidade
- Estrutura
- Restrições
- Perguntas frequentes
- Data da última conferência

Para notícias, incluir:

- O que aconteceu
- Onde aconteceu
- Quando aconteceu
- Quem está envolvido
- Por que é relevante
- O que acontece agora
- Fontes da informação

Criar visualização de “Resumo em pontos” nas matérias quando preenchido.

Gerar estruturas semânticas no HTML.

Preparar:

- RSS completo
- Feeds JSON
- Endpoints públicos documentados
- Sitemap
- Página de autores
- Página de política editorial
- Página de correções
- Informações claras sobre propriedade e responsabilidade editorial
- Arquivo llms.txt opcional, sem tratá-lo como garantia de indexação

Conteúdo sugerido por inteligência artificial nunca poderá ser publicado automaticamente.

Toda sugestão deve exigir revisão e aprovação humana.

Não criar citações, fontes ou fatos inexistentes.

---

# 15. USUÁRIOS, PAPÉIS E PERMISSÕES

Criar RBAC granular.

Papéis iniciais:

- SUPER_ADMIN
- ADMIN
- DIRETOR
- EDITOR_CHEFE
- EDITOR
- REVISOR
- REDATOR
- LOCUTOR
- PRODUTOR
- FOTOGRAFO
- COMERCIAL
- ANALISTA
- COLABORADOR
- ANUNCIANTE

Permissões separadas por recurso e ação:

- view
- create
- edit
- review
- approve
- publish
- unpublish
- delete
- restore
- manage
- export

Registrar em auditoria:

- Login
- Logout
- Criação
- Edição
- Aprovação
- Publicação
- Exclusão
- Restauração
- Alteração de permissões
- Alteração de configurações
- Alteração de campanhas

---

# 16. SEGURANÇA E LGPD

Implementar:

- Hash seguro de senha
- Sessões seguras
- Cookies seguros
- Proteção CSRF quando aplicável
- Rate limiting
- Validação no servidor
- Sanitização de HTML
- Content Security Policy
- Proteção contra upload malicioso
- Limitação de tipos e tamanhos de arquivo
- URLs assinadas para mídia privada
- Logs de auditoria
- Recuperação de senha
- Opção para autenticação em dois fatores
- Backups
- Política de retenção
- Consentimento de cookies
- Gestão de preferências
- Minimização de dados
- Exclusão ou anonimização quando aplicável

Não armazenar segredos no código.

Criar `.env.example`.

---

# 17. MODELO DE DADOS

Criar e documentar os modelos principais:

- User
- Role
- Permission
- UserRole
- RolePermission
- AuthorProfile
- Article
- ArticleRevision
- ArticleSource
- Category
- Tag
- MediaAsset
- MediaFolder
- HomepageSection
- HomepageItem
- Program
- Presenter
- ScheduleSlot
- LiveStream
- NowPlaying
- Podcast
- PodcastEpisode
- EpisodeGuest
- TourismPlace
- TourismCategory
- Event
- EventCategory
- Advertiser
- Campaign
- Creative
- Placement
- AdImpression
- AdClick
- Sponsorship
- Redirect
- SeoMetadata
- GeoMetadata
- SeoAudit
- SiteSettings
- SocialLink
- NavigationMenu
- AuditLog
- Notification

Definir corretamente:

- Relacionamentos
- Índices
- Restrições
- Enums
- Exclusão lógica quando adequada
- createdAt
- updatedAt
- publishedAt
- deletedAt
- createdBy
- updatedBy

Criar migrations e seed de demonstração.

---

# 18. BUSCA

Implementar inicialmente busca com PostgreSQL Full Text Search.

A busca deve encontrar:

- Notícias
- Eventos
- Turismo
- Podcasts
- Episódios
- Programas

Permitir:

- Busca por texto
- Categoria
- Período
- Tipo de conteúdo
- Ordenação por relevância ou data

Criar abstração para futura integração com Meilisearch, Typesense ou serviço equivalente.

---

# 19. ANALYTICS E PAINEL

Criar dashboard administrativo contendo:

- Conteúdos publicados
- Conteúdos aguardando revisão
- Publicações agendadas
- Notícias mais acessadas
- Cliques no player
- Inícios de reprodução
- Podcasts mais ouvidos
- Campanhas ativas
- Impressões de anúncios
- Cliques em anúncios
- Eventos mais acessados
- Locais turísticos mais acessados
- Origem de tráfego
- Busca interna
- Usuários ativos na equipe

Preparar integração opcional com:

- Google Analytics
- Google Search Console
- PostHog
- Sentry

Não bloquear o funcionamento do sistema caso essas integrações ainda não tenham credenciais.

---

# 20. PERFORMANCE

Buscar excelência em Core Web Vitals.

Implementar:

- Otimização de imagens
- Imagens responsivas
- Lazy loading
- Cache
- Revalidação
- Paginação
- Carregamento progressivo
- Redução de JavaScript no cliente
- Fontes otimizadas
- Skeleton loading quando necessário
- CDN para mídia
- Compressão
- Controle de tamanho dos bundles

A homepage deve permanecer rápida mesmo com muitas notícias e imagens.

---

# 21. EXPERIÊNCIA DO PAINEL ADMINISTRATIVO

O painel deve ter:

- Sidebar
- Navegação hierárquica
- Busca global
- Breadcrumb
- Dashboard
- Tabelas com filtros
- Ordenação
- Paginação
- Ações em massa
- Estados vazios
- Confirmações para ações destrutivas
- Feedback de salvamento
- Prévia de conteúdo
- Calendário editorial
- Notificações
- Atalhos para criar matéria, evento, podcast e anúncio

O painel precisa ser funcional em notebook e tablet.

Não precisa priorizar edição editorial completa em telas pequenas, mas deve permanecer utilizável.

---

# 22. COPY E TOM DE VOZ

Tom:

- Confiável
- Próximo
- Regional
- Claro
- Jornalístico
- Responsável
- Não sensacionalista
- Valorizador de Triunfo

CTAs principais:

- Ouvir agora
- Leia mais
- Ver programação
- Descubra Triunfo
- Ver agenda
- Ouvir episódio
- Compartilhar
- Anuncie na Triunfo FM
- Fale pelo WhatsApp

Evitar clickbait.

Distinguir claramente:

- Conteúdo editorial
- Opinião
- Conteúdo patrocinado
- Publicidade
- Comunicado
- Conteúdo de demonstração

---

# 23. ETAPAS DE EXECUÇÃO

Execute o projeto em etapas, mantendo o sistema funcional ao final de cada fase.

## Fase 0 — Diagnóstico e planejamento

Antes de implementar:

1. Inspecione o repositório.
2. Analise os ativos visuais.
3. Crie `docs/architecture.md`.
4. Crie `docs/data-model.md`.
5. Crie `docs/design-system.md`.
6. Crie `docs/editorial-workflow.md`.
7. Crie `docs/seo-geo.md`.
8. Crie `IMPLEMENTATION_PLAN.md`.
9. Registre decisões em `DECISIONS.md`.

Não fique apenas no planejamento. Depois da documentação inicial, comece a implementação.

## Fase 1 — Fundação

Implementar:

- Estrutura do projeto
- Banco de dados
- Autenticação
- RBAC
- Layout do portal
- Layout do painel
- Design tokens
- Componentes compartilhados
- Docker
- Variáveis de ambiente
- Migrations
- Seed

## Fase 2 — Portal público

Implementar:

- Homepage completa
- Categorias
- Página de matéria
- Busca
- Turismo
- Eventos
- Podcasts
- Programas
- Programação
- Página ao vivo
- Player persistente
- Rodapé
- Responsividade

## Fase 3 — CMS

Implementar:

- Conteúdos
- Revisões
- Workflow editorial
- Categorias
- Tags
- Mídias
- Homepage builder
- Programação
- Podcasts
- Turismo
- Eventos
- Configurações

## Fase 4 — SEO e GEO

Implementar:

- Metadata
- Structured data
- Sitemaps
- RSS
- Auditoria SEO
- Campos GEO
- Página de autores
- Política editorial
- Correções
- Feeds estruturados

## Fase 5 — Publicidade e analytics

Implementar:

- Anunciantes
- Campanhas
- Criativos
- Posicionamentos
- Impressões
- Cliques
- Relatórios
- Dashboard

## Fase 6 — Qualidade

Implementar:

- Testes unitários
- Testes de integração
- Testes E2E
- Acessibilidade
- Segurança
- Performance
- Tratamento de erros
- Logs
- Documentação final

---

# 24. TESTES OBRIGATÓRIOS

Criar testes para, no mínimo:

- Login
- Permissões
- Criação de matéria
- Envio para revisão
- Aprovação
- Agendamento
- Publicação
- Revisões
- Homepage
- Player
- Busca
- Criação de evento
- Criação de podcast
- Criação de campanha
- Exibição de anúncio
- Registro de impressão
- Registro de clique
- Metadata
- Sitemap
- Dados estruturados
- Responsividade básica
- Navegação por teclado

Criar testes E2E dos fluxos editoriais críticos.

---

# 25. DADOS DE DEMONSTRAÇÃO

Criar seed contendo:

- Usuário administrador
- Editor
- Redator
- Comercial
- Categorias
- Artigos demonstrativos
- Programas
- Grade semanal
- Podcast
- Episódios
- Pontos turísticos
- Eventos
- Anunciante
- Campanha
- Blocos de homepage

Todos os conteúdos fictícios devem ser identificados como demonstração.

Não inserir notícia urgente falsa como se fosse fato real.

Documentar credenciais locais no README, exclusivamente para ambiente de desenvolvimento.

---

# 26. VARIÁVEIS DE AMBIENTE

Preparar, quando aplicável:

DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=
RADIO_STREAM_URL=
RADIO_STREAM_FALLBACK_URL=
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
REDIS_URL=
GA4_ID=
POSTHOG_KEY=
SENTRY_DSN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

O sistema deve iniciar localmente sem exigir todas as integrações externas.

---

# 27. ENTREGÁVEIS

Ao final, entregar:

- Aplicação pública funcional
- Painel administrativo funcional
- Banco de dados modelado
- Migrations
- Seed
- Autenticação
- Permissões
- CMS
- Player
- Programação
- Podcasts
- Turismo
- Eventos
- Publicidade
- SEO
- GEO
- Testes
- Docker Compose
- `.env.example`
- README completo
- Documentação arquitetural
- Documentação de implantação
- Documentação editorial
- Documentação de SEO e GEO
- Relatório de funcionalidades concluídas
- Lista transparente de itens pendentes

Criar `IMPLEMENTATION_STATUS.md` contendo:

- Concluído
- Parcial
- Pendente
- Bloqueado
- Próximos passos

---

# 28. CRITÉRIOS DE ACEITAÇÃO

O projeto somente pode ser considerado funcional quando:

1. Um administrador consegue entrar no painel.
2. Um redator consegue criar uma matéria.
3. Um editor consegue revisar e publicar.
4. A matéria aparece no portal.
5. A homepage pode ser reorganizada pelo painel.
6. O player consegue reproduzir uma URL configurável.
7. A programação pode ser gerenciada.
8. Podcasts podem ser cadastrados.
9. Eventos podem ser cadastrados.
10. Pontos turísticos podem ser cadastrados.
11. Uma campanha pode ser criada e exibida.
12. Impressões e cliques são registrados.
13. Metadata e structured data são gerados.
14. O portal é responsivo.
15. A interface segue a identidade roxa, dourada e branca.
16. As rotas protegidas respeitam permissões.
17. O projeto pode ser iniciado seguindo apenas o README.
18. Os testes críticos passam.
19. Não existem contatos ou informações institucionais importantes hard-coded.
20. O portal mantém boa legibilidade e desempenho.

---

# 29. REGRAS DE IMPLEMENTAÇÃO

- Não criar apenas telas estáticas.
- Não esconder funcionalidades essenciais atrás de mocks permanentes.
- Não utilizar `any` sem justificativa.
- Não duplicar regras de negócio.
- Não criar microserviços desnecessários.
- Não publicar conteúdo gerado por IA automaticamente.
- Não inventar fontes jornalísticas.
- Não inventar dados institucionais.
- Não copiar integralmente os portais de referência.
- Não comprometer acessibilidade por estética.
- Não armazenar segredos no repositório.
- Não depender de credenciais externas para executar o ambiente local.
- Não deixar erros silenciosos.
- Não utilizar textos genéricos em botões quando uma ação clara puder ser apresentada.
- Não permitir que um editor altere livremente o CSS da homepage.
- Não remover o histórico editorial.
- Não misturar conteúdo patrocinado com conteúdo jornalístico sem identificação.

Faça escolhas técnicas sensatas quando existirem lacunas.

Documente as suposições.

Não interrompa a execução para perguntar detalhes pequenos que possam ser resolvidos com padrões seguros e posteriormente configurados pelo painel.

Solicite intervenção somente quando houver bloqueio real, como credenciais obrigatórias, arquivo ausente ou decisão que altere profundamente a arquitetura.

---

# 30. PRIMEIRA RESPOSTA E INÍCIO DA EXECUÇÃO

Comece respondendo com:

1. Resumo do entendimento do produto.
2. Análise dos arquivos visuais.
3. Arquitetura proposta.
4. Estrutura do repositório.
5. Modelo inicial de dados.
6. Plano de execução por fases.
7. Riscos e decisões importantes.

Em seguida, sem permanecer apenas no planejamento:

- Inicialize o projeto.
- Crie a documentação.
- Configure banco, autenticação e design system.
- Implemente a primeira vertical funcional:
  login → criação de matéria → revisão → publicação → exibição no portal.

Depois avance para a homepage, rádio, turismo, eventos, podcasts, publicidade, SEO, GEO, testes e documentação.
