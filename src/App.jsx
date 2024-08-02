import Header from "./components/Header"
import NoteProvider from "./context/NoteContext"
import NotesPage from "./pages/NotesPage"

function App() {

  return (
    <div id="app">
      <NoteProvider>
        <Header />
        <NotesPage />
      </NoteProvider>
    </div>
  )
}

export default App
