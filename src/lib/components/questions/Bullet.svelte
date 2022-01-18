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

  function corriger(){
    let pts = 0
    let total = 0

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

    dispatch('suivant', {
			points: pts,
      total: total
		});
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
<div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block text-center rounded-xl cursor-pointer " on:click={corriger}>Valider la réponse</div>
