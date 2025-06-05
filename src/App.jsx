// App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./index.css";

const gains = [
  { label: "-10%", color: "bg-blue-300" },
  { label: "Un café offert ☕", color: "bg-yellow-300" },
  { label: "Rien 😢", color: "bg-blue-100" },
  { label: "Livraison gratuite", color: "bg-yellow-400" },
  { label: "Un sourire 😊", color: "bg-blue-200" }
];

export default function AvisGamePage() {
  const [step, setStep] = useState("start");
  const [timestamp, setTimestamp] = useState(null);
  const [prize, setPrize] = useState(null);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ts = urlParams.get("ts");
    if (ts) {
      const now = Date.now();
      const diff = now - parseInt(ts);
      if (diff < 1000 * 120) setStep("wheel");
    }
  }, []);

  const handleLeaveReview = () => {
    const ts = Date.now();
    setTimestamp(ts);
    window.location.href = `https://www.google.com/search?q=avis+{{ENTREPRISE}}&hl=fr#lrd=0x:0x,1,,,${ts}`;
  };

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      const selected = gains[Math.floor(Math.random() * gains.length)];
      setPrize(selected);
      setSpinning(false);
      setStep("result");
      console.log("Email envoyé avec :", selected.label);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center text-center px-4 font-sans">
      <div className="absolute top-4 text-yellow-300 text-sm font-bold">🎯 Jeu 100% gagnant</div>
      <div className="absolute top-10 text-white text-xs">Laisse un avis pour jouer ⭐</div>

      {step === "start" && (
        <div className="max-w-md">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-300">🎁 Gagne un cadeau en laissant un avis !</h1>
          <p className="mb-8 text-white text-lg">Clique sur le bouton ci-dessous, laisse ton avis Google, puis reviens ici pour tenter ta chance !</p>
          <button
            onClick={handleLeaveReview}
            className="bg-yellow-300 text-blue-800 rounded-full px-6 py-3 font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            Laisser un avis ⭐
          </button>
        </div>
      )}

      {step === "wheel" && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-yellow-300">🎉 Tourne la roue !</h1>
          <motion.div
            className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-2xl text-xl font-bold text-blue-700"
            animate={{ rotate: spinning ? 1080 : 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            {spinning ? "..." : "TOURNER"}
          </motion.div>
          {!spinning && (
            <button
              onClick={handleSpin}
              className="mt-6 bg-yellow-300 text-blue-800 rounded-full px-8 py-4 text-xl font-bold shadow-xl hover:rotate-6 transition"
            >
              Lancer la roue
            </button>
          )}
        </div>
      )}

      {step === "result" && prize && (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-yellow-300 mb-4">🎊 Bravo !</h1>
          <div className={`text-white text-2xl mb-6 px-6 py-3 rounded-full ${prize.color}`}>
            Tu as gagné : <span className="font-bold">{prize.label}</span>
          </div>
          <p className="text-white text-lg">Ton offre va t’être envoyée par mail 📩</p>
        </div>
      )}
    </div>
  );
}
