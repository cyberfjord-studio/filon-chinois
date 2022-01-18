<script context="module">
  import supabase from '$lib/db';
  export async function load({ params, fetch, session, stuff }) {
    let { data: pa, error } = await supabase
      .from('parametres')
      .select('*')

    return {
      props: {
				par: pa
			}
    };
  }
</script>

<script>
  import '../main.css'
  import { page, session } from '$app/stores'
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { profilData, bgImage } from '$lib/store';

  export let par
  bgImage.set(par.find(para => para.id == "bg-image").valeur.img)

  function navDash(){
    if ($session) {
      goto("/u/")
    }
  }

  async function getUserProfile(){
    let { data: profil, error } = await supabase
          .from('utilisateurs')
          .select("*")
          .eq("id", $session.user.id)
    profilData.set(profil[0])
  }

  if(browser){
    $session = supabase.auth.session()
    navDash()
    supabase.auth.onAuthStateChange((event, userSession) => {
      $session = userSession
      if (event == "SIGNED_IN") {
        getUserProfile()
      }
      navDash()
    })
  }
</script>

<svelte:head>
	<title>Filon-Chinois - Apprendre le chinois!</title>
  
</svelte:head>

<div class="min-h-screen h-screen max-h-screen w-screen flex flex-row" >
  <nav class="fixed hidden md:block md:left-0 md:top-0 md:bottom-0 w-24 max-w-24 h-screen bg-base-200 z-40 shadow-round">
  </nav>
  <main class="grow z-10 md:mb-0 md:pl-24"><slot/></main>
</div>


