<script context="module">
  import supabase from '$lib/db';
  export async function load({ params}) {
    let { data: lecon, error } = await supabase
      .from('lecons')
      .select('*')
      .eq('niveau', params.niveau)
      .eq('num_fr', params.id)

    return {
      props: {
				lecon: lecon[0]
			}
    };
  }
</script>

<script>
  import Chargement from '$lib/components/Chargement.svelte';

  export let lecon

  async function getExercices(){
    let liste = []
    let { data: cats, error: erreur1 } = await supabase
      .from('categories')
      .select("*")
      .order('id', { ascending: true })

    let { data: exercices, error: erreur2 } = await supabase
      .from('exercices')
      .select("*")
      .eq('lecons', lecon.id)

    console.log(exercices)

    cats.map((cat) => {
      let tab = []
      exercices.map((exercice) => {
        if (exercice.categorie == cat.id) {
          tab.push(exercice)
        }
      })
      liste.push({categorie: cat, exercices: tab})
    })    

    return liste
  }
</script>

  <svelte:head>
    <title>Lecon {lecon.num_fr} - Filon-Chinois</title>
  </svelte:head>

<div class="p-5 pb-32 md:p-10 md:pb-0 select-none">
  {#await getExercices()}
    <Chargement/>
  {:then liste}
    <div class="">
      {#each liste as li}
      {#if li.exercices.length > 0}
        
      
      <h3 class="my-10 md:my-0 md:p-5 text-2xl text-neutral-content w-full text-center">{li.categorie.titre_cn} — {li.categorie.titre_fr}</h3>
      <div class="flex flex-row flex-wrap md:justify-center items-center gap-4 md:gap-0">
        {#each li.exercices as exercice}
        <a class="w-full md:w-auto" href="/u/exercices/{exercice.id}">
          <div class="group flex md:flex-col flex-row md:justify-between rounded-xl items-center cursor-pointer md:p-10">
            <p class="font-medium flex justify-center items-center rounded-full w-24 h-24 md:w-36 md:h-36 bg-primary text-xl md:text-3xl text-primary-content mb-3 shadow-hov">{exercice.titre_cn}</p>
            <h4 class="ml-5 md:ml-0 text-xl text-primary">{exercice.titre_fr}</h4>
          </div>
        </a>
        {/each}
      </div>
      {/if}
    {/each}
    </div>
    
  {/await}
</div>