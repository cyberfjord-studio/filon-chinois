<script>
  import supabase from '$lib/db';
  import Chargement from '$lib/components/Chargement.svelte'
  import {groupeData} from '$lib/store'

  async function getLexique(){
    let { data: lexique, error } = await supabase
        .from('lexique')
        .select("*")
        
    return lexique
  }

  async function afficherMot(mot){
    let { data: lexique, err } = await supabase
        .from('lexique')
        .select("*")
        .eq('id', mot)
        
    motSelectionne = lexique[0]
    estOuvert = true
  }

  function raccourci(e){
    if (e.keyCode == 27 && estOuvert) {
      fermer()
    }
  }

  function fermer(){
    estOuvert = false
    motSelectionne = ""
  }

  let estOuvert = false
  let motSelectionne
</script>

<svelte:window on:keydown={raccourci}/>

<svelte:head>
    <title>Lexique - Filon-Chinois</title>
  </svelte:head>

<div class="p-5 pb-32 md:p-10 md:pb-0">
  {#await getLexique()}
    <Chargement/>
  {:then lexique}
    <h3 class="p-5 text-2xl text-neutral-content">Niveau {$groupeData.niveau}</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      {#each lexique as mot}
        <div class="group p-10 flex flex-col shadow-lg justify-center rounded-xl items-center cursor-pointer" on:click={() => afficherMot(mot.id)}>
          <h4 class="uppercase text-3xl font-medium">{mot.hanzi}</h4>
          <p class="font-bold">{mot.pinyin}</p>
          <p>{mot.def_fr}</p>
        </div>
      {/each}
    </div>
    
  {/await}
</div>

{#if estOuvert}
  <div id="vueDictionnaire" class="fixed left-0 bottom-24 md:bottom-0 w-full ">
    {#if motSelectionne != ""}
      <div class=" bg-white mx-auto p-10 flex flex-col shadow-round2">
        <div on:click={() => fermer()} class="absolute top-6 right-6 cursor-pointer"><i  class="fas fa-close fa-2x hover:scale-125"></i></div>
        <div class="flex flex-row justify-center items-center">
          <div class="flex flex-col gap-5">
            
            <h3 class="text-6xl text-center">{motSelectionne.hanzi}</h3>
            <h3 class="text-3xl text-center">{motSelectionne.pinyin}</h3>
            {#if motSelectionne.icone != null}
              <img src={`https://fjzpeeuodgpzyiranoip.supabase.in/storage/v1/object/public/ressources/${motSelectionne.icone}`} width="128" height="128" class="mx-auto" alt={motSelectionne.def_fr}/>
            {/if}
          </div>
          <div class="">
            
          </div>
        </div>
        <div class="flex flex-col justify-center mt-5 items-center">
          <h5 class="font-bold text-2xl">Définition</h5>
          <p class="text-2xl">{motSelectionne.def_fr}</p>
          <p class="text-lg text-center italic">{motSelectionne.notes_fr}</p>
        </div>
        {#if motSelectionne.exemples != null}
          <div class="relative mt-5">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-white text-lg font-medium text-gray-900">
                Exemples
              </span>
            </div>
          </div>
          <p class="text-xl text-center">{motSelectionne.exemples}</p>
        {/if}
      </div>
    {/if}
  </div>
{/if}