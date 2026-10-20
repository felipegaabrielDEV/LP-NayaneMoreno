# 🦷 Dra. Nayane Moreno — Site | Dentista em Aracaju

> 🚧 **Em planejamento.** Os documentos estratégicos estão sendo preenchidos com a cliente; a construção começa em seguida.

Site para a **Dra. Nayane Moreno**, cirurgiã-dentista em Aracaju/SE, com atuação em **Odontologia Miofuncional**, **Ortodontia** e **Clínica geral**. O objetivo é apresentar o jeito de trabalhar dela, que avalia a causa dos problemas (respiração, língua, mastigação, sono e postura) e não só a posição dos dentes, e levar pais e pacientes a uma conversa qualificada no WhatsApp para agendar a avaliação.

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

Os documentos estratégicos da cliente e as análises internas ficam no Google Drive, não aqui: este repositório é público.

---

## 🛠️ Tecnologias

Projeto **100% estático**, sem frameworks, bundlers ou dependências de build, publicado via **GitHub Pages**: HTML5 semântico, CSS3 puro e JavaScript vanilla, com Google Tag Manager, Modo de Consentimento do Google (LGPD) e links de WhatsApp rastreáveis por origem.

---

## ✅ Pendências de conteúdo

- [ ] Documentos estratégicos completos (Profissional, Persona, Mercado e Concorrentes)
- [ ] Briefing do site aprovado
- [ ] Logotipo em boa resolução, cores e fontes da marca
- [ ] Fotos da Dra. Nayane, do consultório e do espaço infantil
- [ ] Endereço completo, horários, WhatsApp e Instagram
- [ ] Convênios ativos e autorização para divulgar nomes e logos
- [ ] Confirmação das especialidades registradas no CRO-SE
- [ ] Conferência das regras de publicidade do CFO e do CRO-SE (depoimentos, avaliações, imagens de pacientes)
- [ ] Domínio e acesso ao Google Tag Manager

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

---

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código-fonte pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem à **Dra. Nayane Moreno** e não devem ser reutilizados sem autorização.
