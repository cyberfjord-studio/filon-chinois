<script context="module">
  import supabase from '$lib/db';
  export async function load({ params}) {
    let { data: lecon, error } = await supabase
      .from('lecons')
      .select('*')
      .eq('id', params.id)

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
      .order('num', { ascending: true })

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
    <title>Leçon {lecon.num_fr} - Filon-Chinois</title>
  </svelte:head>

<div class="p-5 pb-32 md:p-10 md:pb-5">
  {#await getExercices()}
    <Chargement/>
  {:then liste}
  <h1 class="text-5xl font-light">Leçon {lecon.num_fr} — {lecon.titre_cn}</h1>
  {#each liste as li}
  
  <div class="grid grid-cols-5 my-5">
      {#if li.exercices.length > 0}
        {#each li.exercices as exercice}
          <CarteLecon d={exercice} c={li.categorie}/>
        {/each}
      {/if}
    </div>
    {/each}
    
  {/await}
</div>