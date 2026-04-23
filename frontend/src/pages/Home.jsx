import Hero from "./sections/Hero.jsx";
import Perks from "./sections/Perks.jsx"
import Featured from "./sections/Featured.jsx"
import CategoryCarousel from "./sections/CategoryCarousel.jsx"
import EventsCarousel from "./sections/EventsCarousel.jsx"
import Testimonials from "./sections/Testimonials.jsx"
import Divider from "../shared/components/layouts/Divider.jsx"
import Background from "./components/Background.jsx"

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
