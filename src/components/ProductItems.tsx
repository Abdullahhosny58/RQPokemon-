import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
  Skeleton,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  cardStyle,
  cardMediaStyle,
  typographyStyle,
  buttonStyle,
} from "./style/ProductItemsStyle";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPokemon } from "../api/getData";
import { Pokemon } from "../types/interfaces";

const PokemonList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const {
    data: pokemonData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchAllPokemon,
    refetchOnWindowFocus: false,
  });

  console.log(pokemonData);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (isLoading) {
    return (
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        {[...Array(itemsPerPage)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: 333,
              height: 277,
              marginTop: 6,
            }}
          />
        ))}
      </Stack>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", px: "600px", py: "10px" }}
      >
        <Alert severity="error">Error: {error.message}</Alert>
      </Box>
    );
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePokemon = pokemonData?.results.slice
    ? pokemonData.results.slice(startIndex, endIndex)
    : [];

  return (
    <Stack>
      {pokemonData && pokemonData.results.length > 0 ? (
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
          {visiblePokemon.map((pokemon: Pokemon) => (
            <Card
              key={pokemon.name}
              sx={{ ...cardStyle }}
              onClick={() => {
                navigate(`/pokemon/${pokemon.name}`);
              }}
            >
              <CardMedia
                sx={{ ...cardMediaStyle }}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                title={pokemon.name}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ ...typographyStyle }}
                >
                  {pokemon.name}
                </Typography>
                <Typography sx={{ ...typographyStyle }}></Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
          {[...Array(itemsPerPage)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{
                width: 333,
                height: 277,
                marginTop: 6,
              }}
            />
          ))}
        </Stack>
      )}

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          py: "20px",
          justifyItems: "center",
        }}
      >
        <Button
          disabled={currentPage === 0}
          onClick={handleClickPrevious}
          variant="contained"
          sx={{ ...buttonStyle }}
        >
          Previous
        </Button>
        <Button
          disabled={endIndex >= pokemonData?.results.length}
          onClick={handleClickNext}
          variant="contained"
          sx={{ ...buttonStyle }}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default PokemonList;
