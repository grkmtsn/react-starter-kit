import React from 'react';
import { mainTheme, blueTheme } from '@/theme/main';

function DashboardPage({ setTheme }) {
  return (
    <div>
      DashboardPage
      <div>
        <button type="button" onClick={() => setTheme(mainTheme)}>Kg Theme</button>
        <button type="button" onClick={() => setTheme(blueTheme)}>Blue Theme</button>
      </div>
    </div>
  );
}

export { DashboardPage };
