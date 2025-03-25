import React, { useState } from "react";

const App = () => {
  const [boxColors, setBoxColors] = useState(Array(9).fill("white"));
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (index) => {
    if (clickOrder.includes(index)) return; // Prevent multiple clicks on the same box

    setBoxColors((prev) => {  // Change the color of the clicked box to green
      const updated = [...prev];
      updated[index] = "green";
      return updated;
    });

    setClickOrder((prev) => [...prev, index]);  // Store the order of clicks
    
    if (clickOrder.length === 8) {    // If all boxes are clicked, start the orange transition    
      handleAllClicked([...clickOrder, index]); 
    }
  };

  const handleAllClicked = (order) => {
    order.forEach((idx, i) => {
      setTimeout(() => {
        setBoxColors((prev) => {
          const updated = [...prev];
          updated[idx] = "orange";
          return updated;
        });
      }, i * 300);
    });

    setTimeout(() => {      // Reset the game after all boxes turn orange
      setBoxColors(Array(9).fill("white"));
      setClickOrder([]);
    }, order.length * 300 + 1000); 
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-5">Matrix Game</h1>

      <div className="flex flex-col gap-5">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex justify-center items-center gap-5">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="w-24 h-24 flex justify-center items-center text-lg font-bold text-gray-800 transition-all transform hover:scale-110 rounded-full cursor-pointer"
                  style={{ backgroundColor: boxColors[index] }}
                  onClick={() => handleClick(index)}
                >
                  <span>{index + 1}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
