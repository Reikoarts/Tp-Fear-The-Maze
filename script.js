const options = {
    size:12,
    walls:true,
    hearts:true,
    enemies:true,
    loot:true,
    ice:true
};


createGrid(options);
setHearts(3);

document.querySelector('#go-up').onclick = goUp;
document.querySelector('#go-down').onclick = goDown;
document.querySelector('#go-right').onclick = goRight;
document.querySelector('#go-left').onclick = goLeft;

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    goUp();
  } else if (e.keyCode == "40") {
    goDown();
  } else if (e.keyCode == "37") {
    goLeft();
  } else if (e.keyCode == "39") {
    goRight();
  }
}





function goUp(){
    let heroPosition = getHeroPosition();

    wall =getWalls(heroPosition.x, heroPosition.y);
    if(wall.north == false){
        heroPosition.y--;
        setHeroPosition(heroPosition.x, heroPosition.y);
        getLoots();
        fightMonster();

        if(isFrozen(heroPosition.x, heroPosition.y)){
            goUp();
        }
    }
}

function goDown(){
    let heroPosition = getHeroPosition();

    wall =getWalls(heroPosition.x, heroPosition.y);
    if(wall.south == false){
        heroPosition.y++;
        setHeroPosition(heroPosition.x, heroPosition.y);
        getLoots();
        fightMonster();

        if(isFrozen(heroPosition.x, heroPosition.y)){
            goDown();
        }
    }




}

function goRight(){
    let heroPosition = getHeroPosition();

    wall =getWalls(heroPosition.x, heroPosition.y);
    if(wall.east == false){
        heroPosition.x++;
        setHeroPosition(heroPosition.x, heroPosition.y);
        getLoots();
        fightMonster();

        if(isFrozen(heroPosition.x, heroPosition.y)){
            goRight();
        }
    }


}

function goLeft(){
    let heroPosition = getHeroPosition();

    wall =getWalls(heroPosition.x, heroPosition.y);
    if(wall.west == false){
        heroPosition.x--;
        setHeroPosition(heroPosition.x, heroPosition.y);
        getLoots();
        fightMonster();

        if(isFrozen(heroPosition.x, heroPosition.y)){
            goLeft();
        }

    }


}


function getLoots(){

    let heroPosition = getHeroPosition();
    let actualHeart = getHearts();
    let maxHeart = 5;
    let cellContent = getCellContent(heroPosition.x, heroPosition.y);
    

    if(cellContent == HEART && actualHeart != maxHeart){
        setHearts(actualHeart + 1);
    } else if (cellContent == LOOT){
        loot(heroPosition.x, heroPosition.y);

    }

    let actualTreasures = getTreasures();

    if(actualTreasures == 0){
        alert('Vous avez gagné !')
    }

}

function fightMonster(){
    let heroPosition = getHeroPosition();
    let actualHeart = getHearts();
    let cellContent = getCellContent(heroPosition.x, heroPosition.y);
    let monsterPower = getMonsterPower(heroPosition.x, heroPosition.y);

    if(cellContent == MONSTER && actualHeart > monsterPower){
        killMonster(heroPosition.x, heroPosition.y);
        setHearts(actualHeart - monsterPower);
    }else if (cellContent == MONSTER && actualHeart <= monsterPower){
        alert('Oups ! La partie est terminée...');
    }   

}