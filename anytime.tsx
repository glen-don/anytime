import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle } from 'lucide-react';

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
    if (count === 0) return 'bg-gray-100';
    if (count < 3) return 'bg-green-100';
    if (count < 5) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Any Time Game</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {players.map(player => (
          <Card key={player} className="shadow-lg">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle className="text-xl">{player}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {players.filter(p => p !== player).map(opponent => (
                <div key={opponent} className={`flex items-center justify-between p-2 rounded-md mb-2 ${getBackgroundColor(anytimers[player][opponent])}`}>
                  <span className="font-medium">{opponent}</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => updateAnytimer(player, opponent, -1)}
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                    <span className="w-8 text-center font-bold">{anytimers[player][opponent]}</span>
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => updateAnytimer(player, opponent, 1)}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}