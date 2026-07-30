# SEO técnico, editorial e GEO

Status: política inicial da Fase 0  
Escopo: homepage e página de notícia da primeira vertical

## 1. Princípios

- SEO e GEO fazem parte do workflow, não são pós-processamento.
- HTML inicial de homepage e notícia é renderizado no servidor.
- Somente revisão publicada e elegível pode ser indexável.
- Metadata, conteúdo visível e JSON-LD usam a mesma revisão.
- GEO significa clareza, estrutura e proveniência; não garante citação por mecanismos generativos.
- Campo vazio é preferível a fato, fonte, contato ou citação inventada.
- Conteúdo sugerido por IA requer revisão e aprovação humanas.
- Dados estruturados nunca ampliam ou contradizem o conteúdo visível.

## 2. URL e canonical

- notícia: `/noticias/[slug]`;
- categoria: `/categoria/[slug]`;
- autor futuro: `/autores/[slug]`;
- slug publicado é lowercase ASCII com hífens;
- canonical absoluto é derivado do domínio configurado;
- override externo exige permissão, justificativa e auditoria;
- mudança de slug publicado cria 301, sem loop ou cadeia;
- parâmetros de campanha/filtro não mudam a canonical;
- preview e admin nunca são canonical público.

Domínio oficial ainda não foi fornecido. Nenhuma URL institucional será inventada.

## 3. Homepage

Requisitos:

- `lang="pt-BR"`;
- título, descrição, canonical e imagem social administráveis;
- uma H1 contextual;
- H2 para seções e H3 para cards;
- links descritivos presentes no HTML;
- cards somente de artigos publicados;
- imagem responsiva com dimensões e `sizes`;
- prioridade somente para a imagem LCP;
- `WebSite`, `Organization/NewsMediaOrganization` e `RadioStation` conectados por `@id`, quando houver dados oficiais;
- `SearchAction` somente depois que `/busca` estiver funcional;
- links `alternate` para RSS/JSON Feed quando implementados;
- links visíveis para autores, política editorial, correções, propriedade e contato quando esses dados forem aprovados.

Publicação invalida homepage, categoria, notícia, sitemap e feeds. Referência manual da homepage não pode contornar elegibilidade pública.

## 4. Página de notícia

Estrutura:

- breadcrumb;
- elemento `article`;
- uma H1;
- subtítulo;
- categoria;
- autor com perfil;
- publicação e modificação em `time datetime`;
- local apenas quando confirmado;
- `figure`, imagem, legenda e crédito;
- resumo em pontos quando preenchido;
- corpo com H2/H3, listas, tabelas e citações semânticas;
- fontes;
- nota de correção;
- relacionados.

Metadata:

- título e descrição com preview e alertas, sem truncamento rígido no banco;
- canonical absoluto;
- Open Graph `article`;
- `og:locale=pt_BR`;
- `og:image` e `og:image:alt`;
- cards sociais;
- datas verdadeiras da revisão publicada;
- robots coerente com a situação pública.

## 5. Dados estruturados

Para notícia real, gerar `NewsArticle` com:

- `@id` estável;
- `mainEntityOfPage`;
- `headline` e `description`;
- `image`;
- `datePublished` e `dateModified`;
- `author`;
- `publisher`;
- `articleSection`;
- `isAccessibleForFree` somente se verdadeiro.

Também podem ser gerados `BreadcrumbList` e `ImageObject` com crédito/licença quando disponíveis. Conteúdo que não é notícia usa `Article`. `FAQPage` só existe se perguntas e respostas reais estiverem visíveis.

Schema institucional depende de nome legal, endereço, contatos, logos e perfis confirmados. O painel não aceitará JSON-LD arbitrário.

## 6. Indexação por situação

| Situação | Comportamento |
|---|---|
| rascunho/revisão/aprovação | protegido, `noindex`, fora de sitemap/feed |
| preview | token/sessão, `noindex, nofollow`, `no-store` |
| agendado | indisponível até o instante configurado |
| publicado | 200, canonical próprio e indexável |
| retirado | remove de sitemap/feed; 404/410/redirect/nota conforme política |
| arquivado | não reaparece automaticamente |
| correção material | nota visível e `dateModified` real |

Uma nova working copy não muda metadata nem HTML da revisão publicada.

## 7. Campos GEO da notícia

- resposta curta;
- resumo executivo;
- fatos principais ordenados;
- o que aconteceu;
- onde e quando;
- quem está envolvido;
- por que é relevante;
- o que acontece agora;
- contexto;
- pessoas, organizações e lugares;
- datas;
- números/estatísticas com unidade e referência temporal;
- fontes primárias, secundárias e links oficiais;
- última verificação;
- responsável pela verificação;
- correções;
- relacionados.

Cada fato ou estatística deve indicar fonte. Entidade externa só recebe identificador canônico após verificação. Não armazenar cópias extensas de material protegido nas anotações.

O “Resumo em pontos” mostra apenas fatos aprovados e coerentes com corpo e fontes.

## 8. Gates de publicação

Bloqueadores:

- título, slug único, categoria, autor e corpo;
- HTML sanitizado;
- datas coerentes;
- mídia aplicável com alt contextual, crédito e direito de uso;
- fonte ou justificativa editorial registrada;
- canonical sem conflito;
- patrocinado/demonstração/opinião/comunicado identificados;
- nenhuma fonte, entidade ou citação inventada;
- nenhum erro técnico crítico do `SeoAudit`.

Alertas configuráveis:

- título/descrição SEO ausentes;
- ausência de imagem social/crop;
- links internos ausentes;
- link quebrado;
- fonte possivelmente desatualizada;
- GEO incompleto;
- verificação antiga;
- título possivelmente longo;
- duplicidade provável.

Override de blocker exige permissão, justificativa e auditoria. Ausência de GEO não é, sozinha, motivo para fabricar conteúdo ou bloquear notícia válida.

## 9. Confiança editorial

Serão administráveis:

- autores e credenciais verificadas;
- política editorial;
- política de correções;
- propriedade e responsabilidade;
- histórico de atualização;
- contato institucional;
- distinção visual/semântica de notícia, opinião, comunicado, publicidade, patrocinado e demonstração.

Endereço, telefone, CNPJ, domínio, redes, equipe e autores não serão preenchidos até serem oficialmente fornecidos.

## 10. Sitemaps e feeds

Planejar:

- sitemap principal;
- sitemap de notícias conforme requisitos vigentes na implementação;
- sitemap de imagens quando útil;
- RSS completo;
- JSON Feed;
- paginação rastreável para arquivos/editorias.

Somente URLs canônicas publicadas entram. Retirada remove a URL das listas, mas não apaga seu histórico interno. Datas são derivadas da revisão pública, não da working copy.

## 11. Auditoria SEO

Regras iniciais:

- título ausente/inadequado;
- descrição ausente;
- slug inválido/colidente;
- imagem informativa sem alt;
- autoria ausente;
- fonte ausente quando exigida;
- canonical conflitante;
- conteúdo patrocinado sem disclosure;
- link quebrado;
- ausência de links internos;
- conteúdo potencialmente duplicado;
- data de modificação incoerente;
- `noindex` acidental em publicado;
- revisão pública divergente de metadata/JSON-LD.

Auditoria registra código estável, severidade, campo, mensagem e resolução. Mensagens devem orientar a correção e não prometer posição em buscador.

## 12. Performance e acessibilidade relacionadas

- HTML sem depender de JavaScript para conteúdo editorial;
- imagem LCP otimizada e sem lazy loading;
- espaço reservado para evitar CLS;
- fontes otimizadas;
- largura de leitura controlada;
- links e headings semânticos;
- alt/legenda/crédito separados;
- breadcrumb navegável;
- player futuro não bloqueia foco nem conteúdo;
- cache por tag com invalidação transacional pós-commit.

## 13. Validação futura

- canonical, robots e metadata;
- JSON-LD e coerência com conteúdo;
- inclusão/remoção em sitemap e feeds;
- social image e alt;
- ausência de rascunho em URL pública;
- atualização refletida em homepage e notícia;
- axe/Playwright em 390, 768, 1024, 1280 e 1440 px;
- teclado e leitor de tela;
- LCP e CLS das páginas críticas;
- teste de redirect após troca de slug;
- teste de `noindex` em preview.

Ferramentas e critérios externos devem ser confirmados na versão vigente quando forem implementados.

## 14. Fora do escopo inicial

- normalização completa de entidades GEO;
- painel avançado de sugestões;
- agregadores externos;
- automação de IA;
- busca e `SearchAction`;
- schemas de turismo, eventos, podcasts e rádio;
- `llms.txt`, que será opcional e nunca tratado como garantia de indexação.
