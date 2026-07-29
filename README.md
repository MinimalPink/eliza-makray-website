# Eliza Makray — site

Site estático (HTML5 semântico + CSS/JS puro, sem build, sem framework). Basta abrir `index.html` direto no navegador ou enviar a pasta inteira para qualquer hospedagem estática.

## Estrutura

```
index.html        Homepage — hero, índice vivo, teaser do manifesto, teasers dos projetos,
                   linha do tempo condensada, teaser das oficinas, transição para o calendário, rodapé
obras.html         Acervo completo: Tintas Naturais + Fotografias (Terra Fértil) + Audiovisual
projetos.html      4 capítulos: Musas em Retratos, Ervas Daninhas, Alma Botânica, Ciranda das Ervas
oficinas.html      Aquarelas Naturais, Tintas de Terra, Artista Multidisciplinar, Residência
sobre.html         Manifesto completo, léxico de materiais, trajetória e currículo completos
calendario.html    Página de vendas do Calendário Musas
obrigado.html      Página de agradecimento pós-compra (destino do redirecionamento do Mercado Pago)
styles.css         Sistema de design completo (paleta, escala tipográfica, componentes) — usado em todas as páginas
script.js          Menu, revelação ao rolar, lightbox, acordeões, barra de compra fixa, camada de rastreamento
assets/            Todas as imagens, organizadas por seção (ver abaixo)
```

## Placeholders a substituir antes de publicar

Procure no código por qualquer coisa entre `[COLCHETES]` — cada um é uma lacuna real, não um erro de digitação.

### Comércio (calendario.html, obrigado.html)
| Placeholder | Onde | O que fazer |
|---|---|---|
| `[MERCADO_PAGO_CHECKOUT_URL]` | calendario.html (3×) | Substituir pelo link real de checkout do Mercado Pago assim que o produto for criado. O site nunca processa pagamento — apenas direciona para o checkout externo. |
| `[PREÇO]`, `[ANO]`, `[FORMATO]`, `[DIMENSÕES]`, `[NÚMERO_DE_PÁGINAS]`, `[TIPO_DE_PAPEL]`, `[REGIÕES_DE_ENVIO]`, `[PRAZO]`, `[TIRAGEM]`, `[SUPORTE_PARA_PENDURAR]` | calendario.html | Preencher com as especificações reais do produto. Não adivinhar — foram deixados em branco de propósito porque o material de origem não confirmava esses dados. |
| `[NÚMERO_DO_PEDIDO_MERCADO_PAGO]` | obrigado.html | Se o número do pedido for passado por parâmetro de URL no redirecionamento do Mercado Pago, conectar essa lógica em script.js; caso contrário, remover essa linha. |

### Fotografia do produto (calendário)
calendario.html tem **8 caixas tracejadas de placeholder** (`.media-placeholder`) marcadas `[FOTO_CAPA]`, `[FOTO_MIOLO_ABERTO]`, `[FOTO_DETALHE_ILUSTRACAO]`, `[FOTO_ENCADERNACAO]`, `[FOTO_PAPEL]`, `[FOTO_PENDURADO]`, `[FOTO_EMBALAGEM]`, `[FOTO_OUTROS_MESES]`, além de uma na sequência "matéria → calendário". **Não havia nenhuma foto do calendário físico impresso no material fornecido** — apenas as obras de arte (pinturas/aquarelas) que presumivelmente aparecerão dentro dele. Substitua cada `<div class="media-placeholder">` por um `<img>` real assim que houver fotografia do produto. Não preencher com banco de imagens.

### Contato e rastreamento
| Placeholder | Onde | O que fazer |
|---|---|---|
| `[EMAIL_DA_ARTISTA]` | index.html, oficinas.html, calendario.html, obrigado.html | E-mail de contato real da Eliza. |
| `[NUMERO_WHATSAPP]` | index.html, calendario.html, obrigado.html | Número de WhatsApp em formato internacional, só dígitos (ex.: `5548999999999`), usado nos links `https://wa.me/`. |
| `[GOOGLE_APPS_SCRIPT_ENDPOINT]` | script.js, início do arquivo | URL de um Google Apps Script publicado como Web App que adiciona linhas a uma planilha do Google. Se deixado como está, os eventos de rastreamento são simplesmente ignorados — o site nunca quebra por causa disso. |
| `[CANONICAL_URL]` | `<link rel="canonical">` e JSON-LD de todas as páginas | O domínio ao vivo assim que estiver conectado (ex.: `https://elizamakray.osite.dev` ou o domínio final). |
| `[SOCIAL_SHARE_IMAGE_URL]` | tags Open Graph de todas as páginas | Uma imagem 1200×630 para pré-visualização de links (Instagram/WhatsApp/Facebook). Sugestão: usar uma das fotos de Terra Fértil ou uma aquarela da série Musa. |

### Links externos (projetos.html)
| Placeholder | O que fazer |
|---|---|
| `[CANVA_APRESENTACAO_MUSAS_URL]` | Link para a apresentação em Canva já existente da Eliza sobre participação e valores do Musas em Retratos (citada no documento de conteúdo dela). |
| `[LOJA_ALMA_BOTANICA_URL]` | Link para a loja virtual da Alma Botânica. |

Ciranda das Ervas já aponta para o site oficial real (`cirandadaservas.com`) — não precisa de placeholder ali.

## Eventos de rastreamento

`script.js` define uma única função `track(eventName, data)` que envia (POST, no-cors, sem esperar resposta) para `GOOGLE_APPS_SCRIPT_ENDPOINT`. Ela nunca gera erro — se o endpoint estiver vazio, cada chamada é simplesmente ignorada, então o site funciona da mesma forma com ou sem analytics configurado.

Eventos já conectados via atributos `data-track="..."`: `page_view` (automático, em todas as páginas), `project_view` (cliques no Índice Vivo e nos teasers de projetos), `calendar_page_view` (automático em calendario.html), `calendar_checkout_click` (todo botão "Quero meu calendário"), `contact_click`, `whatsapp_click`, `purchase_thank_you_view` (automático em obrigado.html).

Para rastrear um novo elemento em qualquer lugar, basta adicionar `data-track="nome_do_evento"` (e opcionalmente `data-label="..."`) a qualquer link ou botão.

## Imagens

100 fotografias/obras reais foram extraídas da pasta do Google Drive e dos PDFs de conteúdo fornecidos, convertidas (HEIC/TIFF → JPEG) e redimensionadas para web com o `sips` do macOS. Organizadas dentro de `assets/`:

- `obras/` — 5 pinturas de grande formato + 16 aquarelas da série Musa (títulos, materiais e dimensões extraídos diretamente de "Infos sobre as obras.pdf")
- `fotografias/` — 30 imagens da exposição Terra Fértil (créditos extraídos de "Etiquetas Fotografias expo Terra Fértil.pdf")
- `audiovisual/` — imagens das 8 peças audiovisuais creditadas (de "infos Audio Visual.pdf")
- `musas-retratos/`, `ervas-daninhas/`, `alma-botanica/`, `oficinas/`, `portraits/` — das respectivas pastas do Drive

**Nota curatorial:** a pasta de origem "Sobre" continha majoritariamente fotografia de arte/performance com o corpo (Três Graças, estudos de Butô), algumas com nudez integral. Nos espaços de maior visibilidade (hero da homepage, retrato do Sobre), optei deliberadamente por enquadramentos não explícitos (tecido, silhueta, abstração em close-up); o material de performance mais explícito ficou apenas dentro das galerias contextualizadas de Fotografias/Musas, onde documenta obra já exibida em galeria. Se a Eliza preferir posicionamentos mais ousados, é só trocar o `<img src>` correspondente em `index.html` / `sobre.html`.

**Faltando:** não havia nenhuma fotografia do Calendário Musas impresso no material de origem — ver a seção de placeholders acima.

## Rodando localmente

Sem build. Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático para um comportamento de caminhos relativos mais limpo:

```bash
python3 -m http.server 8000
```

## Deploy

Envie este repositório para o GitHub e conecte-o ao Cloudflare Pages como site estático (sem comando de build, diretório raiz `/`, diretório de saída `/`).
