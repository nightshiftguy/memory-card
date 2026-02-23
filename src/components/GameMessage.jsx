export default function GameMessage({gameState}){
    let gameInfo=""
    let style={}
    if(gameState==="game-win"){
            gameInfo="You found all pokemons. Congratulations!";
            style={"color":"darkgreen", "backgroundColor":"lightgreen"}
    }
    else if(gameState==="round-lose"){
        gameInfo="Pokemon clicked twice - You lose";
        style={"color":"darkred", "backgroundColor":"lightpink"}
    }
    else if(gameState==="round-win"){
        gameInfo="You found new pokemon!";
        style={}
    }
    return <p style={style} className="game-message">{gameInfo}</p>
}