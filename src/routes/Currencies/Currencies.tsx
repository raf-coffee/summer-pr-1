import { useState } from "react";
import useSWR from "swr";
import currenciesList from "../../data.ts";

interface Data {
  date?: string;
  [key: string]: any;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const sortCurrencies = (arr: Data) => {
  const currencies = Object.entries(arr).filter(([_, value]) => value);
  currencies.sort((a, b) => {
    if (a[1] > b[1]) {
      return 1;
    }
    if (a[1] < b[1]) {
      return -1;
    }
    return 0;
  });

  return currencies;
};

export const Currencies = () => {
  const [baseCurrency, setBaseCurrency] = useState<string | undefined>();
  const { data, error, isLoading } = useSWR(
    baseCurrency
      ? `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
      : null,
    fetcher
  );

  const handleBaseCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBaseCurrency(e.target.value);
  };

  if (error) {
    return "Oops, something goes wrong!";
  }
  if (isLoading) {
    return "Loading...";
  }

  console.log(data);
  console.log(baseCurrency);
  return (
    <section className="max-w-xl mx-auto mt-10 flex flex-col items-center">
      <select
        className="h-8 border-2 border-slate-600 rounded-md px-3 py-1"
        onChange={handleBaseCurrencyChange}
        value={baseCurrency ?? "choose"}
      >
        <option value="choose" disabled hidden>
          Выберите валюту:
        </option>
        {sortCurrencies(currenciesList).map((item) => (
          <option value={item[0]} key={item[0]}>
            {item[1]}
          </option>
        ))}
      </select>
      {baseCurrency && <p>Данные актуальны на: {data.date}</p>}
      {baseCurrency && (
        <div className="mt-10 flex flex-wrap gap-4 justify-between">
          {Object.entries(data[baseCurrency]).map((item) => (
            <span
              key={item[0]}
              className="px-4 py-1 bg-white border border-slate-700 rounded-lg"
            >
              {`${
                (currenciesList as Data)[item[0]]
                  ? (currenciesList as Data)[item[0]]
                  : item[0]
              } : ${Number(data[baseCurrency][item[0]].toFixed(2))}`}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
