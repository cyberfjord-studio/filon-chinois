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
  import '../../main.css'
  import { page, session } from '$app/stores'
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import NavContent from '$lib/components/NavContent.svelte';
  import Header from '$lib/components/Header.svelte';
  import { profilData, groupeData, profilAvatar, bgImage} from '$lib/store';
  import Chargement from '$lib/components/Chargement.svelte';

  var pret = false

  export let par
  bgImage.set(par.find(para => para.id == "bg-image").valeur.img)

  function navDash(){
    if (!$session) {
      goto("/")
    }
  }

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) throw error
      
      profilAvatar.set(URL.createObjectURL(data))
      
    } catch (error) {
      console.error('Error downloading image: ', error.message)
    }
  }

  async function getUserProfile(){
    let path =  String($session.user.id) + ".jpg"
    let { data: profil, error } = await supabase
          .from('profil')
          .select("*")
          .eq("id", $session.user.id)

    profilData.set(profil[0])
    await downloadImage(path)

    let { data: groupe, err } = await supabase
        .from('groupes')
        .select("*")
        .eq("id", profil[0].groupe)

    groupeData.set(groupe[0])
    
    if (groupe[0] && profil[0]) {
      pret = true
    }
  }
  if(browser){
    $session = supabase.auth.session()
    getUserProfile()
    navDash()
    supabase.auth.onAuthStateChange((event, userSession) => {
      $session = userSession
      if (event == "SIGNED_IN") {
        getUserProfile()
      } else {
        console.log('Fail')
      }
      navDash()
    })
  }
</script>

<div class="h-screen max-h-screen w-full flex flex-row select-none">
  <nav class="fixed hidden md:block md:left-0 md:top-0 md:bottom-0 w-24 max-w-24 h-screen bg-base-200 z-40 shadow-round">
    <NavContent/>
  </nav>
  <nav class="fixed left-0 bottom-0 right-0 md:hidden h-24 max-h-24 w-screen bg-base-200 z-40 shadow-round">
    <NavContent/>
  </nav>
  <main class="grow z-10 mb-24 md:mb-0 md:pl-24">
    {#if $page.url.pathname != "/u"}
      <Header/>
    {/if}
    {#if pret}
      <slot/>
    {:else}
    <div class="w-full h-full flex justify-center items-center">
      <Chargement/>
    </div>
      
    {/if}
  </main>
</div>


