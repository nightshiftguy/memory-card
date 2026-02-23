export default function Cardboard({Cards}){
    return Cards.map((card)=>{
      return <img src={card.image_url} alt="" key={card.name}/>
    })
}