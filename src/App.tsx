import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Chat from "./Components/Chat";

function App() {
  return (
    <>
      <Header />
      <main className="flex grow text-slate-50">
        <Chat />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
