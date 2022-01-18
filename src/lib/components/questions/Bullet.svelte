<script>
/* {
"reponses": [
  "hello", “hi”, “allo”
],
"choix_reponses": [
  "hello",
  "hi",
  "allo",
  "bonjour",
  "salut"
]
}*/

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let options
  export let no
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
    let elem = Array.from(document.getElementById(`question${no}`).children)
  
    let i = 0
    elem.forEach((ch) => {
      if (ch.children[0].checked) {
        let bonnereponse = false
        options.reponses.forEach((rg)=>{
          
          if (ch.children[0].value == rg) {
            bonnereponse = true
          }
        })
        bonnereponse ? pts++ : pts -= 0.5
      }
    });
    total = options.reponses.length

    estCorrige = true
  }
</script>

<div id="question{no}">
  {#each options.choix_reponses as choix, i}
    <div class="flex flex-row gap-4 my-3">
      <input type="checkbox" id="id{i}-{no}" class="checkbox" name="name{no}" value={choix}>
      <label class="text-xl" for="id{i}-{no}">{choix}</label>
    </div>
  {/each}
  
</div>

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
      <label>Bonne(s) réponse(s): {options.reponses}</label>
    </div>
  </div>

  
</div>
<div class="mx-2 mt-5 float-right p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={next}>Suivant</div>
{/if}

