import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Stats from "./pages/Stats";
import FriendDetails from "./pages/FriendDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/friend/:id" element={<FriendDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;