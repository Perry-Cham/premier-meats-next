import Card from './product_card'
interface Props{
  title?:string;
  products:Array<object>;
}
function Display({title, products}: Props){
  return(
    <section>
      <h2>{title}</h2>
      <div>{products.map((p) => (<Card name={p.name} price={p.price} imagesrc={p.image}/>))}</div>
    </section>
    )
}
export default Display