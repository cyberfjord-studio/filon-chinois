<script>
  import supabase from '$lib/db';
  import Chargement from '$lib/components/Chargement.svelte'
  import CarteLecon from '$lib/components/CarteLecon.svelte';

  async function getExercices(){
    let liste = []
    let { data: cats, error: erreur3 } = await supabase
      .from('categories')
      .select("*")
      .order('id', { ascending: true })

    let { data: lecons, error: erreur1 } = await supabase
        .from('lecons')
        .select("*")

    let { data: exercices, error: erreur2 } = await supabase
        .from('exercices')
        .select("*")
        .order('num', { ascending: true })

    lecons.map((lecon) => {
      let tab = []
      let tab2 = []
      exercices.map((exercice) => {
        if (exercice.lecons == lecon.num_fr) {
          tab.push(exercice)
        }
        if (cats.id == exercice.categorie) {
          tab2.push(cats)
        }
      })
      liste.push({lecon: lecon, exercices: tab, categorie: tab2})
    })    
    
    return liste
  }
  
</script>

  <svelte:head>
    <title>Exercices - Filon-Chinois</title>
  </svelte:head>

<div class="p-5 pb-32 md:p-10 md:pb-0 select-none">
  {#await getExercices()}
    <Chargement/>
  {:then liste}
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {#each liste as li}
        {#each li.exercices as exercice}
          <CarteLecon d={exercice} c={li.categorie}/>
        {/each}
      {/each}
    </div>
    
  {/await}
</div>