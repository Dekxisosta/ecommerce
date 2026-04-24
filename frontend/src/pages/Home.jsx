import {Hero, Perks, EventsCarousel, CategoryCarousel, Featured, Testimonials} from "./sections";
import {Background} from "./components";
import {Divider} from "./layouts";

export default function Home() {
  return (
    <>
      <Hero/>
      <Perks/>
      <EventsCarousel/>
      <CategoryCarousel />
      <Divider />
      <Featured/>
      <Divider />
      <Testimonials/>
      <Background />
    </>
  )
}
