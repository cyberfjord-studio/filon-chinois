<script>
  import supabase from '$lib/db';
  import Chargement from '../Chargement.svelte';
  import DragDropList from '../DragDropList.svelte';
  import { createEventDispatcher } from 'svelte';


  const dispatch = createEventDispatcher();
  export let options
  /*
  {
  "drag": [
    "fr"
  ],
  "drop": [
    "hanzi",
    "pinyin"
  ],
  "mots": [
    13,
    16,
    14,
    17,
    164,
    18
  ],
  "type": "simple",
  "nb": 6
}/
  */

  function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }
  let drag
  let drop
  let affichageDrag
  let affichageDrop
  async function obtenirVocabulaire(){
    let { data: lexique, error } = await supabase
      .from('lexique')
      .select("*")
      .in('id', options.mots)

    drag = shuffle([...lexique])
    drop = shuffle([...lexique])

    console.log(drag)
    console.log(drop)

  }

  function corriger(){
  

    dispatch('suivant', {
			points: 1,
      total: 1
		});
  }
  obtenirVocabulaire()
</script>

<div class="">
    <DragDropList bind:data={drop}/>
    <DragDropList bind:data={drag}/>
</div>
