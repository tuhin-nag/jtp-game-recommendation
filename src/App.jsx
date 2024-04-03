import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import NavBar from "./components/NavBar";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search_results" element={<SearchResults />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;