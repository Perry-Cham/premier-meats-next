import Intro from '@/app/components/intro'
function Pork(){
  const message = 
  <>
            <p>
            PREMIER offers one of the most widely eaten and popular meats in the
            world... PORK!!!
          </p>
          <p>On offer are whole pork carcasses and pork cuts</p>
  </>
  
  return(
  <main className="px-2">
   <Intro title="Our Pork" message={message} />
  </main>
  )
}
export default Pork