import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppShell } from '@/layout/AppShell';
import { Berichten } from '@/pages/Berichten';
import { Content } from '@/pages/Content';
import { Noodstaat } from '@/pages/Noodstaat';
import { Overzicht } from '@/pages/Overzicht';
import { Voorraad } from '@/pages/Voorraad';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Overzicht />} />
          <Route path="noodstaat" element={<Noodstaat />} />
          <Route path="voorraad" element={<Voorraad />} />
          <Route path="berichten" element={<Berichten />} />
          <Route path="content" element={<Content />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
