<script>
  import supabase from '$lib/db';
  import Chargement from '../Chargement.svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();
  export let options
  export let no
  let lexico = []
  let dropAlea
  let dragAlea
  let dragAlea2
  let pts = 0
  let total = 0
  /*
  {
  "drag": [
    "fr"
  ],
  "drop": [
    "hanzi",
    "pinyin"
  ],
  "mots": [
    13,
    16,
    14,
    17,
    164,
    18
  ],
  "type": "simple",
  "nb": 6
}/
  */

  

  function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        console.log(j)
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  async function getLexique(){
    let { data: lexique, error } = await supabase
      .from('lexique')
      .select("*")
      .in('id', options.mots)

    lexico = lexique
    console.log(lexico)
  }

  function getDrop(){
    let drop = []
    let tempDrop = []
    lexico.map((mot) => {
      tempDrop = []
      options.drop.map((dropItem) => {
        tempDrop.push(mot[dropItem])
      })

      drop.push({tempDrop})
    })
    dropAlea = shuffle(drop)
    console.log(dropAlea)
  }

  function getDrag(){
    let drag = []
    let drag2 = []
    let tempDrag2 = []
    let tempDrag = []
    lexico.map((mot) => {
      tempDrag = []
      options.drag.map((dragItem) => {
        tempDrag.push(mot[dragItem])
        tempDrag2.push(mot[dragItem])
      })
      drag.push({tempDrag})
      drag2.push({tempDrag})
    })
    dragAlea = shuffle(drag)
    dragAlea2 = shuffle(drag2)
    console.log(dragAlea)
  }

  
  function corriger(){
    
    let boxQuestions = document.getElementById(`q${no}`).querySelectorAll('.d1')
    let boxReponses = document.getElementById(`q${no}`).querySelectorAll('.d2')
    let i = 0
    let liste = []
    console.log('Questionnaire')
    while (i < boxQuestions.length) {
      let tab = lexico.filter((mot) => {
        return mot[options.drop[0]] == boxQuestions[i].dataset.question
      })

      liste.push(tab)
      i++
    }
    i = 0
    while (i < boxQuestions.length) {
      if (boxReponses[i].dataset.reponse == liste[i][0][options.drag[0]]) {
        pts++
      }
      total++
      i ++
    }

    dispatch('suivant', {
			points: pts,
      total: total
		});
  }

  function dDrag(e){
    e.target.classList.add("dragging")
  }

  function fDrag(e){
    e.target.classList.remove("dragging")
  }

  function dOver(e){
    e.preventDefault()
    const current = document.querySelector('.dragging')
    e.target.appendChild(current)
  }

  async function init(){
    await getLexique()
    getDrop()
    getDrag()
  }

  init()
</script>

<div id="bound">
  <div class="grid grid-cols-2 gap-1" id={`q${no}`}>
    {#if dropAlea}
      {#each dropAlea as drop}
        <div class="bg-gray-100">
          <div class="flex justify-center items-center">
            <p>{drop.tempDrop[0]} </p>
            <p>{drop.tempDrop[1] ? drop.tempDrop[1]: ""}</p>
          </div>
          <div class="p-2">
            <div class="droppable d1 w-full h-10 bg-red-100 rounded-lg " data-question={drop.tempDrop[0]} on:dragover={dOver}>
              
            </div>
          </div>
          <div class="p-2">
            <div class="droppable d1 w-full h-10 bg-red-100 rounded-lg " data-question={drop.tempDrop[0]} on:dragover={dOver}>
              
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-1">
    {#if dragAlea}
      {#each dragAlea as drag}
        <div class="p-1 draggable d2 cursor-move" draggable="true" on:dragstart={dDrag} on:dragend={fDrag} data-reponse={drag.tempDrag[0]}>
          <div class="w-full h-10 text-xs bg-gray-200 rounded-lg flex flex-col justify-center items-center">
            <p>{drag.tempDrag[0]}</p> 
          </div>
        </div>
      {/each}
      {#each dragAlea2 as draga}
        <div class="p-1 draggable d2 cursor-move" draggable="true" on:dragstart={dDrag} on:dragend={fDrag} data-reponse={draga.tempDrag[1]}>
          <div class="w-full h-10 text-xs bg-gray-200 rounded-lg flex flex-col justify-center items-center">
            <p>{draga.tempDrag[1]}</p> 
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <button class="btn btn-primary mt-5 mx-auto" on:click={corriger}>Suivant</button>
</div>
