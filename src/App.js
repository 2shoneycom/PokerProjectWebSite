import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from "./routes/Home";
import Info from "./routes/Info/Info";
import Rank from "./routes/Rank";
import Community from "./routes/Community";
import PatchNote from "./routes/PatchNote";
import Download from "./routes/Download";
import Info_About from "./routes/Info/Info_About";

function App() {
  return (
    <Router basename="/PokerProjectWebSite">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Info/About" element={<Info_About />} />
        <Route path="/Rank" element={<Rank />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/PatchNote" element={<PatchNote />} />
        <Route path="/Download" element={<Download />} />
      </Routes>
    </Router>
  );
}

export default App;