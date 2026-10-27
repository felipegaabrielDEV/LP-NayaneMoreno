/* ==========================================================================
   Dra. Nayane Moreno · Comportamento da página (prévia 1)
   Aqui ficam: menu, barra de progresso, item ativo do menu, botão flutuante,
   perguntas frequentes, galeria do consultório e os links do WhatsApp.
   Ainda NÃO há formulário nem rastreamento: entram na prévia 2
   (lead-form.js, eventos.js e consent.js, como descrito no padrão técnico).
   ========================================================================== */
(function () {
    "use strict";

    var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------------
       WhatsApp
       O número vem da meta "whatsapp-number" do index.html (só dígitos, com DDI e DDD).
       [PENDENTE: número oficial]. Enquanto estiver vazio, o link abre o WhatsApp sem destinatário.
       A 1ª linha da mensagem muda conforme o botão (data-wa-origin).
       --------------------------------------------------------------- */
    var meta = document.querySelector('meta[name="whatsapp-number"]');
    var numero = meta ? meta.content.replace(/\D/g, "") : "";

    var mensagemPadrao = "Olá! Vim pelo site e quero agendar uma avaliação com a Dra. Nayane Moreno.";
    var mensagensPorOrigem = {
        sinais: "Olá! Vim pelo site, percebi um sinal em casa e quero agendar uma avaliação com a Dra. Nayane Moreno.",
        servico_miofuncional: "Olá! Vim pelo site e quero agendar uma avaliação de Odontologia Miofuncional com a Dra. Nayane Moreno.",
        servico_ortodontia: "Olá! Vim pelo site e quero agendar uma avaliação de Ortodontia com a Dra. Nayane Moreno.",
        servico_clinico: "Olá! Vim pelo site e quero agendar uma consulta de clínica geral com a Dra. Nayane Moreno.",
        convenios: "Olá! Vim pelo site e quero confirmar se a Dra. Nayane Moreno atende pelo meu plano.",
        faq: "Olá! Vim pelo site da Dra. Nayane Moreno e tenho uma dúvida."
    };

    function linkWhatsApp(origem) {
        var texto = mensagensPorOrigem[origem] || mensagemPadrao;
        return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
    }

    document.querySelectorAll("[data-wa]").forEach(function (el) {
        el.href = linkWhatsApp(el.getAttribute("data-wa-origin"));
        el.target = "_blank";
        el.rel = "noopener";
    });

    /* ---------------------------------------------------------------
       Menu (móvel em tela cheia)
       Fecha com Esc, com toque fora dos links e com toque num link. Trava a rolagem do fundo.
       --------------------------------------------------------------- */
    var botaoMenu = document.querySelector(".menu-botao");
    var menu = document.getElementById("menu");

    function abrirMenu(abrir) {
        botaoMenu.setAttribute("aria-expanded", String(abrir));
        botaoMenu.querySelector(".menu-botao__texto").textContent = abrir ? "Fechar" : "Menu";
        botaoMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
        menu.classList.toggle("aberto", abrir);
        document.body.classList.toggle("menu-aberto", abrir);
    }

    botaoMenu.addEventListener("click", function () {
        abrirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
        if (e.target === menu || e.target.closest("a")) abrirMenu(false);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("aberto")) {
            abrirMenu(false);
            botaoMenu.focus();
        }
    });
    window.matchMedia("(min-width: 1200px)").addEventListener("change", function (e) {
        if (e.matches) abrirMenu(false);
    });

    /* ---------------------------------------------------------------
       Cabeçalho: sombra, barra de progresso e item do menu da seção visível
       --------------------------------------------------------------- */
    var cabecalho = document.querySelector(".cabecalho");
    var barra = document.getElementById("progresso");
    var links = Array.prototype.slice.call(document.querySelectorAll(".menu__lista a"));
    var alvos = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
    var tick = false;

    function aoRolar() {
        var y = window.scrollY;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        cabecalho.classList.toggle("com-sombra", y > 8);
        barra.style.width = (total > 0 ? Math.min(100, (y / total) * 100) : 0) + "%";

        var linha = cabecalho.offsetHeight + window.innerHeight * 0.3;
        var ativo = -1;
        alvos.forEach(function (sec, i) {
            if (sec && sec.getBoundingClientRect().top <= linha) ativo = i;
        });
        links.forEach(function (a, i) {
            if (i === ativo) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
        });
        tick = false;
    }
    window.addEventListener("scroll", function () {
        if (!tick) { tick = true; window.requestAnimationFrame(aoRolar); }
    }, { passive: true });
    aoRolar();

    /* ---------------------------------------------------------------
       Botão flutuante: aparece depois que o botão principal do topo sai da tela
       --------------------------------------------------------------- */
    var flutuante = document.getElementById("flutuante");
    var botaoTopo = document.querySelector(".topo .btn--grande");
    if (flutuante && botaoTopo && "IntersectionObserver" in window) {
        new IntersectionObserver(function (entradas) {
            var e = entradas[0];
            flutuante.hidden = e.isIntersecting || e.boundingClientRect.top > 0;
        }).observe(botaoTopo);
    } else if (flutuante) {
        flutuante.hidden = false;
    }

    /* ---------------------------------------------------------------
       Perguntas frequentes: uma aberta por vez
       --------------------------------------------------------------- */
    var itensFaq = document.querySelectorAll(".faq__item");
    itensFaq.forEach(function (item) {
        var botao = item.querySelector(".faq__pergunta");
        botao.addEventListener("click", function () {
            var abrir = botao.getAttribute("aria-expanded") !== "true";
            itensFaq.forEach(function (outro) {
                outro.classList.remove("aberto");
                outro.querySelector(".faq__pergunta").setAttribute("aria-expanded", "false");
            });
            if (abrir) {
                item.classList.add("aberto");
                botao.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* ---------------------------------------------------------------
       Galeria do consultório
       Uma foto por vez; troca sozinha a cada 5 s; pausa no hover e no foco; para de vez ao toque.
       Com prefers-reduced-motion não troca sozinha. O último slide é o mapa.
       --------------------------------------------------------------- */
    var galeria = document.getElementById("galeria");
    if (galeria) {
        var faixa = galeria.querySelector(".galeria__faixa");
        var slides = Array.prototype.slice.call(galeria.querySelectorAll(".galeria__slide"));
        var pontos = galeria.querySelector(".galeria__pontos");
        var atual = 0;
        var timer = null;
        var parou = false;

        slides.forEach(function (_, i) {
            var p = document.createElement("button");
            p.type = "button";
            p.className = "galeria__ponto";
            p.setAttribute("aria-label", "Ir para a foto " + (i + 1) + " de " + slides.length);
            p.addEventListener("click", function () { parar(); ir(i); });
            pontos.appendChild(p);
        });

        function ir(i) {
            atual = (i + slides.length) % slides.length;
            faixa.style.transform = "translateX(" + (-100 * atual) + "%)";
            slides.forEach(function (s, n) {
                s.inert = n !== atual;
                s.setAttribute("aria-hidden", n === atual ? "false" : "true");
            });
            Array.prototype.forEach.call(pontos.children, function (p, n) {
                if (n === atual) p.setAttribute("aria-current", "true");
                else p.removeAttribute("aria-current");
            });
        }
        function iniciar() {
            if (reduzirMovimento || parou || timer) return;
            timer = window.setInterval(function () { ir(atual + 1); }, 5000);
        }
        function pausar() { window.clearInterval(timer); timer = null; }
        function parar() { parou = true; pausar(); }

        galeria.querySelector(".galeria__seta--esq").addEventListener("click", function () { parar(); ir(atual - 1); });
        galeria.querySelector(".galeria__seta--dir").addEventListener("click", function () { parar(); ir(atual + 1); });
        galeria.addEventListener("mouseenter", pausar);
        galeria.addEventListener("mouseleave", iniciar);
        galeria.addEventListener("focusin", pausar);
        galeria.addEventListener("focusout", iniciar);
        galeria.addEventListener("touchstart", parar, { passive: true });

        ir(0);
        /* Só roda sozinha enquanto a galeria está na tela */
        if ("IntersectionObserver" in window) {
            new IntersectionObserver(function (entradas) {
                if (entradas[0].isIntersecting) iniciar(); else pausar();
            }).observe(galeria);
        }
    }

    /* ---------------------------------------------------------------
       Entrada em cascata dos cartões (desligada com prefers-reduced-motion)
       --------------------------------------------------------------- */
    if (!reduzirMovimento && "IntersectionObserver" in window) {
        var grupos = [".sinais", ".testes", ".servicos", ".etapas", ".credenciais"];
        var obs = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); }
            });
        }, { rootMargin: "0px 0px -8% 0px" });
        grupos.forEach(function (seletor) {
            var lista = document.querySelector(seletor);
            if (!lista) return;
            Array.prototype.forEach.call(lista.children, function (filho, i) {
                filho.classList.add("reveal");
                filho.style.setProperty("--i", i % 6);
                obs.observe(filho);
            });
        });
    }
})();
