import './App.css';
import EntryList from "./components/EntryList";

function App() {
  return (
    <main className={'container my-5'}>
        <div className={'row justify-content-center'}>
            <div className={'col-md-8'}>
                <div>
                    <h1>Calculateur de moyenne</h1>
                    <p>Entrez vos notes et l'intitulé de l'examen ci-dessous pour calculer la moyenne</p>
                </div>
                <div className={'py-4'}>
                    <h5>Matière : i347 - UTILISER UN SERVICE AVEC DES CONTENEURS</h5>
                    <h6>Professeur(e) : MME. GETAZ</h6>
                    <EntryList/>
                </div>
            </div>
        </div>
    </main>
  );
}

export default App;
