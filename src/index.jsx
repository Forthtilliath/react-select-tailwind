import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Select from './Select';
import { options } from './data';
import './index.css';

function App() {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    const carValue = +e.target.car.value;
    setError(carValue === 0);
    setValue(carValue);
  };

  return (
    <div className="text-center">
      <h1 className="my-4 text-3xl font-bold">Custom Select</h1>
      <form onSubmit={onSubmit} className="selects__wrapper">
        <Select
          keepDefault={false}
          className="mx-auto w-60"
          classSelect="bg-red-500 hover:shadow-md hover:shadow-slate-900"
          classOptions="bg-red-500 hover:bg-red-500/80"
          classSelected="bg-red-500/80"
          options={options}
          name="car"
        />
        {error && <p className="font-bold text-red-600">Choose a value</p>}
        {value > 0 && (
          <p className="font-bold text-green-600">Value : {value}</p>
        )}
        <button className="px-4 py-2 mt-5 bg-gray-600 rounded-md hover:shadow-md hover:shadow-slate-900">
          Send
        </button>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
