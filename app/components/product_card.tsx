interface Props{
  name?:string;
  price?:string;
  imagesrc?:string;
}
function Card({name, price, imagesrc}:Props){
  return(
  <div className="">
    <div>
    <img src={imagesrc}/>
    </div>
    <div>
      <p className="font-bold">{name}</p>
      <p className="font-bold">{price}</p>
    </div>
  </div>
  )
}
export default Card