class Game {
  constructor() {
    this.resetTitle=createElement("h2")
    this.resetButton=createButton("")
    this.liderplacartitulo=createElement("h2")
    this.lider1=createElement("h2")
    this.lider2=createElement("h2")
  }

  getState(){
var gameStateRef=database.ref("gameState")
gameStateRef.on("value",function(data){
  gameState=data.val()
})
    //defina as funções da classe


}

  

  update(state){
   database.ref("/").update({
     gameState:state
   })
    //defina as funções da classe

  }

  start() {
    
    // crie uma instância de novo jogador
   player=new Player()
    // inicie a variável playerCount
    playerCount=player.getCount()

    form = new Form();
    form.display();

    car1 = createSprite (width/2 - 50, height - 100);
    car1.addImage("car1",car1_img);
    car1.scale = 0.07;

    // siga o exemplo acima para criar o sprite de car2
    car2 = createSprite (width/2 + 100, height - 100);
    car2.addImage("car2",car2_img);
    car2.scale = 0.07;

    // atribua os objetos ao vetor cars
    cars=[car1,car2]
    moedas=new Group()
    combustivel=new Group()
    this.addSprites(combustivel,4,combustivelImg,0.02)
    this.addSprites(moedas,18,moedasImg,0.09)
  }
  addSprites(spriteGroup,numerodesprites,spriteImage,scale){
   for(var i=0;i<numerodesprites;i++){
    var x,y
    x=random(width/2+150,width/2-150)
    y=random(-height*4.5,height-400)
    var sprite=createSprite(x,y)
    sprite.addImage(spriteImage)
    sprite.scale=scale
    spriteGroup.add(sprite)
   } 
  }
  handleElements(){
    // adicione os estilos à imagem do título.
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    this.resetTitle.html("reiniciar jogo")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width/2+200,40)
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2+230,100)
    this.liderplacartitulo.html("placar")
    this.liderplacartitulo.class("resetText")
    this.liderplacartitulo.position(width/3-50,40)
    this.lider1.class("lidersText")
    this.lider1.position(width/3-40,80)
    this.lider2.class("lidersText")
    this.lider2.position(width/3-40,130)
  }

  play () {

    //chame a função para esconder os elementos
    this.handleElements();
    Player.getPlayerInfo()
    player.getCarsAtEnd()
    this.handleResetButton();
    if(allPlayers !== undefined){
      image(track,0,-height*5,width,height*6)
      this.showlider()
      var index=0
      for(var plr  in allPlayers){
        index=index+1
        var x=allPlayers[plr].positionX
        var y=height-allPlayers[plr].positionY
        cars[index-1].position.x=x
        cars[index-1].position.y=y
      }
    }
    //chame a função para criar os sprites
    if(index===player.index){
      stroke(10)
      fill("red")
      ellipse(x,y,60,60)
      this.handleCombustivel(index)
      this.handleMoedas(index)
      camera.position.x=cars[index-1].position.x
      camera.position.y=cars[index-1].position.y
    }
    this.handlePlayerControls()
    const finishLine=height*6-100
    if(player.positionY>finishLine){
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank)
      player.update()
      this.showRank()
    }
    drawSprites()
  
  }
  handleCombustivel(index){
    cars[index-1].overlap(combustivel,function(collector,collected){
      player.fuel=185
      collected.remove()
    })
  }
  handleMoedas(index){
    cars[index-1].overlap(moedas,function(collector,collected){
      player.score+=21
      player.update()
      collected.remove()
    })
  }
  handleResetButton(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,
        gameState:0,
        carsAtEnd:0,
        players:{}
      })
      window.location.reload()
    })
  }
  showlider(){
  var lider1,lider2
  var players=Object.values(allPlayers)
  if(players[0].rank === 0 && players[1].rank === 0 || players[0].rank === 1){
    lider1=
    players[0].rank+
    "&emsp;"+
    players[0].name+
    "&emsp;"+
    players[0].score;
    lider2=
    players[1].rank+
    "&emsp;"+
    players[1].name+
    "&emsp;"+
    players[1].score;
  }
  if(players[1].rank === 1){
    lider1=
    players[1].rank+
    "&emsp;"+
    players[1].name+
    "&emsp;"+
    players[1].score;
    lider2=
    players[0].rank+
    "&emsp;"+
    players[0].name+
    "&emsp;"+
    players[0].score;
  }
  this.lider1.html(lider1)
  this.lider2.html(lider2)  
  }
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY += 10
      player.update()
    }
    //if(keyIsDown(LEFT_ARROW) && player.positionX>width/3-50){
     // player.positionX-=5
     // player.update()
   // }
    //if(keyIsDown(RIGHT_ARROW) && player.positionX<width/2+300){
   //   player.positionX+=5
    //  player.update()
   // }
  }
  showRank(){
    swal({
      title:`Incrivel!${"\n"}Jogador${"\n"}${player.rank}`,
      text:"Voce alcancou a linha de chegada com sucesso",
      imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize:"100x100",
      confirmButtonText:"Ok"
    })
  }
}
