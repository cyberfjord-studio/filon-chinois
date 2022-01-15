<script>
  import supabase from '$lib/db';
  import Chargement from '$lib/components/Chargement.svelte'
  import {groupeData} from '$lib/store'
  import { list } from 'postcss';

  async function getExercices(){
    let liste = []
    let { data: lecons, error: erreur1 } = await supabase
        .from('lecons')
        .select("*")

    let { data: exercices, error: erreur2 } = await supabase
        .from('exercices')
        .select("*")

    lecons.map((lecon) => {
      let tab = []
      exercices.map((exercice) => {
        if (exercice.lecons == lecon.num_fr) {
          tab.push(exercice)
        }
      })
      liste.push({lecon: lecon, exercices: tab})
    })    
    console.log(liste)
    return liste
  }
  
</script>

<div class="p-5 pb-32 md:p-10 md:pb-0">
  {#await getExercices()}
    <Chargement/>
  {:then liste}
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {#each liste as li}
        <h3 class="p-5 text-2xl text-neutral-content w-full col-span-full">Leçon {li.lecon.num_fr}</h3>
        {#each li.exercices as exercice}
          <a href="/u/exercices/{exercice.id}">
            <div class=" flex flex-col md:flex-row justify-start rounded-xl items-center cursor-pointer gap-5">
                <p class="text-2xl group-hover:text-primary-focus bg-primary text-primary-content w-24 h-24 rounded-full flex justify-center items-center font-semibold shadow-round">{exercice.titre_cn}</p>
                <p class="uppercase text-center md:text-left md:text-xl">{exercice.titre_fr}</p>
            </div>
          </a>
        {/each}
      {/each}
    </div>
    
  {/await}
</div>