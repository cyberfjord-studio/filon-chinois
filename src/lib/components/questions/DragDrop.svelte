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
    let tempDrag = []
    lexico.map((mot) => {
      tempDrag = []
      options.drag.map((dragItem) => {
        tempDrag.push(mot[dragItem])
      })

      drag.push({tempDrag})
    })
    dragAlea = shuffle(drag)
    console.log(dragAlea)
  }

  let estCorrige = false
  function next(){
    dispatch('suivant', {
			points: pts,
      total: total
		});
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
    estCorrige = true
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

<div id="bound w-full">
  <div class="grid grid-cols-2 gap-1 w-full" id={`q${no}`}>
    {#if dropAlea}
      {#each dropAlea as drop}
        <div class="bg-gray-100 ">
          <div class="flex flex-col justify-center items-center text-center">
            {#if options.drop[0] == 'def_fr' || options.drop[0] == 'pinyin'}
              <p class="text-xl">{drop.tempDrop[0]} </p>
              <p>{drop.tempDrop[1] ? drop.tempDrop[1]: ""}</p>
            {:else}
              <p class="text-4xl">{drop.tempDrop[0]} </p>
              <p>{drop.tempDrop[1] ? drop.tempDrop[1]: ""}</p>
            {/if}
          </div>
          <div class="p-2">
            <div class="droppable d1 w-full h-16 rounded-full si" data-question={drop.tempDrop[0]} on:dragover={dOver}>
              
            </div>
          </div>
          
        </div>
      {/each}
    {/if}
  </div>

  <div class="grid grid-cols-2 gap-1 w1 -px-4">
    {#if dragAlea}
      {#each dragAlea as drag}
        <div class="p-1 draggable d2 cursor-move" draggable="true" on:dragstart={dDrag} on:dragend={fDrag} data-reponse={drag.tempDrag[0]}>
          <div class="w-full h-16 text-xs bg-gray-200 rounded-full flex flex-col justify-center items-center">
            <p class="text-lg text-center">{drag.tempDrag[0]}</p> 
            <p>{drag.tempDrag[1] ?  drag.tempDrag[1]: ""}</p>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  {#if !estCorrige}
  <div class="mx-2 mt-3 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={corriger}>Valider la réponse</div>
  {:else}
  <div>
    <div class="alert alert-error my-4">
      <div class="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
        </svg>
        <label>Vous avez fait {total-pts} erreur(s)</label> <br>
  
      </div>
    </div>
    <div class="alert alert-info mb-4">
      <div class="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
        </svg>
        <label>Score: {pts}/{total} </label>
      </div>
    </div>
  
    <div class="alert alert-info">
      <div class="flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
        </svg>
        <label>Bonne(s) réponse(s): {#each lexico as mot} "{mot[options.drop[0]]}" avec "{mot[options.drag[0]]}" || {/each}</label>
      </div>
    </div>
    
  </div>
  <div class="mx-2 mt-5 float-right p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={next}>Suivant</div>
  {/if}

</div>


<style>
  .si{
    background-color:#7E8CA1;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.356);
  }

  .w1{
    width:360px;
  }
    </style>