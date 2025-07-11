import { useEffect, useState } from "react";
import Vid from "./assets/AdobeStock_641335422_Video_HD_Preview.mov";

const App = () => {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fisher-Yates shuffle (safe & doesn't mutate state directly)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledPokemons = shuffleArray(pokemons);

  const [message, setMessage] = useState("");
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score.toString());
    }
  }, [score, bestScore]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=21");
        const data = await res.json();

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

  if (loading)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="h-fit w-full bg-gray-600 text-slate-100">
      <div className="flex justify-between h-20 shadow-md px-4 items-center bg-gray-800">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <p className="font-semibold text-3xl">Pokémon Memory Game</p>
            <p className="text-base text-slate-200">
              Get points by clicking on an image, but don't click the same one
              more than once!
            </p>
          </div>
          <p className="text-lg text-red-600 font-orbitron">{message}</p>
        </div>
        <div className="flex flex-col text-lg font-semibold">
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </div>
      </div>

      <div className="w-full p-4 relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={Vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex flex-wrap gap-4 justify-center z-20 relative">
          {shuffledPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => {
                if (clicks.includes(pokemon.name)) {
                  setScore(0);
                  setClicks([]); // Reset if already clicked
                  setMessage("You lost! Try again.");
                  setTimeout(() => setMessage(""), 2000); // Clear message after 2
                } else {
                  setScore((prev) => prev + 1);
                  setClicks((prev) => [...prev, pokemon.name]);
                }
              }}
              className="border rounded-lg shadow-lg p-4 w-[170px] text-center bg-white text-black transition-transform duration-300 hover:scale-110"
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
      <footer className="flex justify-center items-center h-10 bg-gray-800 text-gray-300">
        <p className="text-sm font-[calibri]">Built by Basit</p>
      </footer>
    </div>
  );
};

export default App;
