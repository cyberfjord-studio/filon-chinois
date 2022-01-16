<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let options
  let rep = ""
  /*
  {
  "reponses": [
    "你好",
    "谢谢",
    "再见",
    "你们好",
    "拜拜"
  ]
}
  */
  function corriger(){
    let pts = 0
    if (rep in options.reponses) {
      pts = 1
    }

    dispatch('suivant', {
			points: pts,
      total: 1
		});
  }

</script>

<div class="">
  <input type="text" placeholder="Réponse" name="reponse" id="reponse" bind:value={rep} class="input input-bordered">
  <div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer" on:click={corriger}>Valider la réponse</div>
</div>
