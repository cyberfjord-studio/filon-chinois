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
  import { profilData, bgImage} from '$lib/store';
  import Chargement from '$lib/components/Chargement.svelte';
  import SpeechSynthesis from '$lib/components/SpeechSynthesis.svelte';
import { onMount } from 'svelte';

  const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;

  let pret = false
  let pop
  let selectedText = ""

  export let par
  bgImage.set(par.find(para => para.id == "bg-image").valeur.img)

  function navDash(){
    if (!$session) {
      goto("/")
    }
  }

  function fabtrad(e){
    let phrase = null
    if (window.getSelection().toString().length > 0) {
      let result = window.getSelection().toString().split("").filter((mot) => {
        return REGEX_CHINESE.test(mot)
      })
      phrase = result.join("")
      
    }
    if (phrase != null) {
        pop.style.top = e.clientY + "px"
        pop.style.left = e.clientX + "px"
        pop.classList.remove("hidden")
        selectedText = phrase
        window.getSelection().removeAllRanges()
    }
  }

  async function getUserProfile(){
    let { data: profil, error } = await supabase
          .from('utilisateurs')
          .select("*")
          .eq("id", $session.user.id)

    profilData.set(profil[0])
    
    if (profil[0]) {
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
      }
      navDash()
    })
  }

  function menageSelection(e){
    let rect = pop.getBoundingClientRect()
    if (e.clientX > rect.left && e.clientY > rect.top && e.clientX < rect.left + rect.width && e.clientY < rect.top + rect.height) {
      
    } else {
      window.getSelection().removeAllRanges();
      pop.classList.add('hidden')
    }
    
  }

  onMount(()=>{
    
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6161d7e786aee40a5735bfc1/1fhj36obd';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();


  })
</script>

<svelte:window on:mouseup={fabtrad} on:mousedown={menageSelection}/>
<div bind:this={pop} class="hidden fixed top-0 left-0 z-50 bg-white shadow-xl  p-6 text-3xl rounded-lg">
  <div class="flex flex-row gap-5 justify-between items-center">
    <span>{selectedText}</span>
    <SpeechSynthesis texte={selectedText}/>
  </div>
</div>
<div class="h-screen max-h-screen w-full flex flex-row ">
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


