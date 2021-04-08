

// Dictionnaire des tâches
let tasks = new Map()

// Boutons
const buttonDel = '<button class="btn-small btn-danger">Supprimer</button>'
const buttonsComplete = `
  ${buttonDel}
  <button class="btn-small demarquer">Démarquer</button>    
` 
const buttonsNoComplete = `
  ${buttonDel}
  <button class="btn-small marquer">Marquer</button> 
`
// Ajoute une ligne de tableau
const createLine = (text, complete) => {  
  // Création TR
  const tr = document.createElement('tr')  
  // Création premier TD avec le texte 
  let td = document.createElement('td')
  td.innerHTML = complete ? `<del>${text}</del>` : text
  tr.appendChild(td)
  // Création second TD avec les boutons
  td = document.createElement('td')
  td.innerHTML = complete ? buttonsComplete : buttonsNoComplete
  tr.appendChild(td) 
  // Retour du TR
  return tr
}

// Sauvegarde en local storage
const setStorage = () => localStorage.setItem('TASKS', JSON.stringify(Array.from(tasks)))

// Ajout d'une tâche
document.querySelector('input').addEventListener('keydown', e => {
    if(e.key === 'Enter')  {
      // On ajoute la tâche dans le dictionnaire
      tasks.set(e.target.value, false)  
      // On ajoute la ligne dans le tableau
      document.querySelector('tbody').appendChild(createLine(e.target.value, false))
      // Actualisation du local storage
      setStorage() 
    }
  })

// Click dans la liste des tâches
document.querySelector('table').addEventListener('click', e => {
    // On a cliqué sur un bouton
    if(e.target.matches('button')) {
      // Suppression d'une tâche
      if(e.target.matches('.btn-danger')) {
        // Suppression dans le dictionnaire
        tasks.delete(e.target.parentNode.previousSibling.textContent)
        // Suppression dans le DOM
        e.target.parentNode.parentNode.remove()
      // Marquage d'une tâche
      } else {
        toggleTask(e.target.matches('.marquer'), e.target)
      }
      // Actualisation du local storage
      setStorage() 
    }
  })

// Commutation tâche
const toggleTask = (complete, target) => {
    const parent = target.parentNode
    const sibling = parent.previousSibling
    const text = sibling.textContent
    // Mise à jour du dictionnaire
    tasks.set(text, complete)
    // Changement du bouton
    parent.innerHTML = complete ? buttonsComplete : buttonsNoComplete
    // Barrage du texte
    sibling.innerHTML = complete ? `<del>${text}</del>` : text
  }

// Chargement de la page
window.addEventListener('load', () =>  {
    // Récupération du local storage
    const storage = JSON.parse(localStorage.getItem('TASKS'))
    if(storage) {
      // Création du dictionnaire
      tasks = new Map(storage)
      // Raffraichissement de la liste
      const tbody = document.createElement('tbody') 
      storage.map(([text, complete]) => tbody.appendChild(createLine(text, complete)))
      document.querySelector('tbody').replaceWith(tbody)
    }
  })