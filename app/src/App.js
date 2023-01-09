import './App.css';
import EntryList from "./components/EntryList";

function App() {
  return (
    <>
      <h1>Calculateur de moyenne</h1>
      <p>Entrez vos notes et l'intitulé de l'examen ci-dessous pour calculer la moyenne</p>
      <h3>Matière : i347 - UTILISER UN SERVICE AVEC DES CONTENEURS</h3>
      <h4>Professeur(e) : MME. GETAZ</h4>
      <EntryList/>
    </>
  );
}

export default App;
