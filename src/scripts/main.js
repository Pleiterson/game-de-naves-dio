// função para iniciar o jogo
function start() {
    $("#inicio").hide();
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    
    var jogo = {}
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);

    jogo.timer = setInterval(loop,30); // deixando o fundo do jogo em loop a cada 30ms
    
    // função de looping
    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
    }
    
    // função que movimenta o fundo do jogo
    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
    }

    jogo.pressionou = [];

    //Verifica se o usuário pressionou alguma tecla
	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
        
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });

    // função para mover o helicóptero cinza
    function moveJogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo-10);

            // limitando o helicóptero no topo da página
            if (topo<=0) {
                $("#jogador").css("top",topo+10);
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
            //Chama função Disparo	
        }
    }

    // função para mover o inimigo 1, helicóptero amarelo
    function moveInimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
        if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);           
        }
    }
}
