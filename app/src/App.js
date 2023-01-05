import Branch from './components/branch'
import './App.css';

function App() {
  var defaultLocalStorage = {
    0: {
      matiere: 'Français',
      professeur: 'Monsieur Sympa',
      notes: [
        '5',
        '6'
      ]
    },
    1: {
      matiere: 'Maths',
      professeur: 'Monsieur pas Sympa',
      notes: [
        '4',
        '3'
      ]
    }
  }
  if(!localStorage.calculateur_moyennes) {
    localStorage.setItem(`calculateur_moyennes`, JSON.stringify(defaultLocalStorage))
  }

  var calculateurLocalStorage = JSON.parse(localStorage.getItem('calculateur_moyennes'))
  var branchs = Object.keys(calculateurLocalStorage).map(function(key) {
    return <Branch branchData={calculateurLocalStorage[key]} index={key} />
  })
  return (
    <>
      <h1>Calculateurs de moyennes - Module 347</h1>
      {
        branchs
      }
    </>
  );
}

export default App;
