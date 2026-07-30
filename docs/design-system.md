# Direção visual e design system

Status: tokens provisórios da Fase 0  
Referência principal: `triunfo-fm-frontend-reference.png.png`  
Baseline: WCAG 2.2 AA

## 1. Inventário dos ativos

| Arquivo real | Formato | Dimensões | Tamanho | Alpha | Uso |
|---|---|---:|---:|---|---|
| `triunfo-fm-logo.png.png` | PNG ARGB | 1024 × 1024 | 1.616.907 B | sim | referência de marca |
| `triunfo-fm-simbolo.png` | PNG ARGB | 1024 × 1024 | 1.435.394 B | sim | referência do símbolo |
| `triunfo-fm-frontend-reference.png.png` | PNG RGB | 1024 × 1536 | 2.107.834 B | não | composição principal da homepage |
| `news-portal-layout-reference.jpg.jpg` | JPEG RGB | 736 × 1104 | 134.264 B | não | densidade editorial secundária |

Três nomes têm extensão duplicada. Os originais não serão renomeados nesta Fase 0; a futura pasta pública receberá nomes normalizados e derivados otimizados.

Os PNGs da marca têm transparência, brilho e gradiente. São úteis para extrair linguagem visual, mas não substituem um kit de marca para cabeçalho, favicon, impressão ou fundos variados.

## 2. Leitura visual

A referência principal organiza a homepage em:

1. cabeçalho branco, marca, navegação, busca e CTA “AO VIVO”;
2. hero fotográfico com rádio à esquerda e notícia urgente em card roxo;
3. faixa elevada de categorias;
4. manchete e notícias secundárias ao lado do player/programa;
5. agenda, turismo e podcasts;
6. faixa institucional roxa;
7. rodapé de múltiplas colunas;
8. player persistente inferior.

O sistema transmite hierarquia por fotografia ampla, títulos pesados, roxo profundo, dourado como sinal de ação e espaço branco generoso. A referência de portal de notícias serve apenas para padrões abstratos de mosaico, repetição de editorias, listas e densidade.

Não serão copiados textos, contatos, pessoas, músicas, notícias, fotografias, ícones ou composição literal das referências.

## 3. Paleta provisória

As amostras quantizadas dos logos concentram-se em roxos próximos de `#380888/#480898` e dourados próximos de `#E89808/#F8A808`. Como os arquivos usam gradientes, os tokens abaixo conciliam essas amostras com a especificação e permanecem sujeitos ao manual de marca.

| Papel | Token | Valor | Uso |
|---|---|---|---|
| Roxo profundo | `brand-purple-950` | `#2B0757` | superfícies escuras |
| Roxo principal | `brand-purple-800` | `#46117F` | CTA e navegação ativa |
| Roxo intermediário | `brand-purple-600` | `#6322A3` | foco e detalhe |
| Roxo luminoso | `brand-purple-400` | `#7848B8` | gráfico/decorativo |
| Dourado | `brand-gold-500` | `#F2A900` | fundo de destaque |
| Dourado claro | `brand-gold-300` | `#FFC53D` | realce decorativo |
| Dourado textual | `brand-gold-900` | `#7A4D00` | texto sobre branco |
| Canvas | `surface-canvas` | `#FFFFFF` | fundo principal |
| Superfície suave | `surface-subtle` | `#F7F7F9` | agrupamentos |
| Texto principal | `text-primary` | `#17131F` | títulos e corpo |
| Texto secundário | `text-secondary` | `#686271` | metadados |
| Borda discreta | `border-subtle` | `#E8E5EC` | divisores |
| Borda de controle | `border-control` | `#8B8395` | inputs |
| Sucesso | `feedback-success` | `#1B7F4D` | confirmação |
| Alerta textual | `feedback-warning` | `#7A4D00` | alerta acessível |
| Erro | `feedback-error` | `#B42318` | erro/destrutivo |

Contrastes calculados:

| Par | Razão |
|---|---:|
| branco / `#2B0757` | 16,53:1 |
| branco / `#46117F` | 12,75:1 |
| branco / `#6322A3` | 9,18:1 |
| `#17131F` / dourado | 9,09:1 |
| `#2B0757` / dourado | 8,22:1 |
| `#686271` / branco | 5,88:1 |
| dourado / branco | 2,01:1 |
| `#7A4D00` / branco | 7,27:1 |

Dourado claro não é cor de texto, ícone funcional, borda de controle ou foco sobre branco. CTA dourado usa texto escuro. Foco em fundo claro usa roxo; em fundo roxo usa dourado. Status sempre combina texto/ícone e cor.

## 4. Tipografia

Montserrat é a fonte inicial de interface e editorial:

- pesos 400, 500, 600, 700 e 800;
- carregamento local otimizado, licença preservada e `font-display: swap`;
- títulos grandes podem usar tracking levemente negativo;
- corpo não usa caixa alta e fica entre 65 e 75 caracteres por linha.

Escala inicial:

| Papel | Desktop | Mobile |
|---|---|---|
| Display | 56/60 | 36/40 |
| H1 de matéria | 48/52 | 32/36 |
| H2 | 32/38 | 28/34 |
| H3 | 24/30 | 22/28 |
| Corpo editorial | 18/30 | 17/28 |
| Corpo de interface | 16/24 | 16/24 |
| Metadado | 14/20 | 14/20 |
| Microtexto | 12/16 | 12/16 |

Uma fonte editorial futura exige decisão de marca, licença e teste de leitura; não será escolhida por preferência estética isolada.

## 5. Espaçamento, forma e movimento

- base de 4 px: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`;
- radius: 8 px em controles, 12 px em cards, 16 px em destaques e pill completa em badges;
- sombra apenas quando há elevação real; a borda continua visível sem sombra;
- durações: 120, 180 e 240 ms;
- nenhuma informação depende de animação;
- `prefers-reduced-motion` reduz ou remove transições não essenciais.

## 6. Grid e breakpoints

| Nome | Largura |
|---|---:|
| sm | 480 px |
| md | 768 px |
| lg | 1024 px |
| xl | 1280 px |
| 2xl | 1440 px |

- 4 colunas em mobile, 8 em tablet e 12 a partir de 1024 px;
- gutters de 16, 24, 32 e 40 px;
- container máximo de 1280 px;
- coluna de leitura entre 720 e 760 px;
- em 1280/1440, ampliar margens e imagens, não o comprimento de linha.

Comportamento:

- 390 px: hero, urgente, cards e rodapé empilhados; categorias em grade ou trilho com affordance;
- 768 px: cards em duas colunas; hero pode permanecer empilhado;
- 1024 px: hero 7/5, notícia/player 8/4 e painel com sidebar;
- player fixo reserva espaço no layout, respeita safe area e não cobre foco/conteúdo.

## 7. Componentes da primeira vertical

### Painel

- `LoginForm`;
- `AdminShell`, sidebar, breadcrumb e conta;
- `ArticleTable` e filtros;
- `ArticleStatusBadge` com dois eixos;
- `ArticleEditor` e toolbar acessível;
- campos de identidade, taxonomia, fonte e mídia;
- `AutosaveIndicator`;
- action bar por estado/permissão;
- fila e detalhe de revisão;
- comentários e pedidos de alteração;
- checklist de aprovação/publicação;
- preview segura;
- timeline de workflow e auditoria.

Estados obrigatórios: carregando, vazio, erro, offline, sem permissão, conflito de edição, alterações não salvas, salvando, salvo e falha de salvamento.

### Portal

- cabeçalho e navegação responsiva;
- hero editorial e card urgente;
- navegação de categorias;
- `ArticleCard` nas variantes destaque, horizontal e compacta;
- cabeçalho da matéria;
- mídia principal;
- resumo em pontos;
- corpo semântico;
- fontes, correções e relacionados;
- rodapé.

Na primeira vertical, rádio/player pode aparecer apenas como área futura desativada ou ser omitido; não se simula streaming funcional.

## 8. Acessibilidade WCAG 2.2 AA

- skip link, landmarks e apenas um `main`;
- hierarquia coerente de headings;
- fluxo completo por teclado e foco nunca encoberto;
- alvos operacionais preferencialmente 44 × 44 CSS px;
- reflow a 320 CSS px e zoom de 400%;
- menus e diálogos com gestão/restauração de foco e Escape;
- cor nunca é o único indicador;
- 4,5:1 para texto normal e 3:1 para texto grande/controles;
- alt contextual em imagem informativa; `alt=""` em decorativa;
- legenda, crédito e alt são campos distintos;
- horário relativo acompanhado de `time datetime` e valor absoluto acessível;
- overlays sobre fotos exigem scrim testado por imagem;
- conteúdo urgente não pisca;
- login permite colar senha, usar gerenciador e alternar visibilidade;
- autosave usa `aria-live="polite"` sem anúncios excessivos;
- editor rich text tem toolbar operável, rótulo e instruções;
- diff oferece resumo textual, não só vermelho/verde;
- publicação e retirada pedem confirmação clara e preservam recuperação;
- testes automatizados não substituem teclado e leitor de tela manuais.

## 9. Requisitos editoriais de imagem

- crédito, licença e validade de uso devem ser armazenados;
- alt descreve propósito no contexto e não repete legenda;
- imagem principal recebe recortes responsivos e dimensões reservadas;
- somente o LCP recebe prioridade;
- não inserir texto essencial dentro de fotografia;
- conteúdo demonstrativo é rotulado;
- nenhum dado do mockup é tratado como fato real.

## 10. Assets ainda necessários

Antes do acabamento visual:

- marca vetorial oficial;
- lockups horizontal e vertical;
- versões positiva, negativa, monocromática e sem glow;
- símbolo simplificado para favicon/PWA;
- confirmação sobre o selo “30 anos”;
- manual de área de proteção e cores oficiais;
- foto aérea licenciada e recortes;
- biblioteca de Triunfo com autoria/licença/crédito;
- template OG 1200 × 630;
- ilustrações próprias de marcos locais;
- confirmação de licença da fonte e dos ícones.

Até haver confirmação, domínio, contatos, redes, endereço, apresentadores, autores e fotos permanecem dados configuráveis ausentes — nunca placeholders apresentados como verdade.
