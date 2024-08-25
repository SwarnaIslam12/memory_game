import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const [foods, setFoods] = useState("");
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [round, setRound] = useState(1);

  function gameEnded() {
    setBest((prev) => Math.max(prev, score + 1));
    setScore(0);
    setRound((prev) => prev + 1);
  }
  function clickSuccess(array) {
    if (score === 11) {
      gameEnded();
    } else {
      setScore((prev) => prev + 1);
      shuffle(array);
    }
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setFoods(array);
  }
  useEffect(() => {
    const fetchFood = async () => {
      const temp = [];
      let count = 0;
      for (let i = 52772; count < 12; i++) {
        console.log("loading");
        const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
        const response = await fetch(url);
        const res = await response.json();
        if (res.meals === null) {
          continue;
        }
        const obj = res.meals[0];
        const details = {
          id: obj.idMeal,
          name: obj.strMeal,
          url: obj.strMealThumb,
          status: false,
        };
        temp.push(details);
        count++;
      }
      shuffle(temp);
      setLoading(false);
    };
    fetchFood();

    return () => {
      setLoading(true);
    };
  }, [round]);
  return (
    <>
      {!loading && (
        <Card
          foods={foods}
          score={score}
          best={best}
          clickSuccess={clickSuccess}
          clickFailed={gameEnded}
        />
      )}
    </>
  );
}

export default App;
