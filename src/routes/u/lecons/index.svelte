<script>
  import supabase from '$lib/db';
  import Chargement from '$lib/components/Chargement.svelte'
  import {groupeData} from '$lib/store'

  async function getLecons(){
    let { data: lecons, error } = await supabase
        .from('lecons')
        .select("*")
        .eq("niveau", 99)
    return lecons
  }
  
</script>

  <svelte:head>
    <title>Leçons - Filon-Chinois</title>
  </svelte:head>

<div class="p-1 pb-32 md:p-10 md:pb-0 select-none">
  {#await getLecons()}
    <Chargement/>
  {:then lecons}
    <div class="flex flex-col justify-center items-center">
      {#each lecons as lecon}
      <a href="/u/lecons/{lecon.niveau}/{lecon.num_fr}">
        <div class="group flex flex-row justify-between rounded-xl items-center cursor-pointer hover:bg-secondary hover:text-secondary-content">
          <div class="flex flex-col bg-base-100 p-5 rounded-lg drop-shadow-lg text-center">
            <p class="font-medium md:text-3xl text-base-content group-hover:text-primary-focus">第{lecon.num_cn}课</p>
            <p class="uppercase md:text-xl group-hover:text-primary-focus">Leçon {lecon.num_fr}</p>
          </div>
          <div class="flex flex-col p-5 px-10 grow items-center">
            <h4 class="uppercase md:text-xl">{lecon.titre_fr}</h4>
            <h4 class="md:text-xl">{lecon.titre_cn}</h4>
          </div>
        </div>
      </a>
    {/each}
    </div>
    
  {/await}
</div>