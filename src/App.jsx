import React from 'react';
import Page1 from './demo/Page1';

const App = () => {
  return (
    <>
      <header className="bg-blue-500 text-white p-4">
        <h1>Welcome to Calclytics</h1>
      </header>
      <div>
        <h2 className="text-2xl">App New</h2>
        <h1 className="text-3xl font-bold underline">
          Hello from conversion calc calclytics 
        </h1>
      </div>
      <Page1 />
    </>
  );
};

export default App;
