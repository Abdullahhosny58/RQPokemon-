import Navbar from "./components/navbar/Navbar";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonList from "./components/ProductItems";
// import PokemonDetails from "./components/PokemonDetails";
// import { Pokmens } from "./context/pokemonContext";
// import usePokemonData from "./hooks/usePokemonData";
import NotFoundPage from "./pages/NotFoundPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // const { pokemonData, handleSearchValue } = usePokemonData();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <PokmensContext.Provider value={{ pokemonData, handleSearchValue }}> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} /> */}
        </Routes>
      </BrowserRouter>
      {/* </PokmensContext.Provider> */}
    </QueryClientProvider>
  );
}

export default App;
