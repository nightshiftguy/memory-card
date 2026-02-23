import "../styles/Cardboard.css"
export default function Cardboard({Cards, cardClickHandler}){
    return <div className="cardboard">
        {Cards.map((card)=>{
            return <img src={card.image_url} alt="" key={card.name} name={card.name} onClick={cardClickHandler} className="cardboard-img"/>}
        )}
    </div>
}