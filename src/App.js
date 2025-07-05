import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from "./routes/Home";
import Info from "./routes/Info/Info";
import Rank from "./routes/Rank/Rank";
import Community from "./routes/Community/Community";
import PatchNote from "./routes/PatchNote";
import Download from "./routes/Download";
import Info_About from "./routes/Info/Info_About";
import Info_Seven from "./routes/Info/Info_Seven";
import Info_Holdem from "./routes/Info/Info_Holdem";
import Info_BlackJack from "./routes/Info/Info_BlackJack";
import Rank_Detail from "./routes/Rank/Rank_Detail";
import Community_Sub from "./routes/Community/Community_Sub";
import Community_Post from "./routes/Community/Community_Post";
import Minigame from "./routes/Minigame";

function App() {
  return (
    <Router basename="/PokerProjectWebSite">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Info/About" element={<Info_About />} />
        <Route path="/Info/Holdem" element={<Info_Holdem />} />
        <Route path="/Info/Seven" element={<Info_Seven />} />
        <Route path="/Info/BlackJack" element={<Info_BlackJack />} />
        <Route path="/Rank" element={<Rank />} />
        <Route path="/Rank/:type" element={<Rank_Detail />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/Community/:type" element={<Community_Sub />} />
        <Route path="/Community/:type/:id" element={<Community_Post />} />
        <Route path="/PatchNote" element={<PatchNote />} />
        <Route path="/Download" element={<Download />} />
        <Route path="/Minigame" element={<Minigame />} />
      </Routes>
    </Router>
  );
}

export default App;