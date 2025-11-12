import Intro from '@/app/components/intro'
function Processed(){
  const message = 
  <>
        <p>
          PREMIER MEATS not only provides fresh meat lines but also an
          assortment of delicious processed meats that would get each and every
          consumer yearning for more. Methods of processing include curing
          smoking or cooking.
        </p>
        <p>
          <em
            >The full list of processed meats provided by PREMIER include the
            following:</em
          >
        </p>
  </>
  
  return(
  <main className="px-2">
   <Intro title="Our Processed Meats" message={message} />
  </main>
  )
}
export default Processed