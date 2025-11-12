interface Props{
  name?:string;
  price?:string;
  imagesrc?:string;
}
function Card({name, price, imagesrc}:Props){
  return(
  <div>
    <div>
    <img src={imagesrc}/>
    </div>
    <div>
      <p>{name}</p>
      <p>{price}</p>
    </div>
  </div>
  )
}
export default Card