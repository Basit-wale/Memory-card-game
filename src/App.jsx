import { useEffect, useState } from "react";

const App = () => {
  const [score, setScore] = useState(0);
  // const [clicks, setClicks] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();

        // Now fetch detailed info for each Pokémon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-fit w-full bg-gray-600">
      <div className="flex justify-between h-20 shadow-md px-4 items-center">
        <div>
          <p className="font-semibold text-2xl">InDO Games</p>
        </div>

        <div className="flex flex-col text-sm font-semibold">
          <p>Score: {score}</p>
          <p>Best score: </p>
          {/* {clicks.map((click, idx) => (
            <p key={idx}>{click}</p>
          ))} */}
        </div>
      </div>
      <div className="w-full p-4">
        <div className="w-full">
          <div className={`flex flex-wrap gap-4`}>
            {pokemons.map((pokemon) => (
              <div
                className="border rounded-lg shadow p-4 w-[150px] text-center transition-transform duration-300 hover:scale-110"
                key={pokemon.id}
                onClick={() => {
                  setScore(score + 1);
                  // setClicks((prev) =>
                  //   prev.includes(pokemon.name) ? prev : [...prev, pokemon.name]
                  // );
                  // setPokemons()
                }}
              >
                <h3 className="capitalize text-lg font-semibold mb-2">
                  {pokemon.name}
                </h3>
                <img
                  src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                  alt={pokemon.name}
                  className="w-[120px] h-[120px] object-contain mx-auto"
                />

                <p className="text-sm">
                  <span className="font-medium">Type:</span>{" "}
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
