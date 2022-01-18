<script>
  import supabase from '$lib/db';
  import { createEventDispatcher } from 'svelte';
  import Chargement from '../Chargement.svelte';

  const dispatch = createEventDispatcher();
  export let options

  async function getLexique(){
    let { data: lexique, error } = await supabase
      .from('lexique')
      .select("*")
      .in('id', options.options.mots)

    let filtrer = []
    options.options.mots.forEach((m) => {
      lexique.forEach((l) => {
        if(m == l.id){
          filtrer.push(l)
        }
      })
    })
    console.log(filtrer)
    return filtrer
  }

  function corriger(){
    dispatch('suivant', {
			points: 0,
      total: 0
		});
  }
</script>

{#await getLexique()}
  <Chargement/>
{:then lexique} 
<div class="grid grid-cols-2 gap-5">
  {#each lexique as mot}
    <div class="group p-10 flex flex-col shadow-lg justify-center rounded-xl items-center cursor-pointer">
      <h4 class="uppercase text-3xl font-medium">{mot.hanzi}</h4>
      <p class="font-bold">{mot.pinyin}</p>
      <p>{mot.def_fr}</p>
    </div>
  {/each}
</div>
{/await}


<div class="mx-2 p-4 mt-5 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer float-right" on:click={corriger}>Section suivante</div>