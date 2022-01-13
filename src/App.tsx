import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Router from './router';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>...loading</div>}>
        <Router />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
