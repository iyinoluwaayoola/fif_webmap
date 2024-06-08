// src/app/Sidebar.tsx

import React, { useState } from 'react';

interface Boundary {
  sd_ref: string;
  adm1_en: string;
  geom: GeoJSON.Geometry;
}

interface SidebarProps {
  boundaries: Boundary[];
  onSearch: (term: string) => void;
  filteredBoundaries: Boundary[];
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  boundaries,
  onSearch,
  filteredBoundaries,
  searchTerm,
  onSearchTermChange,
}) => {
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="sidenav">
      <h2>Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Search by SD Reference or Adm1 English"
      />
      <button onClick={handleSearch}>Search</button>
      <h1>Senatorial Boundaries</h1>
      <table>
        <thead>
          <tr>
            <th>SD Reference</th>
            <th>Adm1 English</th>
            <th>Geometry</th>
          </tr>
        </thead>
        <tbody>
          {filteredBoundaries.map((boundary) => (
            <tr key={boundary.sd_ref}>
              <td>{boundary.sd_ref}</td>
              <td>{boundary.adm1_en}</td>
              {/* <td>{JSON.stringify(boundary.geom, null, 2)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
