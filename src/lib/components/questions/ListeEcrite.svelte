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

function corriger(){
    let pts = 0
    let total = 0
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
    
    dispatch('suivant', {
			points: pts,
      total: total
		});
  }

</script>

<div>
  {#each range as i}
  <div class="flex flex-row justify-center items-center gap-3 my-2">
    <label for="r{i}">{i + 1}</label>
    <input type="text" placeholder="Réponse" name="r{i}" id="r{i}" bind:value={reponse[i]} class="input input-bordered">
  </div>
    
  {/each}
  
  <div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer" on:click={corriger}>Valider la réponse</div>
</div>
