window.addEventListener("DOMContentLoaded", function () {
    var dificuldade = document.getElementById("dificuldade");
    var temporizador = document.getElementById("temporizador");
    var btnIniciar = document.getElementById("btnIniciar");
    var btnPausar = document.getElementById("btnPausar");
    btnPausar.disabled = true;
    var btnParar = document.getElementById("btnParar");
    var numero = document.getElementById("numero");
    var txtErros = document.getElementById("qntErros");
    var txtAcertos = document.getElementById("qntAcertos");
    var txtNumPares = document.getElementById("qntNumPares");
    var porcentAcertos = document.getElementById("porcentAcertos");
    
    // variaveis de controle
    var qntNumPares = 0;
    var qntAcertos = 0;
    var qntErros = 0;
    var intervaloContagem;
    var intervaloTemporizador;
    var numeroClicavel = true; // controle de estado para cliques
    var jogoEmAndamento = false; // controle de estado do jogo
    var intervaloTempo = 1000; // intervalo padrão de 1 segundo

    dificuldade.addEventListener("change", function() {
        if(dificuldade.selectedIndex == 0) {
            temporizador.innerHTML = "00:00";
            btnPausar.disabled = true;
        } else if (dificuldade.selectedIndex == 1) {
            temporizador.innerHTML = "01:45";
            intervaloTempo = 1000; // 1 segundo
        } else if(dificuldade.selectedIndex == 2) {
            temporizador.innerHTML = "01:15";
            intervaloTempo = 750; // 0.75 segundos
        } else if(dificuldade.selectedIndex == 3) {
            temporizador.innerHTML = "00:30";
            intervaloTempo = 500; // 0.5 segundos
        }
    })

    function formatarTempo(segundos) {
        var minutos = Math.floor(segundos / 60);
        var segundosRestantes = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    }

    function iniciarTemporizador() {
        var tempo = temporizador.innerHTML.split(':');
        var segundos = parseInt(tempo[0]) * 60 + parseInt(tempo[1]);

        intervaloTemporizador = setInterval(function() {
            if (segundos > 0) {
                segundos--;
                temporizador.innerHTML = formatarTempo(segundos);
            } else {
                clearInterval(intervaloTemporizador);
                clearInterval(intervaloContagem);
                numeroClicavel = false;
                alert("FIM DE JOGO!");
            }
        }, 1000);
    }

    function pausarJogo() {
        clearInterval(intervaloContagem);
        clearInterval(intervaloTemporizador);
        numeroClicavel = false;
        numero.style.opacity = "0.5"; // efeito visual ao pausar
        jogoEmAndamento = false; // resetar estado do jogo
    }

    function continuarJogo() {
        iniciarTemporizador();
        iniciaJogo();
        numeroClicavel = true;
        numero.style.opacity = "1"; // remover efeito visual ao despausar
        jogoEmAndamento = true; // marcar o jogo como em andamento
    }

    function pararJogo() {
        clearInterval(intervaloContagem);
        clearInterval(intervaloTemporizador);
        numero.innerHTML = "_";
        qntNumPares = 0;
        qntAcertos = 0;
        qntErros = 0;
        txtNumPares.innerHTML = qntNumPares;
        txtAcertos.innerHTML = qntAcertos;
        txtErros.innerHTML = qntErros;
        porcentAcertos.innerHTML = "0.00";
        temporizador.innerHTML = "00:00";
        dificuldade.selectedIndex = 0;
        numeroClicavel = false;

        // Desbloquear o select de dificuldade
        dificuldade.disabled = false;
        btnPausar.disabled = true;

        // resetar estado do jogo
        jogoEmAndamento = false;
    }

    function iniciaJogo() {
        numero.style.opacity = "1"; // remover efeito visual ao despausar
        // Bloquear o select de dificuldade
        dificuldade.disabled = true;
        btnPausar.disabled = false;

        intervaloContagem = setInterval(function() {
            var numAleatorio = parseInt((Math.random() * 100)+1);
            numero.style.color = "black";
            numero.innerHTML = numAleatorio;
            numeroClicavel = true; // permitir clique no novo número

            if (numAleatorio % 2 == 0) {
                qntNumPares++;
                txtNumPares.innerHTML = qntNumPares;
            }        
        }, intervaloTempo);
        
        numero.addEventListener("click", function() {
            // impedir múltiplos cliques
            if (!numeroClicavel) return; 
            // desabilitar clique após o primeiro
            numeroClicavel = false; 

            var num = parseInt(numero.innerHTML);
            if (num % 2 == 0) {
                qntAcertos++;
                console.log(qntAcertos);
                txtAcertos.innerHTML = qntAcertos;
                numero.style.color = "green";
                porcentAcertos.innerHTML = ((qntAcertos / qntNumPares) * 100).toFixed(2); // porcentagem de acertos
            } else {
                qntErros++;
                console.log(qntErros);
                txtErros.innerHTML = qntErros;
                numero.style.color = "red";
            }
        })
    };

    btnIniciar.addEventListener("click", function() {
        if (jogoEmAndamento) return; // impedir múltiplos inícios
        jogoEmAndamento = true; // marcar o jogo como em andamento

        iniciarTemporizador();

        if (dificuldade.selectedIndex == 0) {
            alert("Selecione uma dificuldade!");
            jogoEmAndamento = false; // resetar estado do jogo
            return;
        } else {

        iniciaJogo();

        }
    })

    btnPausar.addEventListener("click", function() {
        if (jogoEmAndamento) {
            pausarJogo();
        } else {
            continuarJogo();
        }
    })

    btnParar.addEventListener("click", function() {
        pararJogo();
    });
});