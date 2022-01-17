<script>
  import supabase from '$lib/db'

  let email = ""
  let pass = ""

  let modal = false

  function enter(e){
    if (e.charCode === 13) {
      connexion()
    }
  }

  async function connexion(){
    const { session: userSession, error } = await supabase.auth.signIn({
      email: email,
      password: pass,
    })
    modal = false
  }
</script>

<button class="btn btn-primary shadow-xl" on:click={() => modal = true}>Connexion</button> 

{#if modal}
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 flex justify-center items-center">
    <form class="gap-2 bg-base-100 w-full md:w-4/12 xl:w-2/12 p-7 rounded-md" on:submit|preventDefault={connexion}>
      <div class="flex flex-col gap-2 justify-center items-stretch">
        <input bind:value={email} type="email" name="email" id="email" placeholder="Adresse courriel" class="input input-md input-bordered" on:keypress={enter}>
        <input bind:value={pass} class="input input-md input-bordered" placeholder="Mot de passe" type="password" name="password" id="password" on:keypress={enter}>
      </div>
      <div class="flex flex-row gap-2 justify-center items-stretch">
        <button tabindex="-1" class="btn mt-5 btn-neutral tracking-widest font-normal" on:click|preventDefault={() => modal = false}>Annuler</button>
        <button tabindex="0" class="btn mt-5 btn-primary tracking-widest font-normal" type="submit">Connexion</button>
      </div>
    </form>
  </div>
{/if}

