import { useState, useEffect } from "react";

function currencyConverter() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currencies, setCurrencies] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [fromCurrency, setFromCurrency] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toCurrency, setToCurrency] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [amount, setAmount] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [result, setResult] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Charge les devises disponibles
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setFromCurrency(data.base);
        setToCurrency(Object.keys(data.rates)[0]);
      });
  }, []);

  const handleConvert = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        setResult((amount * rate).toFixed(2));
      });
  };
  return (
    <>
      <div className="converter">
        <h1>Convertisseur de Monnaie</h1>
      </div>
      <div>
        <label>Montant :</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>De :</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>À :</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert}>Convertir</button>
      {result && (
        <h2>
          Résultat : {result} {toCurrency}
        </h2>
      )}
    </>
  );
}

export default currencyConverter;
