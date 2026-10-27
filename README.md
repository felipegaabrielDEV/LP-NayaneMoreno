# 🦷 Dra. Nayane Moreno — Site | Dentista em Aracaju

> 🚧 **Prévia 1 (~50%).** Estrutura completa, identidade visual proposta e textos da primeira versão. Onde falta informação da cliente, a própria página mostra um marcador amarelo `[PENDENTE: …]`. Site com `noindex`: não aparece no Google até a aprovação final.

Site para a **Dra. Nayane Moreno**, cirurgiã-dentista em Aracaju/SE (CRO-SE 2301), com atuação em **Odontologia Miofuncional**, **Ortodontia** e **Clínica geral**. O objetivo é apresentar o jeito de trabalhar dela, que avalia a causa dos problemas (respiração, língua, mastigação, sono e postura) e não só a posição dos dentes, e levar pais e pacientes a uma conversa qualificada no WhatsApp para agendar a avaliação.

---

## 🧭 Como o projeto é feito

Este repositório já vem com um agente configurado para o Claude Code. Ao abrir uma sessão aqui, o Claude lê o [`CLAUDE.md`](CLAUDE.md) (quem é a cliente, as regras de publicidade odontológica e de privacidade, o padrão técnico e o fluxo de entrega) e passa a trabalhar em quatro fases:

| Fase | Comando | O que faz |
|---|---|---|
| 1. Briefing | `/briefing` | Lê os documentos da cliente e decide públicos, mensagem, páginas e pendências |
| 2. Referências | `/referencias` | Pesquisa os concorrentes a fundo e escolhe sites-espelho |
| 3. Construção | `/construir-site` | Constrói o site em camadas, no padrão das LPs anteriores |
| 4. Prévia | `/previa` | Revisão independente, publicação da prévia e rodada de ajustes |

Dois subagentes apoiam o trabalho: **`pesquisador`** (pesquisa na web, com fonte e data) e **`revisor`** (revisão de conversão, publicidade, privacidade, acessibilidade e responsividade antes de cada entrega).

Os documentos estratégicos da cliente, o roteiro e as análises internas ficam no Google Drive, não aqui: este repositório é público.

---

## ✨ O que a prévia 1 já tem

Página única, na ordem do roteiro aprovado internamente:

| Bloco | Seção | O que faz |
|---|---|---|
| 00 | Menu e elementos fixos | Nome e CRO sempre visíveis, menu de 8 itens, barra de progresso, botão flutuante do WhatsApp |
| 01 | Topo e faixa de benefícios | "Seu filho dorme de boca aberta? Vale avaliar." e as saídas para adolescente, adulto e plano |
| 02 | Sinais para observar em casa | 6 cartões com as palavras dos pais; no lugar do antes e depois, que aqui é proibido |
| 03 | Protocolo | O que a avaliação olha e o painel "quando o cuidado vai além da Odontologia" |
| 04 | Para quem é | Três serviços por idade, cada um com âncora e botão próprios (`#miofuncional`, `#ortodontia`, `#clinica-geral`) |
| 05 | Convênios | Faixa curta; âncora `#convenios` |
| 06 | Como funciona a avaliação | 4 etapas, o acompanhamento e a citação dela |
| 07 | Quem é a Dra. Nayane | Trajetória e credenciais com instituição e ano |
| 08 | Consultório e localização | Galeria com as fotos do consultório e espaço para o mapa |
| 09 | Avaliações do Google | Bloco **reservado**: só entra no ar com autorização, norma conferida e perfil conferido |
| 10 | Perguntas frequentes | 10 perguntas em acordeão |
| 11 | Chamada final | Convite curto |
| 12 | Rodapé | Nome, Cirurgiã-Dentista, CRO-SE 2301, contato, horários e aviso |

Ainda **não** tem (entram na prévia 2): formulário antes do WhatsApp, eventos e Google Tag Manager com Modo de Consentimento, aviso de cookies, texto da política de privacidade, dados para o Google (`Dentist`), imagem de compartilhamento e `sitemap.xml`.

---

## 🎨 Identidade visual (proposta)

Sem logotipo nem manual de marca, a paleta saiu das fotos do consultório: verde-menta das paredes, azul-claro da bancada, rosa dos detalhes. Tudo está nos tokens do `:root` do [`styles.css`](styles.css). **Precisa de aprovação da cliente.**

- **Cores:** verde-profundo `#0b3f3c` (títulos e seções escuras), menta `#e3f4f1`, creme `#fbf8f3` e coral `#c4452d` só no botão de ação (contraste 4,96 com texto branco).
- **Fontes:** Fraunces (títulos) e Nunito Sans (texto), pelo Google Fonts.
- **Ícones:** SVG em traço, no sprite do início do `index.html`.

---

## 🛠️ Tecnologias

Projeto **100% estático**, sem frameworks, bundlers ou dependências de build, publicado via **GitHub Pages**: HTML5 semântico, CSS3 puro e JavaScript vanilla.

---

## 📂 Estrutura

```
├── index.html                    # Estrutura e conteúdo de todas as seções
├── styles.css                    # Identidade visual, layout responsivo e animações
├── script.js                     # Menu, galeria, perguntas frequentes e links do WhatsApp
├── politica-de-privacidade.html  # Espaço reservado (texto entra na prévia 2), noindex
├── 404.html                      # noindex, com a identidade do site
├── assets/consultorio/           # Fotos do consultório em WebP
├── docs/referencias.md           # Sites-espelho
└── .claude/                      # Agente, comandos e padrão técnico
```

---

## 📱 Responsividade, acessibilidade e performance

- Testado em 320, 375, 390, 430, 768, 1024, 1366 e 1920 px, sem rolagem horizontal.
- Foco visível em tudo que é clicável, contraste AA, áreas de toque de 44 px ou mais, menu móvel que fecha com `Esc` e com toque fora, perguntas frequentes com `aria-expanded`, galeria que não troca sozinha com `prefers-reduced-motion`.
- Fotos em WebP com largura e altura declaradas e `loading="lazy"`; sem bibliotecas externas de JavaScript.

---

## ▶️ Como rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

---

## 🔧 Manutenção: onde mexer

| Para mudar… | Edite |
|---|---|
| Número do WhatsApp | `<meta name="whatsapp-number">` no `index.html` (só dígitos, com DDI e DDD) |
| Mensagem que chega no WhatsApp | `mensagemPadrao` e `mensagensPorOrigem` no `script.js` |
| Cores, fontes e espaços | tokens do `:root` no `styles.css` |
| Fotos do consultório | `assets/consultorio/` e a lista `galeria__slide` no `index.html` |
| Marcador `[PENDENTE]` resolvido | troque o `<mark class="pend">…</mark>` pelo texto confirmado |

Todo botão de WhatsApp tem `data-wa` e `data-wa-origin`; o texto da primeira linha da mensagem muda conforme a origem.

---

## ✅ Pendências de conteúdo

A lista completa também aparece na própria página, em amarelo.

**Já resolvido com a cliente:** horário de atendimento (segunda a sexta, 8h às 12h e 14h às 17h, a confirmar se é dela ou da clínica), mentoria fora do site, divisão por idade (Miofuncional, Ortodontia, Clínica), uso de "protocolo" no lugar de "método", primeira consulta e acompanhamento.

**Travam o lançamento**
- [ ] Endereço atual, bairro e CEP (as fontes divergem: São José ou Jardins) e se as fotos são do consultório atual
- [ ] Número oficial do WhatsApp e links da Tintim por origem
- [ ] Convênios ativos hoje, cobertura por serviço e autorização para nomes e logos
- [ ] Nome exato da especialidade registrada no CRO-SE (ela escreveu de três jeitos); até lá, o site não usa "especialista"
- [ ] Faixa etária da Miofuncional (5 a 10, 5 a 9 ou 6 a 10) e idade mínima para avaliar
- [ ] Foto profissional vertical (topo e Sobre) e vídeo curto
- [ ] Comprovantes da formação (diploma, pós-graduação e certificados de Miofuncional) e a instituição dos cursos de 2019 e 2023
- [ ] Conferência da norma do CFO e do CRO-SE sobre "especialista", "casos resolvidos", depoimentos, imagens de pacientes e condições da primeira consulta
- [ ] Domínio e acesso ao Google Tag Manager

**Validação clínica e aprovação de texto da Dra. Nayane**
- [ ] Frase-ponte do protocolo ("quando a criança respira pela boca, a língua tende a ficar mais baixa…")
- [ ] Lista de sinais (inclui "range os dentes"?) e se entra um sinal de mastigação e um de postura
- [ ] Resposta à pergunta "isso passa com a idade? preciso esperar os dentes permanentes?"
- [ ] Em que casos encaminha para fonoaudiologia, fisioterapia respiratória e otorrino, e se pode nomear os parceiros
- [ ] Até onde vai a parte odontológica no ronco e no sono
- [ ] Protocolo em palavras simples (nome, ordem, duração) e se radiografias e fotos são sempre feitas
- [ ] Avaliação de ortodontia inclui respiração, língua e mastigação?
- [ ] Tipos de aparelho e alinhadores; ortopedia funcional é serviço próprio?
- [ ] Clínica geral: procedimentos, idades, odontopediatria
- [ ] Citações "Eu enxergo além dos dentes" e "Eu avalio e somente indico tratamento…" e o parágrafo da trajetória no Sobre
- [ ] Se pode citar que a primeira consulta inclui limpeza e aplicação de flúor (condição comercial)
- [ ] Se o espaço infantil (escalada, basquete, lousa, boliche) fica no consultório atual
- [ ] Logotipo em boa resolução e aprovação da paleta

**Dependem do material dela**
- [ ] Casos e vídeos de depoimento citados por ela: **autorização por escrito** (dos responsáveis, no caso das crianças) e norma conferida. Nomes de pacientes nunca entram no site nem no repositório
- [ ] Avaliações do Google: link e nota conferidos no próprio Google (os 4,90 e 156 vêm de um site de terceiros)
- [ ] Acessibilidade e estacionamento do consultório
- [ ] Perguntas reais que chegam no WhatsApp, para substituir a lista hipotética das perguntas frequentes

**Para a agência**
- [ ] Perfil do Google, Facebook e diretórios atualizados com o endereço e os convênios atuais, junto com o lançamento
- [ ] Combinar com o gestor de tráfego a lista de permissão das tags e os códigos `?t=` dos topos por campanha
- [ ] Nas fotos do site, os nomes escritos na lousa, os cartazes de "Dia das Crianças" e um calendário de mesa foram desfocados. Nas fotos novas, pedir os ambientes sem esses itens e confirmar que a pessoa do pôster rosa acima da lousa é a própria Dra. Nayane
- [ ] As fotos do site foram reduzidas para até 1280 px (a cópia na pasta do Drive é ainda menor): pedir as originais em boa resolução para o lançamento

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

---

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código-fonte pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem à **Dra. Nayane Moreno** e não devem ser reutilizados sem autorização.
