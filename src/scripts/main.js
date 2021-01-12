// função para iniciar o jogo
function start() {
    $("#inicio").hide();
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    
    var jogo = {}
    var TECLA = {
        W: 38,
        S: 40,
        D: 68
    }
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar=true;
    var fimdejogo=false;

    jogo.timer = setInterval(loop,30); // deixando o fundo do jogo em loop a cada 30ms
    jogo.pressionou = [];

    //Verifica se o usuário pressionou alguma tecla
    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
        
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });
    
    // função de looping
    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
    }
    
    // função que movimenta o fundo do jogo
    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
    }

    // função para mover o helicóptero cinza
    function moveJogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo - 10);

            // limitando o helicóptero no topo da página
            if (topo<=0) {
                $("#jogador").css("top",topo + 10);
            }
        }

        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);

            // limitando o helicóptero no final da página
            if (topo>=434) {	
                $("#jogador").css("top",topo-10);		
            }
        }
        
        if (jogo.pressionou[TECLA.D]) {
            disparo(); // chama função disparo	
        }
    }

    // função para mover o inimigo 1, helicóptero amarelo
    function moveInimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX - velocidade);
        $("#inimigo1").css("top",posicaoY);
            
        if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);           
        }
    }

    // função para mover o inimigo 2, caminhão
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left",posicaoX - 3);
				
		if (posicaoX<=0) {
            $("#inimigo2").css("left",775);		
		}
    }

    // função para mover o amigo, o que vai ser resgatado
    function moveAmigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX + 1);

        if (posicaoX > 906) {
            $("#amigo").css("left",0);
        }
    }

    // função que realiza o disparo da arma do helicóptero cinza
    function disparo() {
        if (podeAtirar == true) {
            podeAtirar = false;
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 15);
        }
        
        // função que realiza o disparo da arma
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX + 15);
            
            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }

    // função que verifica a colisão dos itens do jogo
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // colisão do jogador (helicóptero) com o inimigo1, helicóptero
        if (colisao1.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        // colisão do jogador (helicóptero) com o inimigo2, caminhão
        if (colisao2.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);

            $("#inimigo2").remove();
            reposicionaInimigo2();
        }

        // colisão do disparo com o inimigo 1, helicóptero	
        if (colisao3.length > 0) {
	        inimigo1X = parseInt($("#inimigo1").css("left"));
	        inimigo1Y = parseInt($("#inimigo1").css("top"));		
            explosao1(inimigo1X,inimigo1Y);
        
	        $("#disparo").css("left",950);
	        posicaoY = parseInt(Math.random() * 334);
	        $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        // colisão do disparo com o inimigo 2, caminhão
	    if (colisao4.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            reposicionaInimigo2();
        }

        // colisão do jogador (helicóptero) com o amigo
	    if (colisao5.length > 0) {
            reposicionaAmigo();
            $("#amigo").remove();
        }
    }

    // função da explosão, colisão com o inimigo 1, helicóptero
    function explosao1(inimigo1X,inimigo1Y) {
        $("#fundoGame").append("<div id ='explosao1'></div");
        $("#explosao1").css("background-image", "url(./src/assets/images/explosao.png)");

        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width: 200, opacity: 0}, "slow");
        
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

    // função que reposiciona inimigo2, caminhão
	function reposicionaInimigo2() {
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=inimigo2></div");
            }
        }	
    }

    // função da explosão, colisão com o inimigo 2, caminhão
	function explosao2(inimigo2X,inimigo2Y) {
        $("#fundoGame").append("<div id = 'explosao2'></div");
        $("#explosao2").css("background-image", "url(./src/assets/images/explosao.png)");

        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width: 200, opacity: 0}, "slow");
        
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
        
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    }

    // função que reposiciona o amigo
	function reposicionaAmigo() {
        var tempoAmigo = window.setInterval(reposiciona6, 6000);
        
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;
            
            if (fimdejogo == false) {
                $("#fundoGame").append("<div id ='amigo' class ='anima3'></div>");
            }
        }
    }
}

