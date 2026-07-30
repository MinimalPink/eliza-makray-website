# Eliza Makray — site

Site institucional e de vendas da artista multidisciplinar brasileira Eliza Makray. Estático, sem build, sem framework — HTML5 semântico + CSS puro + JavaScript vanilla. Basta abrir `index.html` no navegador ou enviar a pasta inteira para qualquer hospedagem estática.

Conceito visual: "Living Herbarium" — arquivo digital de uma artista contemporânea cujos materiais vêm da terra. Paleta mineral, tipografia editorial de museu, texturas e fotografia reais (nenhuma imagem é banco de imagens ou gerada por IA).

---

## Sumário

1. [Stack técnica](#1-stack-técnica)
2. [Estrutura do repositório](#2-estrutura-do-repositório)
3. [Sistema de design](#3-sistema-de-design)
4. [Páginas](#4-páginas)
5. [Assets](#5-assets)
6. [JavaScript e interações](#6-javascript-e-interações)
7. [SEO](#7-seo)
8. [Rastreamento e analytics](#8-rastreamento-e-analytics)
9. [Deploy](#9-deploy)
10. [Rodando localmente](#10-rodando-localmente)
11. [O que ainda falta / placeholders](#11-o-que-ainda-falta--placeholders)

---

## 1. Stack técnica

| Camada | Tecnologia | Observação |
|---|---|---|
| Marcação | HTML5 semântico | `<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<figure>` — sem `<div>` genérico onde há tag semântica equivalente |
| Estilo | CSS puro (`styles.css`) | Um único arquivo, custom properties (`:root`) para todo o design system, sem pré-processador, sem Tailwind |
| Comportamento | JavaScript vanilla (`script.js`) | Um único arquivo, sem dependências, sem bundler, carregado com `defer` |
| Tipografia | Google Fonts via `@import` | Cormorant Garamond (serifada editorial), Manrope (grotesca), IBM Plex Mono (rótulos/arquivo), Stylish (logo — ver [nota importante](#nota-fonte-stylish-só-tem-glifos-coreanos)) |
| Build | Nenhum | Não há `npm`, `package.json`, bundler ou etapa de compilação. O que está no repositório é exatamente o que vai ao ar |
| Hospedagem alvo | Cloudflare Pages / Workers Assets | Ver [seção de deploy](#9-deploy) — inclui uma pegadinha real já resolvida |

Por que sem framework: o site é 7 páginas de conteúdo majoritariamente estático (texto + imagem + vídeo), sem estado complexo de aplicação. React/Vue teriam custo (bundle, build, manutenção de dependências) sem benefício real aqui.

---

## 2. Estrutura do repositório

```
.
├── index.html            Homepage — hero, índice vivo, manifesto (teaser), 4 projetos
│                          (teaser), trajetória, oficinas (teaser), transição calendário, rodapé
├── obras.html             Acervo: Tintas Naturais (21 obras) + Fotografias (30, Terra Fértil)
│                          + Audiovisual (9 vídeos/peças)
├── projetos.html          4 capítulos: Musas em Retratos, Ervas Daninhas, Alma Botânica,
│                          Ciranda das Ervas
├── oficinas.html          Aquarelas Naturais, Tintas de Terra, Artista Multidisciplinar,
│                          Residência Artística — hero com vídeo
├── sobre.html             Manifesto completo, léxico de materiais, trajetória (exposições,
│                          residências, curadoria) e currículo completo (arte/percussão/saúde)
├── calendario.html        Landing page de vendas do Calendário Musas
├── obrigado.html          Página de agradecimento pós-compra (redirecionamento Mercado Pago)
├── styles.css             Design system completo — usado por todas as páginas
├── script.js              Nav mobile, revelação ao rolar, lightbox, acordeões, abas,
│                          barra de compra fixa, camada de rastreamento
├── .assetsignore          Impede que o Cloudflare Workers Assets suba .git/ como asset
│                          (ver seção de deploy)
├── .gitignore
└── assets/
    ├── obras/              21 imgs — pinturas grandes (5) + série Musa (16 aquarelas)
    ├── fotografias/        30 imgs — exposição Terra Fértil
    ├── audiovisual/        8 vídeos + 8 pôsteres — peças audiovisuais creditadas
    ├── musas-retratos/     8 imgs + 1 vídeo — instalação e retratos da exposição
    ├── ervas-daninhas/     8 imgs — cartazes lambe-lambe
    ├── alma-botanica/      7 imgs — processo de criação das aquarelas botânicas
    ├── oficinas/           20 imgs + 1 vídeo + pôster — oficinas e residências
    ├── portraits/          6 imgs — retrato da artista e estudos performáticos
    ├── calendario/         vazio — nenhuma foto do produto físico foi fornecida
    └── icons/               favicon.svg (construído em código, não é asset de terceiros)
```

Todas as páginas compartilham `styles.css` e `script.js` — não há CSS/JS por página.

---

## 3. Sistema de design

Tudo declarado em `:root` no topo de `styles.css`.

### Paleta

| Token | Hex | Uso |
|---|---|---|
| `--ivory` | `#F1EADF` | Fundo principal |
| `--ivory-dim` | `#E8DFD0` | Fundo alternado (seções, cards) |
| `--clay` | `#C98F72` | Acento secundário |
| `--terracotta` | `#A9563E` | Acento primário (links ativos, números de arquivo, CTA outline) |
| `--olive` | `#565C3D` | Acento botânico (ilustrações de linha) |
| `--botanical` | `#263A2B` | Verde profundo (banner de transição do calendário) |
| `--burgundy` | `#6D252A` | Acento escuro (CTA final do calendário) |
| `--pollen` | `#D69B35` | Destaque pontual (preço, detalhes dourados) |
| `--carbon` | `#171512` | Texto principal, rodapé, fundo de vídeo |

### Tipografia

- **Cormorant Garamond** (`--font-display`) — títulos, manifesto, números de ano na trajetória
- **Manrope** (`--font-body`) — corpo de texto, navegação
- **IBM Plex Mono** (`--font-mono`) — rótulos de arquivo, legendas, metadados, preço
- Escala fluida via `clamp()` — `--fs-2xl` até `--fs-label`, todos responsivos sem media query adicional

<a name="nota-fonte-stylish-só-tem-glifos-coreanos"></a>
> **Nota importante — fonte "Stylish" no logo:** o seletor `.nav-mark strong` (o "Eliza Makray" do cabeçalho) foi alterado para `font-family: "Stylish", sans-serif`. Verifiquei o Google Fonts: **"Stylish" é uma fonte só com glifos coreanos (Hangul/CJK) — não tem nenhuma cobertura de caracteres latinos.** Isso significa que, na prática, o texto "Eliza Makray" está caindo silenciosamente no fallback `sans-serif` — a declaração `"Stylish"` não tem efeito visual nenhum sobre esse texto hoje. Se a intenção era um logo com uma fonte estilizada/manuscrita em latim, é preciso trocar por outra família do Google Fonts com suporte a caracteres latinos (ex.: algo como *Playfair Display*, *Cormorant*, ou uma fonte script como *Pinyon Script* / *Marck Script*, dependendo do estilo desejado) e adicioná-la ao `@import` no topo do `styles.css`.

### Espaçamento e layout

- Escala de espaçamento em `rem` de `--space-3xs` (0.4rem) a `--space-2xl` (13rem)
- `--edge-pad`: padding lateral responsivo (`clamp(1.5rem, 4vw, 3rem)`) — usado no header e no hero para manter as duas áreas alinhadas na mesma grade
- `--header-h: 102px` — altura real do cabeçalho, usada para calcular `height: calc(100svh - var(--header-h))` no hero da homepage, garantindo que ele caiba exatamente numa tela

### Componentes principais (todos em `styles.css`, comentados por bloco)

Nav · Hero (homepage) · Índice Vivo · Manifesto · Projetos (teaser) · Trajetória (lista estática) · Oficinas (teaser) · Transição do calendário · Rodapé · Cabeçalho de subpágina · Grade de obras · Lightbox · Capítulos de projeto (cada um com composição visual própria) · Blocos de oficina · Acordeões · Hero de produto (calendário) · Sequência "matéria → calendário" · Barra de compra fixa (mobile) · Placeholder de mídia

---

## 4. Páginas

### `index.html`
Hero cinematográfico (foto de Terra Fértil, recorte controlado por `object-position`) → Índice Vivo dos 3 territórios (Tintas Naturais / Fotografias / Audiovisual, cada um linkando para `obras.html`) → teaser do manifesto → 4 projetos em destaque (linkam para `projetos.html`) → trajetória de exposições (lista estática, não é carrossel — ver nota abaixo) → teaser de oficinas → banner de transição para o Calendário Musas → rodapé com contato.

> A trajetória já passou por duas versões: uma faixa horizontal com scroll (abandonada — escondia conteúdo e misturava cards com/sem foto de forma inconsistente) e a versão atual, uma lista estática vertical sem necessidade de interação, com números de ano grandes em serifada. Se pedir mudanças nessa seção no futuro, prefira manter tudo visível sem exigir scroll horizontal ou clique.

### `obras.html`
Acervo completo, organizado em 3 blocos:
- **Tintas Naturais** — 5 pinturas de grande formato + a série Musa completa (16 aquarelas), cada uma com título, ano, materiais exatos e dimensões (extraídos diretamente do PDF fornecido pela artista)
- **Fotografias** — as 30 imagens da Terra Fértil, agrupadas por série/crédito real (fotógrafa, ano)
- **Audiovisual** — 9 peças em vídeo com pôster + player nativo, cada uma com performer/captação/edição creditados. "Carmen" não tem vídeo confirmado (nenhum arquivo correspondia com segurança) e aparece como card só de texto — não invente uma prévia para ela sem confirmar a fonte.

### `projetos.html`
4 capítulos, cada um com composição visual distinta (não é o mesmo componente de card repetido 4×):
1. **Musas em Retratos** — colagem assimétrica de fotos + vídeo de registro da exposição
2. **Ervas Daninhas** — "mural" de cartazes lambe-lambe rotacionados
3. **Alma Botânica** — split editorial mostrando o processo de criação das aquarelas (não são fotos de produto — ver nota nos assets)
4. **Ciranda das Ervas** — composição circular remetendo ao oráculo

### `oficinas.html`
Hero dividido: texto + navegação por âncora de um lado, vídeo de processo do outro (`assets/oficinas/oficinas-video.mp4`, 700px de largura máxima). Abaixo, os 4 blocos: Aquarelas Naturais (com abas Crianças/Adultos), Tintas de Terra, Artista Multidisciplinar, Residência Artística — todos com texto integral (não resumido) do material fornecido pela artista.

### `sobre.html`
Manifesto completo (texto longo, verbatim, sem versão resumida — a versão curta só aparece como citação de uma linha na homepage), léxico de materiais, trajetória completa (individuais, coletivas, residências, curadoria) e currículo completo (arte, percussão, saúde da mulher, coletivos) dentro de um acordeão expansível.

### `calendario.html`
Landing page de vendas do Calendário Musas: hero de produto com CTA duplo, narrativa "matéria → pigmento → gesto → obra → calendário", galeria de produto (**hoje só com placeholders visuais tracejados — nenhuma foto real do calendário impresso foi fornecida**), ficha técnica, credibilidade da artista, FAQ em acordeão, CTA final e barra de compra fixa no mobile.

### `obrigado.html`
Página de agradecimento pós-compra, destino do redirecionamento do Mercado Pago. `noindex` no `<meta name="robots">` (não deve aparecer em buscas). Dispara o evento `purchase_thank_you_view` automaticamente.

---

## 5. Assets

110 imagens + 10 vídeos reais, extraídos da pasta do Google Drive e dos PDFs de conteúdo fornecidos pela artista (nenhuma imagem de banco de imagens, nenhuma gerada por IA). HEIC/TIFF convertidos para JPEG, tudo redimensionado para web via `sips` (macOS).

**Nota curatorial — nudez artística:** a pasta de origem "Sobre" contém majoritariamente fotografia de arte/performance com o corpo (coletiva Três Graças, estudos de Butô), algumas com nudez integral — é trabalho artístico real, documentado e já exibido em galeria, não conteúdo impróprio. Nos espaços de maior visibilidade pública (hero da homepage, retrato do Sobre) usei deliberadamente enquadramentos não explícitos (tecido, silhueta, abstração em close-up); o material de performance mais explícito só aparece dentro das galerias já contextualizadas de Fotografias/Musas em `obras.html` e `projetos.html`. Para trocar por posicionamentos mais ousados, basta trocar o `<img src>` correspondente.

**Nota de precisão — Alma Botânica:** a pasta correspondente do Drive contém fotos do *processo* de criação (Eliza desenhando em tablet, pintando aquarela, colhendo material no jardim) — **não são fotos de produto final**. O texto e as legendas em `projetos.html` já refletem isso corretamente; não trate essas imagens como se fossem embalagem/mercadoria pronta.

**Faltando:** nenhuma fotografia do Calendário Musas impresso — ver [seção 11](#11-o-que-ainda-falta--placeholders).

---

## 6. JavaScript e interações

Um único arquivo (`script.js`), organizado em blocos independentes, todos dentro de um IIFE:

| Bloco | O que faz |
|---|---|
| Camada de rastreamento | `track(eventName, data)` — ver [seção 8](#8-rastreamento-e-analytics) |
| Nav mobile | Abre/fecha o menu off-canvas, fecha ao clicar em qualquer link |
| Revelação do hero | Ativa `data-revealed="true"` no load; efeito sutil de paralaxe por cursor (desativado se `prefers-reduced-motion`) |
| Revelação ao rolar | `IntersectionObserver` adiciona `.is-visible` a qualquer elemento `[data-reveal]`; se `prefers-reduced-motion` estiver ativo ou o navegador não suportar, tudo aparece direto, sem animação |
| Acordeões | Abre/fecha painéis `[data-accordion-trigger]` (FAQ do calendário, trajetória completa do Sobre) |
| Abas de público | Alterna Crianças/Adultos na oficina de Aquarelas Naturais |
| Lightbox | Funciona por grupos `[data-gallery="nome"]` — clique abre, setas/teclado navegam, Esc fecha, foco é devolvido ao elemento de origem |
| Barra de compra fixa | Só no `calendario.html`, aparece no mobile quando o CTA do hero sai da tela (via `IntersectionObserver`) |

Tudo respeita `prefers-reduced-motion: reduce` — animações são puladas, não apenas aceleradas.

---

## 7. SEO

| Item | Status | Detalhe |
|---|---|---|
| `lang="pt-BR"` | ✅ em todas as páginas | |
| Título único por página | ✅ | Todos os 7 `<title>` são distintos e descritivos |
| Meta description | ✅ | Uma por página, específica ao conteúdo |
| Open Graph (`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`) | ⚠️ parcial | `og:image` usa `[SOCIAL_SHARE_IMAGE_URL]` em todas as páginas — placeholder, ver seção 11 |
| Twitter Card | ✅ | `summary_large_image` nas páginas principais |
| Canonical | ⚠️ placeholder | `[CANONICAL_URL]` em todas as páginas — só pode ser preenchido depois que o domínio final for definido |
| Favicon | ✅ | SVG construído em código (`assets/icons/favicon.svg`), sem dependência externa |
| `robots: noindex` | ✅ | Só em `obrigado.html`, corretamente (página não deve ser indexada) |
| Dados estruturados (JSON-LD) | ✅ parcial | `Person` (com `PostalAddress`, `sameAs` para Instagram) em `index.html` e `sobre.html`; `Product` em `calendario.html` — **preço e disponibilidade foram deixados de fora de propósito**, porque ainda não estão confirmados (schema.org exige que esses campos, se presentes, sejam precisos) |
| HTML semântico | ✅ | `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<figure>` usados de forma consistente |
| Imagens com `alt` descritivo | ✅ | Todo `<img>` de conteúdo tem alt text específico (não genérico) |
| `width`/`height` explícitos | ✅ | Todas as imagens têm as dimensões reais do arquivo como atributos HTML, evitando layout shift |
| Lazy loading | ✅ | `loading="lazy"` em toda imagem abaixo da dobra; hero usa `fetchpriority="high"` |
| `sitemap.xml` | ❌ não existe | Recomendado antes do lançamento — 7 URLs, simples de gerar manualmente |
| `robots.txt` | ❌ não existe | Recomendado — pelo menos para apontar o sitemap e bloquear `/obrigado.html` de crawlers agressivos (o `noindex` já resolve a indexação, mas um `robots.txt` é boa prática complementar) |

---

## 8. Rastreamento e analytics

`script.js` define `track(eventName, data)`, que envia um `POST` (modo `no-cors`, sem aguardar resposta) para `GOOGLE_APPS_SCRIPT_ENDPOINT`. **Nunca lança erro** — se o endpoint estiver vazio ou for o placeholder, a chamada é ignorada silenciosamente e o site funciona normalmente com ou sem analytics configurado.

### Eventos já conectados

| Evento | Disparo | Onde |
|---|---|---|
| `page_view` | Automático | Toda página, ao carregar |
| `project_view` | Clique | Índice Vivo e teasers de projeto na homepage |
| `calendar_page_view` | Automático | Ao carregar `calendario.html` |
| `calendar_checkout_click` | Clique | Todo botão "Quero meu calendário" / CTA de compra |
| `contact_click` | Clique | Links de e-mail e CTAs de oficina |
| `whatsapp_click` | Clique | Todo link `wa.me/` |
| `purchase_thank_you_view` | Automático | Ao carregar `obrigado.html` |

Para rastrear um novo elemento em qualquer página, basta adicionar `data-track="nome_do_evento"` (e opcionalmente `data-label="..."`) a um link ou botão — nenhum código adicional é necessário.

---

## 9. Deploy

Repositório privado em [github.com/MinimalPink/eliza-makray-website](https://github.com/MinimalPink/eliza-makray-website), conectado ao Cloudflare Pages / Workers Assets.

### Pegadinha real já resolvida — `.assetsignore`

O deploy no Cloudflare (via `wrangler deploy`, fluxo unificado Pages/Workers) tenta subir **todo** o diretório do repositório como assets estáticos — incluindo `.git/`. Isso já quebrou o build uma vez: o Workers Assets tentou subir `.git/objects/pack/*.pack` (71 MB) como se fosse um asset de página, estourando o limite de 25 MB por arquivo.

**Solução:** o arquivo `.assetsignore` na raiz (sintaxe igual a `.gitignore`) exclui `.git`, `.gitignore` e `README.md` do bundle enviado. Se um novo build falhar com "Asset too large" apontando para algo dentro de `.git/`, comece por aí.

### Passos de configuração (Cloudflare Pages)

1. Conectar o repositório GitHub ao projeto Cloudflare Pages
2. Comando de build: nenhum (site estático)
3. Diretório de saída: `/` (raiz)
4. Depois de conectado, todo `git push` para `main` dispara um novo deploy automaticamente

---

## 10. Rodando localmente

Sem build. Duas opções:

```bash
# Abrir direto
open index.html

# Ou servir localmente (recomendado — caminhos relativos mais confiáveis)
python3 -m http.server 8000
# depois acessar http://localhost:8000
```

---

## 11. O que ainda falta / placeholders

Todo `[COLCHETE]` no código é uma lacuna real deixada de propósito — não foi preenchida porque a informação não estava confirmada no material de origem. **Não adivinhar esses valores.**

### 🔴 Bloqueia o lançamento comercial

| Placeholder | Onde | O que fazer |
|---|---|---|
| `[MERCADO_PAGO_CHECKOUT_URL]` | `calendario.html` (3×) | Link real do checkout, criado no Mercado Pago. O site nunca processa pagamento — só direciona para o checkout externo |
| `[PREÇO]` | `calendario.html` (2×) | Preço confirmado do Calendário Musas |
| Fotos do produto | `calendario.html` — 8 caixas `.media-placeholder` (`[FOTO_CAPA]`, `[FOTO_MIOLO_ABERTO]`, `[FOTO_DETALHE_ILUSTRACAO]`, `[FOTO_ENCADERNACAO]`, `[FOTO_PAPEL]`, `[FOTO_PENDURADO]`, `[FOTO_EMBALAGEM]`, `[FOTO_OUTROS_MESES]`) + 1 na sequência "matéria → calendário" | **Nenhuma foto do calendário físico impresso foi fornecida.** Substituir cada `<div class="media-placeholder">` por um `<img>` real assim que houver fotografia do produto — nunca preencher com banco de imagens |

### 🟡 Especificações do produto (calendário)

| Placeholder | Campo |
|---|---|
| `[ANO]` | Ano do calendário (7×) |
| `[FORMATO]` | Formato físico |
| `[DIMENSÕES]` | Dimensões (2×) |
| `[NÚMERO_DE_PÁGINAS]` | Número de páginas |
| `[TIPO_DE_PAPEL]` | Tipo de papel |
| `[REGIÕES_DE_ENVIO]` | Regiões de envio (2×) |
| `[PRAZO]` | Prazo de entrega (2×) |
| `[TIRAGEM]` | Tiragem/edição limitada (2×) |
| `[SUPORTE_PARA_PENDURAR]` | Se acompanha suporte para pendurar |
| `[NÚMERO_DO_PEDIDO_MERCADO_PAGO]` | `obrigado.html` — se o número do pedido vier por parâmetro de URL no redirecionamento, conectar essa lógica em `script.js`; senão, remover a linha |

### 🟡 Contato

| Placeholder | Onde |
|---|---|
| `[EMAIL_DA_ARTISTA]` | `index.html`, `oficinas.html` (4×), `calendario.html`, `obrigado.html` |
| `[NUMERO_WHATSAPP]` | `index.html`, `calendario.html`, `obrigado.html` — formato internacional, só dígitos (ex.: `5548999999999`) |

### 🟡 Infraestrutura / integrações

| Placeholder | Onde | O que fazer |
|---|---|---|
| `[CANONICAL_URL]` | `<link rel="canonical">` e JSON-LD em todas as 7 páginas | Preencher com o domínio final assim que estiver definido |
| `[SOCIAL_SHARE_IMAGE_URL]` | Open Graph em todas as 7 páginas | Imagem 1200×630 para pré-visualização de link (WhatsApp/Instagram/Facebook). Sugestão: uma foto de Terra Fértil ou uma aquarela Musa |
| `[GOOGLE_APPS_SCRIPT_ENDPOINT]` | `script.js`, topo do arquivo | URL de um Google Apps Script publicado como Web App. Enquanto vazio, o rastreamento é ignorado sem erro |
| `[CANVA_APRESENTACAO_MUSAS_URL]` | `projetos.html` | Link da apresentação em Canva sobre participação/valores do Musas em Retratos |
| `[LOJA_ALMA_BOTANICA_URL]` | `projetos.html` | Link da loja virtual da Alma Botânica |

*Ciranda das Ervas já linka para o site oficial real (`cirandadaservas.com`) — não precisa de placeholder ali.*

### 🟠 Problemas técnicos conhecidos

1. **Fonte "Stylish" no logo não tem efeito visual** — ver [nota completa na seção 3](#nota-fonte-stylish-só-tem-glifos-coreanos). É uma fonte só com glifos coreanos; o texto latino "Eliza Makray" está caindo no fallback `sans-serif` silenciosamente. Trocar por uma família com cobertura latina se a intenção era um logo estilizado.
2. **`sitemap.xml` e `robots.txt` não existem** — recomendado antes do lançamento, mesmo sendo opcional tecnicamente.
3. **Vídeo "Carmen"** (`obras.html`, seção Audiovisual) não tem prévia em vídeo — nenhum arquivo do material fornecido pôde ser confirmado com segurança como sendo essa peça. Aparece como card só de texto. Se o arquivo certo aparecer depois, adicionar como as outras peças (poster + `<source>`).

### ✅ Já resolvido / não precisa de ação

- Todas as imagens e vídeos são materiais reais fornecidos pela artista (nenhum banco de imagens, nenhuma geração por IA)
- Todo texto de conteúdo (manifesto, descrições de projeto, oficinas, currículo) é verbatim do material de origem — passou por auditoria linha a linha contra os documentos e PDFs originais
- Nenhuma imagem quebrada, nenhum erro de console, nenhum overflow horizontal em nenhuma página (verificado em desktop e mobile)
- `.assetsignore` já resolve o problema de deploy do Cloudflare
