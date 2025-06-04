import { useEffect } from "react";

function App() {
  useEffect(() => {
    const reviewClicked = localStorage.getItem("review_clicked");

    // Si l'utilisateur revient après avoir cliqué, on redirige vers la roue
    if (reviewClicked === "true") {
      window.location.href = "/wheel"; // à créer plus tard
    }
  }, []);

  const handleReviewClick = () => {
    // Marque qu’il a cliqué pour qu’on le sache à son retour
    localStorage.setItem("review_clicked", "true");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Gagnez une récompense 🎁
      </h1>

      <a
        href="https://search.google.com/local/writereview?placeid=ChIJf8MCeTajyRIRQnFdqHdBUXU"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleReviewClick}
        className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
      >
        Laisser un avis Google
      </a>
    </div>
  );
}

export default App;
