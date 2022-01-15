<script context="module">
  import supabase from '$lib/db';
  export async function load({ params}) {
    let { data: exercice, error } = await supabase
      .from('exercices')
      .select('*')
      .eq('id', params.id)

    let { data: questions, err } = await supabase
      .from('questions')
      .select('*')
      .eq('exercice', params.id)

    let questions_format = []
    let qu = 1
    questions.map((question) => {
      questions_format.push({"no": qu, "d": question })
      qu = qu + 1
    })

    return {
      props: {
				exercice: exercice[0],
        questions: questions_format
			}
    };
  }
</script>

<script>
  import { bgImage } from '$lib/store';
  import QuestionEcrite from '$lib/components/questions/QuestionEcrite.svelte';
  import ChoixReponse from '$lib/components/questions/ChoixReponse.svelte';
  import DragDrop from '$lib/components/questions/DragDrop.svelte';
  import TraductionChoix from '$lib/components/questions/TraductionChoix.svelte';
  import TraductionEcrite from '$lib/components/questions/TraductionEcrite.svelte';
  import VraiFaux from '$lib/components/questions/VraiFaux.svelte';
  export let exercice
  export let questions



  let active = 0
  let questionActive = 1
</script>

<div class="flex flex-row w-full items-center justify-between h-auto">
  {#if active == 0}
    <div>
      {exercice.titre_cn}{exercice.titre_fr}
      {exercice.sous_titre_fr != null ? exercice.sous_titre_fr: ""}
      {exercice.description != null ? exercice.description: ""}
      Nombre de questions: {questions.length}
      <button on:click={() => active = 1}>Débuter</button>
    </div>
    <div class="w-1/2 h-full" >
      <img src={$bgImage} class="mask mask-parallelogram" alt="">
    </div>
  {:else if active == 1}
    {#each questions as question}
      <div class="p-16 w-full flex flex-col justify-center items-center {questionActive == question.no ? 'block': 'hidden'}">
          {question.no}/{questions.length}
          {question.d.contenu}

          {#if question.d.type == 0}
            Fichier non disponible
          {:else if question.d.type == 1}
            <QuestionEcrite options={question.d.options}/>
          {:else if question.d.type == 2}
            <ChoixReponse options={question.d.options}/>
          {:else if question.d.type == 3}
            <VraiFaux options={question.d.options}/>
          {:else if question.d.type == 4}
            <DragDrop options={question.d.options}/>
          {:else if question.d.type == 5}
            <TraductionEcrite options={question.d.options}/>
          {:else if question.d.type == 6}
            <TraductionChoix options={question.d.options}/>
          {/if}
          {#if question.no == questions.length}
            <button>Corriger</button>
          {:else}
            <button on:click={() => questionActive = questionActive + 1}>Suivant</button>
          {/if}
      </div>
    {/each}
  {/if}
</div>