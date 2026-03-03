const addbtn=document.querySelector('#addbtn')
const searchInput=document.querySelector('#search')
const notesContainer=document.querySelector('.notes-container')
const noteInput = document.getElementById("noteInput");

const filterbtn=document.querySelectorAll('.filter-btn')
const categorybtn=document.querySelectorAll('.cat')

let notes=[]
let selectCategory="personal"
let activeFilter="all"
addbtn.addEventListener("click",addNotes)
window.onload = ()=> {
    const saved=localStorage.getItem("notes")
    if(saved) {
        notes=JSON.parse(saved)
        applyFilter()
    }
}
function saveNotes() {
    localStorage.setItem("notes",JSON.stringify(notes))
}
function addNotes() {
    const text=noteInput.value.trim()
    if(!text) return
    const noteObj = {
        id:Date.now(),
        text,
        category:selectCategory,
        date:new Date().toLocaleDateString()
    }
    notes.push(noteObj)
    saveNotes()
    applyFilter()
    noteInput.value=""
}
function renderNotes(noteArray) {
    notesContainer.innerHTML=""
    if(noteArray.length==0) {
        notesContainer.innerHTML='<p>No notes found!</p>'
        return;
    }
    noteArray.forEach(list=> {
        const card=document.createElement('div')
        card.className="note-card"

        card.innerHTML=`<span class="tag ${list.category}">${list.category}</span>
        <p>${list.text}</p>
        <div class="footer">
        <small>${list.date}</small>
        <div class="actions">
        <button class="edit" data-id="${list.id}">✏️</button>
        <button class="delete" data-id="${list.id}">🗑️</button>
        </div>
        </div>`
        notesContainer.appendChild(card)
    })
}
categorybtn.forEach((btn)=> {
    btn.addEventListener('click',()=> {
        document.querySelector('.cat.active')?.classList.remove('active')
        btn.classList.add('active')
        selectCategory=btn.dataset.cat
    })
})
filterbtn.forEach(btn=> {
    btn.addEventListener('click',()=> {
        document.querySelector('.filter-btn.active')?.classList.remove('active')
        btn.classList.add('active')
        activeFilter=btn.dataset.filter
        applyFilter()
    })
})
function applyFilter() {
    if(activeFilter==='all') {
        renderNotes(notes)
    } else {
        renderNotes(notes.filter(n=>n.category===activeFilter))
    }
}
notesContainer.addEventListener("click",e=> {
    const id=Number(e.target.dataset.id)
    if(e.target.classList.contains('delete')) {
        notes=notes.filter(n=>n.id!==id)
    }
    if(e.target.classList.contains('edit')) {
        const note=notes.find(n=>n.id===id)
        noteInput.value=note.text
        selectCategory=note.category
        document.querySelector(".cat.active")?.classList.remove('active')
        document.querySelector(`.cat[data-cat='${note.category}']`)?.classList.add('active')

        notes=notes.filter(n=>n.id!==id)
    }
    saveNotes()
    applyFilter()
})
searchInput.addEventListener('input',()=> {
    const value=searchInput.value.toLowerCase()
    renderNotes(notes.filter(n=>n.text.toLowerCase().includes(value)))
})
