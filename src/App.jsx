import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import SearchResults from "./pages/SearchResults";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search_results" element={<SearchResults />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;