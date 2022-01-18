<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let options

  console.log(options)

  function corriger(){
    dispatch('suivant', {
			points: 0,
      total: 0
		});
  }
</script>

<div class="prose-lg">
  {#if options.render != null}
  {@html options.render}
  {/if}
  
</div>


<div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer float-right" on:click={corriger}>Section suivante</div>