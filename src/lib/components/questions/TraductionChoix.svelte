<script>
  import { createEventDispatcher } from 'svelte';
  import supabase from '$lib/db';
  import Chargement from '../Chargement.svelte';

  const dispatch = createEventDispatcher();
  export let options

  let lexico = []
  /*
    {
    "affichage": ["hanzi","fr"],
    "valeur": ["pinyin"],
    "mot": [“id”]
    }
  */

  async function getLexique(){
    let { data: liste, err} = await supabase
      .from('lexique')
      .select('id')
      .eq


    let { data: liste1, err1} = await supabase
      .from('lexique')
      .select('id')
      .range()
      .limit(options.nb - 1)

    return {lexique, listeId}
  }

  async function getDummy(id){
    let i = 0

    while (i < nb) {
      
    }

    let { data: Lexique, error } = await supabase
      .from('lexique')
      .select("*")
      .limit(options.nb - 1)

    return lexique
  }

  let pts = 0
  let total = 0
  let estCorrige = false

  function next(){
    dispatch('suivant', {
      points: pts,
      total: total
    });
  }

  function corriger(){

    lexico.forEach(mot => {
      console.log(document.querySelector(`input[name="${mot.id}"]:checked`).value)
      if(document.querySelector(`input[name="${mot.id}"]:checked`).value == mot[options.valeur]){
        console.log(document.querySelector(`input[name="${mot.id}"]:checked`).value)
        console.log(mot[options.valeur])
        pts++
      }
      total++
    });
    estCorrige = true
  }

  function selectionner(choix, mot){
    let liste = Array.from(document.getElementById(`reponse${mot}`).children)
    liste.forEach((lbl) => {
      lbl.classList.remove("ring-4")
      lbl.classList.remove("ring-red-400")
    })
    event.target.checked = true
    document.getElementById(`id${mot}${choix}`).classList.add("ring-4")
    document.getElementById(`id${mot}${choix}`).classList.add("ring-red-400")
  }

</script>

<div class="">
  {#await getLexique()}
    <Chargement/>
  {:then lexico} 
    {#each lexico as mot}
    <div class="flex flex-col justify-center items-center my-2">
      <div class="flex flex-col">
        <h5 class="text-2xl">{mot[options.affichage[0]]}</h5>
        <h6 class="text-lg">{mot[options.affichage[1]] ? mot[options.affichage[1]] : ""}</h6>
      </div>
      <div class="flex flex-row justify-center items-center mt-2" id="reponse{mot.id}">
          <label class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer select-none" id="id{mot.id}{mot[options.valeur]}" for="choix{mot.id}{mot[options.valeur]}" on:click={selectionner(mot[options.valeur], mot.id)}><input class="" type="radio" id="choix{mot.id}{mot[options.valeur]}" name={mot.id} value={mot[options.valeur]} >{mot[options.valeur]}</label>
      </div>
    </div>
    <hr>
    {/each}
  {/await}
  
  
  <div class="flex justify-center items-center" >
    
    {#if !estCorrige}
<div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={corriger}>Valider la réponse</div>
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
  <div class="alert alert-info">
    <div class="flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
      </svg>
      <label>Score: {pts}/{total} </label>
    </div>
  </div>


  
</div>
<div class="mx-2 mt-5 float-right p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={next}>Suivant</div>
{/if}
  </div>
</div>


