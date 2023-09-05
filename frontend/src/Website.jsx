import {
  Header,
  Hero,
  Companies,
  Residencies,
  Value,
  Contact,
  GetStarted,
  Footer,
} from './pages/';

import React from 'react';

export default function Website() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
}
