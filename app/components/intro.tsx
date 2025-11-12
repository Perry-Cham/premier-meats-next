import {isValidElement} from 'react'
interface Props {
  title : string;
  message : React.ReactNode;
}
function Intro({title,message}: Props){
  const isValid = isValidElement(message)
  return(
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>
      { !isValid ? <p>{message}</p> : message}
    </section>
    )
}
export default Intro