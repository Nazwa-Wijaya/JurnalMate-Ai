/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { PaperDetailPage } from "./pages/PaperDetailPage";
import { SavedPapersPage } from "./pages/SavedPapersPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50/30 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased text-slate-800">
        
        {/* Persistent top-level navigation bar */}
        <Navbar />

        {/* Dynamic page container routing */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/paper/:id" element={<PaperDetailPage />} />
            <Route path="/library" element={<SavedPapersPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Fallback routing */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Persistent document-level branding footer */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}
