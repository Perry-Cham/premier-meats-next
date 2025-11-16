import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function About() {
  const sectionStyles = "grid grid-cols-[50% 50%] md:min-h-screen";
  return (
    <main>
      <section className={sectionStyles}>
        <div></div>
        <div>
          <h2>Our Business</h2>
          <p>
            We are a player in the wholesale and retail of an assortment of
            fresh and processed meat products in the Zambian, regional and
            international markets. The main products that we supply are as
            follows:
          </p>
          <ul>
            <li>Beef</li>
            <li>Pork</li>
            <li>Chicken</li>
            <li>Chevon, mutton(Goat Meat)</li>
            <li>Fish</li>
            <li>Processed Meat</li>
            <li>Eggs</li>
          </ul>
          <p>
            Our products are packed and supplied with the consumer in mind:
            Whether you are a caterer, restaurateur, a trader, a wholesaler, a
            retailer, or simply a consumer, we have a range of products packed
            especially for your needs
          </p>
        </div>
      </section>
      <section className={sectionStyles}>
        <div></div>
        <div>
          <h3>CORE VALUES</h3>
          <ul>
            <li>Integrity and Honesty</li>
            <li>Commitment</li>
            <li>Teamwork</li>
            <li>Rewarding hardwork and effort</li>
            <li>Encouraging risk taking and responsibility</li>
            <li>Empowering others</li>
            <li>Enjoying our work and lives</li>
          </ul>
        </div>
      </section>
      <section className={sectionStyles}>
        <div></div>
        <div>
          {" "}
          <article>
            <h3>SCOPE OF MARKET</h3>
            <p>
              The scope of our market is national, regional and international
            </p>
          </article>
          <article>
            <h3>TARGET MARKET</h3>
            <p>We are targeting:</p>
            <ul>
              <li>The Corporate Market</li>
              <li>The Formal Retail Sector</li>
              <li>The Informal Retail Sector</li>
              <li>The Mass Consumer Market</li>
              <li>The Export Market</li>
            </ul>
          </article>
          <article>
            <h3>SALES AND DISTRIBUTION SCHEDULE</h3>
            <p>
              <strong>PREMIER MEATS</strong> is on the move 7 days a week,
              meaning local and out of town deliveries are made DAILY.
            </p>
          </article>
          <article>
            <h3>RETAIL OPERATION</h3>
            <p>
              PREMIER MEATS seeks to be a truly national meat supplier by
              ensuring it has a physical retail presence in all ten provinces of
              the Republic of Zambia; literally giv-ing it a national retail
              footprint.
            </p>
            <p>
              In the next five years we project that 70% of our annual turnover
              will arise from our retail operation which will subsequently lead
              to an increase in volume growth in We are aiming to open 150
              outlets in total within Zambia by 2026. Each outlet is to showcase
              and reflect our “all-in-one”, “all-under-one-roof” and “one stop
              shop” strategy therefore our stocking will consist of beef, pork,
              chicken, chevon, mutton, processed meat, eggs, fish, and support
              products such as meal-ie-meal, cooking oil rice and flour.
            </p>
          </article>
        </div>
      </section>
      <section className="min-h-screen">
        <h2>The Management Team</h2>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Chief Executive</CardTitle>
            </CardHeader>
            <CardContent>
              MR LUBINDA CHAMILEKE has rich industry knowledge with over 14
              years of senior management experience in food sales and marketing.
              He has worked for Zambeef, Africa’s largest vertically integrated
              meat company and the 20th largest retailer by revenue in various
              capacities such as Group Head of Business &amp; Corporate Sales, as
              well as Group Head of Marketing. He has worked under
              USAID/TechnoServe as a consultant on sales capacity building,
              registering significant success with staff training as well as
              acquiring and securing new markets for clients. As CEO, he will
              set the vision and mission for Premier Meats.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Company Secretary and Chief Administrative</CardTitle>
            </CardHeader>
            <CardContent>
              MRS MARIA M. CHAMILEKE has a decade of experience as an Admin
              Specialist with duties encompassing HR, Office Management,
              Purchasing and Supply, IT and Logistics, having worked for one of
              the leading retail chains in Zambia, Game Stores. She shall
              coordinate Premier Meat’s entire administrative support.
            </CardContent>
          </Card>
        </div>
      </section>
      <section className={sectionStyles}>
        <div></div>
        <div>
            <h2>Get In Touch With Us</h2>
            <p>We are at premier are commited to customer satisfaction. To get in touch with us visit one of our stores or get in touch with management using the details on the <a href="/contact">Conatct Page</a></p>
        </div>
      </section>
    </main>
  );
}
export default About