// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Sidebar from '../pages/api/sidebar'; // Import the Sidebar component
import MapComponent from '@/pages/api/map';

interface Boundary {
  sd_ref: string;
  adm1_en: string;
  geom: GeoJSON.Geometry;
}

export default function Home() {
  const [boundaries, setBoundaries] = useState<Boundary[]>([]);
  const [filteredBoundaries, setFilteredBoundaries] = useState<Boundary[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/senatorial_boundaries');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setBoundaries(data);
        setFilteredBoundaries(data); // Set filtered data initially same as fetched data
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    const filtered = boundaries.filter((boundary) => {
      return (
        boundary.sd_ref.toLowerCase().includes(term.toLowerCase()) ||
        boundary.adm1_en.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredBoundaries(filtered);
  };

  return (
    <div>
      {/* Render Sidebar component */}
      <Sidebar
        boundaries={boundaries}
        onSearch={handleSearch}
        filteredBoundaries={filteredBoundaries}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <div className="map"><MapComponent/></div>
    </div>
  );
}
