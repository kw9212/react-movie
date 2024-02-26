import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json()) // response json 파일로 잡고
      .then((json) => {
        setCoins(json);
        setLoading(false); // coin 얻기가 끝났다면 로딩 종료
      });
    //    .then((json) => console.log(json)); // 그 json을 추출해보자.
  }, []);

  const handleUsd = (event) => {
    setUsd(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! ({loading ? "" : `${coins.length}`})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <h1>
        If you have{" "}
        <input
          type="number"
          onChange={handleUsd}
          value={usd}
          placeholder="The amount you have..."
        ></input>
        dollars..
      </h1>
      <select>
        {coins.map((coin, index) => (
          <option key={index}>
            You can buy {usd / coin.quotes.USD.price} {coin.name} ({coin.symbol}
            )
          </option>
        ))}
      </select>
    </div>
  );
}
