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
    let { data: lexique, error } = await supabase
      .from('lexique')
      .select("*")
      .in('id', options.mot)

    lexico = lexique
    return lexico
  }

  function corriger(){
    let pts = 0
    let total = 0
    lexico.forEach(mot => {
      if (document.getElementById(`reponse${mot.id}`) == mot[options.valeur[0]]) {
        pts++
      }
      total++
    });
    

    dispatch('suivant', {
			points: pts,
      total: total
		});
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
      <div class="flex flex-row justify-center items-center">
        <input type="text" data-reponse={mot.id} placeholder="Réponse" name="reponse" id="reponse{mot.id}" class="input input-bordered">
      </div>
    </div>
    <hr>
    {/each}
  {/await}
  
  
  <div class="flex justify-center items-center" on:click={corriger}>
    
    <div class="mt-5 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer mx-auto">
      Valider la réponse
    </div>
  </div>
</div>
