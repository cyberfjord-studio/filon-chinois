<script>
/* {
"valeurs": [
    [“bonjour”, “bijour”],
    [“hello”],
    [“salut”, “salute”]
]
}*/
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
export let options
//let randId = "lpo" + Math.random().toString().replace('.', '')

console.log(options.valeurs)
let range = [...Array(options.valeurs.length).keys()];
let reponse = []
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
    let i = 0
    options.valeurs.forEach((o) => {
      o.forEach((p) => {
        if (p = reponse[i]) {
          pts++
        }
      })
      total++
      i++
    })
    
    estCorrige = true
  }

</script>

<div>
  {#each range as i}
  <div class="flex flex-row justify-center items-center gap-3 my-2">
    <label for="r{i}">{i + 1}</label>
    <input type="text" placeholder="Réponse" name="r{i}" id="r{i}" bind:value={reponse[i]} class="input input-bordered">
  </div>
    
  {/each}
  
  {#if !estCorrige}
<div class="mx-2 p-4 bg-primary float-right hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={corriger}>Valider la réponse</div>
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


  
</div>
<div class="mx-2 mt-5 float-right p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={next}>Suivant</div>
{/if}
</div>
