import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import SearchResults from "./pages/SearchResults";
import Library from "./pages/Library";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search_results" element={<SearchResults />} />
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </Router>
  );
}

export default App;