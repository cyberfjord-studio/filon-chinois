<script>
  import supabase from '$lib/db';
  import Chargement from '$lib/components/Chargement.svelte'
  import {groupeData} from '$lib/store'

  async function getLecons(){
    let { data: lecons, error } = await supabase
        .from('lecons')
        .select("*")
        .eq("niveau", $groupeData.niveau)
    return lecons
  }
  
</script>

<div class="p-1 pb-32 md:p-10 md:pb-0">
  {#await getLecons()}
    <Chargement/>
  {:then lecons}
    <h3 class="p-5 text-2xl text-neutral-content">Niveau {$groupeData.niveau}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each lecons as lecon}
      <a href="/u/lecons/{lecon.niveau}/{lecon.num_fr}">
        <div class="group flex flex-row justify-between rounded-xl items-center cursor-pointer hover:bg-secondary hover:text-secondary-content">
          <div class="flex flex-col bg-base-100 p-5 rounded-lg drop-shadow-lg text-center">
            <p class="font-medium md:text-3xl text-base-content group-hover:text-primary-focus">第{lecon.num_cn}课</p>
            <p class="uppercase md:text-xl group-hover:text-primary-focus">Lecon {lecon.num_fr}</p>
          </div>
          <div class="flex flex-col p-5 grow items-center">
            <h4 class="uppercase md:text-xl">{lecon.titre_fr}</h4>
            <h4 class="md:text-xl">{lecon.titre_cn}</h4>
          </div>
        </div>
      </a>
    {/each}
    </div>
    
  {/await}
</div>