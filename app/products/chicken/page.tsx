import Intro from '@/app/components/intro'
function Chicken() {
  const message =<><p>
          PREMIER MEATS aims to be a major role player when it comes to chicken
          supply in Zambia.
        </p>
        <p>
          Chicken is a delicacy in most Zambian households and is the most consumed meat among the Zambian People
        </p>
        <p>It can be boiled fried or grilled and is tasty in every form</p>
        <p>
        The full chicken lines produced by Premier Meats include the following
        </p></> 

  return (
    <main className="px-2">
      <Intro title="Our Chicken" message={message} />
    </main>
  )
}
export default Chicken