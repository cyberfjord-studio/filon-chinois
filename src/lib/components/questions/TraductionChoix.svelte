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


    let { data: liste, err} = await supabase
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

  function corriger(){
    let pts = 0
    let total = 0
    lexico.forEach(mot => {
      console.log(document.querySelector(`input[name="${mot.id}"]:checked`).value)
      if(document.querySelector(`input[name="${mot.id}"]:checked`).value == mot[options.valeur]){
        console.log(document.querySelector(`input[name="${mot.id}"]:checked`).value)
        console.log(mot[options.valeur])
        pts++
      }
      total++
    });
    

    dispatch('suivant', {
			points: pts,
      total: total
		});
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
    
    <div class="mt-5 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer mx-auto" on:click={corriger}>
      Valider la réponse
    </div>
  </div>
</div>


