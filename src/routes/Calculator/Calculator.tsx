import useSWR from "swr";
import { useState } from "react";
import data from "../../data.ts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useCurrency = (currency = "eur") => {
  return useSWR(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
    fetcher
  );
};

const currencies = Object.entries(data).filter(([_, value]) => value);
currencies.sort((a, b) => {
  if (a[1] > b[1]) {
    return 1;
  }
  if (a[1] < b[1]) {
    return -1;
  }
  return 0;
});

export const Calculator = () => {
  const [from, setFrom] = useState("eur");
  const [to, setTo] = useState("rub");
  const { data: currRates, isLoading } = useCurrency(from);

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value);
    if (fromValue) {
      setToValue(
        Number((fromValue * currRates[from][e.target.value]).toFixed(2))
      );
    }
  };

  const handleToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value);
    if (fromValue) {
      setToValue(
        Number((fromValue * currRates[from][e.target.value]).toFixed(2))
      );
    }
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(Number(e.target.value));
    setToValue(Number((+e.target.value * currRates[from][to]).toFixed(2)));
  };

  if (isLoading) {
    return "Initial loading...";
  }

  return (
    <section className="flex flex-col items-center max-w-xl mx-auto bg-white h-72 rounded-md border-2 border-black mt-10">
      <h1 className="uppercase my-4">Калькулятор валют</h1>
      <form className="flex flex-col px-4 gap-4">
        <div className="mb-4">
          <input
            value={fromValue}
            onChange={(e) => handleFromValueChange(e)}
            type="number"
            min={0}
            className="me-4 h-8 border-2 border-slate-600 rounded-md px-3 py-1"
          />
          <select
            name="currencies"
            id="currencies"
            value={from}
            className="max-w-60 h-8 border-2 border-slate-600 rounded-md px-3 py-1"
            onChange={handleFromChange}
          >
            {currencies.map(([currency, currValue], idx) => (
              <option key={idx} value={currency}>
                {currValue}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            value={toValue}
            readOnly
            className="me-4 h-8 border-2 border-slate-600 rounded-md px-3 py-1"
          />
          <select
            name="currencies"
            id="currencies"
            value={to}
            className="max-w-60 h-8 border-2 border-slate-600 rounded-md px-3 py-1"
            onChange={handleToChange}
          >
            {currencies.map(([currency, currValue], idx) => (
              <option key={idx} value={currency}>
                {currValue}
              </option>
            ))}
          </select>
        </div>
      </form>
      <p className="mt-10">Курсы валют актуальны на: {currRates.date}</p>
    </section>
  );
};
