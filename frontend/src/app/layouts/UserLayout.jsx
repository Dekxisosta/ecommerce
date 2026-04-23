import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/layouts/Navbar"
import Footer from "../../shared/components/layouts/Footer"
import BotWidget from "../../features/bot/components/BotWidget";

export default function UserLayout() {
  return (
    <div>
        <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BotWidget />
    </div>
  );
}