<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let options

  /*
  {
  "reponse": "début",
  "choix_reponses": [
    "début",
    "durant / fin"
  ]
}
  */

  let pts = 0
  let total = 1
  let estCorrige = false

  function next(){
    dispatch('suivant', {
			points: pts,
      total: total
		});
  }

  function corriger(choix){
    if (choix == options.reponse) {
      pts = 1
    }
    
    estCorrige = true
  }

</script>

<div class="">
  {#if !estCorrige}
  {#each options.choix_reponses as choix}
    <div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer" on:click={corriger(choix)}>{choix}</div>
  {/each}
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
