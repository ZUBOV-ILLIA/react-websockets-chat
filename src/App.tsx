import Footer from "./Components/Footer";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="flex grow text-slate-50">
        <div className="m-3 flex grow flex-col rounded-lg border p-4">
          <div className="mb-2 flex h-full overflow-hidden rounded-xl">
            {/* <div className="users-list flex w-full max-w-16 grow flex-col bg-slate-500 p-2">
              <span>Erik</span>
              <span>Erik</span>
              <span>Erik</span>
              <span>Erik</span>
            </div> */}

            <div className="messages-list flex grow flex-col bg-slate-400 p-2">
              <span>Lorem ipsum dolor sit ame.</span>
              <span>Lorem ipsum dolor sit ame.</span>
              <span>Lorem ipsum dolor sit ame.</span>
              <span>Lorem ipsum dolor sit ame.</span>
              <span>Lorem ipsum dolor sit ame.</span>
            </div>
          </div>

          <div className="flex overflow-hidden rounded-xl">
            <input className="grow bg-slate-400 p-4" type="text" />
            <button className="bg-slate-500 p-3">Send</button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
