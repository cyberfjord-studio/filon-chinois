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
  import { bgImage, profilData } from '$lib/store';
  import { DateTime } from "luxon";
  import QuestionEcrite from '$lib/components/questions/QuestionEcrite.svelte';
  import ChoixReponse from '$lib/components/questions/ChoixReponse.svelte';
  import DragDrop from '$lib/components/questions/DragDrop.svelte';
  import DragDropDouble from '$lib/components/questions/DragDropDouble.svelte';
  import ListeEcrite from '$lib/components/questions/ListeEcrite.svelte';
  import Bullet from '$lib/components/questions/Bullet.svelte';
  //import TraductionChoix from '$lib/components/questions/TraductionChoix.svelte';
  import TraductionEcrite from '$lib/components/questions/TraductionEcrite.svelte';
  import Chargement from '$lib/components/Chargement.svelte';
  import Fichier from '$lib/components/Fichier.svelte';

  export let exercice
  export let questions

  let totalPts = 0
  let pts = 0
  let active = 0
  let questionActive = 1

  async function getAncienScore(){
    let { data: ancienResultats, error } = await supabase
      .from('resultats')
      .select('*')
      .eq('exercice', exercice.id)
      .order('date_exercice', { ascending: false })
      .limit(5)

    return ancienResultats
  }

  function obtenirDate(da){
    var d = DateTime.fromISO(da).setZone("America/New_York").setLocale("fr").toLocaleString(DateTime.DATETIME_MED)
    return d
  }

  async function enregistrerScore(){
    const { data, error } = await supabase
      .from('resultats')
      .insert([
        { "utilisateur": $profilData.id, "exercice": exercice.id, "score": (pts/totalPts * 100)},
      ])
  }

  function questionSuivante(e){
    pts += e.detail.points
    totalPts += e.detail.total
    if (questionActive != questions.length) {
      questionActive += 1
    }else{
      questionActive = 1
      enregistrerScore()
      active = 3
    }
  }
</script>

  <svelte:head>
    <title>{exercice.titre_fr} - Filon-Chinois</title>
  </svelte:head>

<div class="flex flex-row w-full items-center justify-between h-auto">
  {#if active == 0}
    <div class="flex w-1/2 shrink-0 flex-col justify-center items-center gap-5">
      <div class="flex flex-row justify-center items-center gap-10"><span class="text-3xl ">{exercice.titre_fr}</span></div>
      <span>{exercice.sous_titre_fr != null ? exercice.sous_titre_fr: ""}</span>
      <p class="w-2/3  text-justify mx-auto">{@html exercice.description}</p>
      <div class="w-3/12 flex flex-row justify-between items-center">
        <span class="uppercase font-bold ">
          Nombre de questions
        </span>
        <span class="text-2xl ">
          {questions.length}
        </span>
      </div>
      <button class="btn btn-accent select-none" on:click={() => active = 1}>Débuter</button>
    </div>
    <div class="w-1/2 shrink-0 h-screen flex justify-center items-center" style="background-image: url('{$bgImage}'); background-size: cover; background-position: bottom center f;">
      {#await getAncienScore()}
        <Chargement/>
      {:then oldScore} 
        {#if oldScore.length }
        <table class="backdrop-blur-xl bg-white bg-opacity-20 p-5 rounded-lg">
          <tr >
            <th class="pt-5" colspan="2">Dernières tentatives</th>
          </tr>
          
          {#each oldScore as scorePct}
          <tr>
            <td class="p-3 pl-7 font-bold text-3xl ">{scorePct.score.toFixed(2)} %</td>
            <td class="p-3 pr-7 text-lg">{obtenirDate(scorePct.date_exercice)}</td>
          </tr>
          {/each}
          <tr><td class="pb-5"></td></tr>
        </table>
        {/if}
      {/await}
    </div>
  {:else if active == 1}
    {#each questions as question}
      <div class="mt-10 select-none max-w-sm mx-auto flex-col justify-center items-center {questionActive == question.no ? 'flex': 'hidden'}">
          <h5 class="text-lg italic text-base-content select-none">Question {question.no} sur {questions.length}</h5>
          <p class="prose-xl pt-2 select-none">{@html question.d.contenu}</p>
          {#if question.d.fichier != null}
            <div class="mt-5">
              <Fichier d={question.d.fichier}/>
            </div>  
          {/if}
          <div class="py-4 w-full">
          {#if question.d.type == 0}
            Fichier non disponible
          {:else if question.d.type == 1}
            <QuestionEcrite options={question.d.options} on:suivant={questionSuivante} />
          {:else if question.d.type == 2}
            <ChoixReponse options={question.d.options} on:suivant={questionSuivante}/>
          {:else if question.d.type == 3}
            <DragDrop options={question.d.options} no={question.no} on:suivant={questionSuivante}/>
          {:else if question.d.type == 4}
            <DragDropDouble options={question.d.options} no={question.no} on:suivant={questionSuivante}/>
          {:else if question.d.type == 5}
            <TraductionEcrite options={question.d.options} on:suivant={questionSuivante}/>
          <!--{:else if question.d.type == 6}
            <TraductionChoix options={question.d.options} on:suivant={questionSuivante}/>-->
          {:else if question.d.type == 7}
            <ListeEcrite options={question.d.options} on:suivant={questionSuivante}/>
          {:else if question.d.type == 8}
            <Bullet options={question.d.options} no={question.no} on:suivant={questionSuivante}/>
          {:else}
            <div class="mx-2 p-4 bg-primary hover:bg-primary-focus text-primary-content inline-block w-5/12 text-center rounded-xl cursor-pointer select-none" on:click={questionSuivante}>Suivant</div>
          {/if}
          </div>
      </div>
    {/each}
  {:else if active == 3}
    <div class="text-center mx-auto mt-10 select-none">
      <h4 class="text-2xl ">Bravo! Vous avez obtenu</h4>
      <h3 class="text-9xl font-bold">{pts}</h3>
      <p class="text-4xl">points sur {totalPts}!</p>
      <a href="/u/" class="btn btn-primary mx-auto mt-16 select-none">Retour</a>
    </div>
  {/if}
</div>