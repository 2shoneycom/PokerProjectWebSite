import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from "./routes/Home";
import Info from "./routes/Info";
import Rank from "./routes/Rank";
import Community from "./routes/Community";
import PatchNote from "./routes/PathNote";
import Download from "./routes/Download";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Rank" element={<Rank />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/PatchNote" element={<PatchNote />} />
        <Route path="/Download" element={<Download />} />
      </Routes>
    </Router>
  );
}

export default App;