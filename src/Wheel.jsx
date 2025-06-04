import { useState } from "react";

const prizes = [
  "🎉 10% de réduction",
  "🎁 Livraison gratuite",
  "🎊 1 café offert",
  "✨ Cadeau mystère",
  "🙌 Merci pour votre avis !",
  "🔥 15% de réduction",
  "🎯 Réduction personnalisée",
  "💥 Pas de chance, réessayez !",
];

function Wheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      setResult(prizes[randomIndex]);
      setSpinning(false);
    }, 3000); // 3 sec de suspense
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🎡 La roue des cadeaux
      </h1>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition mb-6"
      >
        {spinning ? "La roue tourne..." : "Lancer la roue"}
      </button>

      {result && (
        <div className="text-2xl font-semibold text-green-800">
          {result}
        </div>
      )}
    </div>
  );
}

export default Wheel;
