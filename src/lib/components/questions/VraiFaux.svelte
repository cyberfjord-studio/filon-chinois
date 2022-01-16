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
  function corriger(choix){
    let pts = 0
    if (choix == options.reponse) {
      pts = 1
    }

    dispatch('suivant', {
			points: pts,
      total: 1
		});
  }

</script>

<div class="">
  {#each options.choix_reponses as choix}
    <div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer" on:click={corriger(choix)}>{choix}</div>
  {/each}
</div>
