import React, { useState } from 'react';

const players = ['Tom', 'Sil', 'Cane', 'Glendon'];

export default function AnyTimeGame() {
  const [anytimers, setAnytimers] = useState({
    Tom: { Sil: 0, Cane: 0, Glendon: 0 },
    Sil: { Tom: 0, Cane: 0, Glendon: 0 },
    Cane: { Tom: 0, Sil: 0, Glendon: 0 },
    Glendon: { Tom: 0, Sil: 0, Cane: 0 },
  });

  const updateAnytimer = (from, to, increment) => {
    setAnytimers(prev => ({
      ...prev,
      [from]: {
        ...prev[from],
        [to]: Math.max(0, prev[from][to] + increment)
      }
    }));
  };

  const getBackgroundColor = (count) => {
    if (count === 0) return '#f3f4f6';
    if (count < 3) return '#d1fae5';
    if (count < 5) return '#fef3c7';
    return '#fee2e2';
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#1f2937' }}>Any Time Game</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {players.map(player => (
          <div key={player} style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
            <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '1rem', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{player}</h2>
            </div>
            <div style={{ padding: '1rem' }}>
              {players.filter(p => p !== player).map(opponent => (
                <div key={opponent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', borderRadius: '0.375rem', marginBottom: '0.5rem', backgroundColor: getBackgroundColor(anytimers[player][opponent]) }}>
                  <span style={{ fontWeight: '500' }}>{opponent}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => updateAnytimer(player, opponent, -1)}
                      style={{ backgroundColor: '#e5e7eb', border: 'none', borderRadius: '9999px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ width: '2rem', textAlign: 'center', fontWeight: 'bold' }}>{anytimers[player][opponent]}</span>
                    <button 
                      onClick={() => updateAnytimer(player, opponent, 1)}
                      style={{ backgroundColor: '#e5e7eb', border: 'none', borderRadius: '9999px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}