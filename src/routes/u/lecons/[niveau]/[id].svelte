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
  import CarteLecon from '$lib/components/CarteLecon.svelte';

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
    <div class="grid grid-cols-5">
      {#each liste as li}
      {#if li.exercices.length > 0}
        {#each li.exercices as exercice}
          <CarteLecon d={exercice} c={li.categorie}/>
        {/each}
      {/if}
    {/each}
    </div>
    
  {/await}
</div>