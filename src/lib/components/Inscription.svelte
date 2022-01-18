<script>
  import supabase from '$lib/db'

  let email = ""
  let pass = ""
  let niveau = "1"
  let institution = "Université de Sherbrooke"

  let modal = false
  let message = null

  async function creerProfil(u, e, n, i){
    const { data, error } = await supabase
      .from('utilisateurs')
      .insert([
        { id: u.id, nom: e.split('@')[0], niveau: n, institution: i },
      ])
      console.log(error)
  }


  async function inscription(){
    if (pass.length < 6) {
      message = ["error", "Votre mot de passe doit faire au moins 6 caractères"]
    }
    else {
      const { user, session, error } = await supabase.auth.signUp({
          email: email,
          password: pass,
        }
    )
      console.log(user)
      if (error) {
        message = ["error", "Échec! Veuillez réessayer."]
      } else {
        creerProfil(user, email, niveau, institution)
        message = ["success", "Inscription réussie! Veuillez confirmer votre adresse courriel avant de vous connecter!"]
      }
    }
    

    

  }
</script>

<button class="btn btn-neutral shadow-xl" on:click={() => modal = true}>Inscription</button> 

{#if modal}
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 flex justify-center items-center">
    <form class="gap-2 bg-base-100 w-full md:w-4/12 xl:w-2/12 p-7 rounded-md" on:submit|preventDefault={inscription}>
      <div class="flex flex-col gap-2 justify-center items-stretch">
        <label class="text-xs" for="email">Email</label>
        <input bind:value={email} type="email" name="email" id="email" placeholder="Adresse courriel" class="input input-md input-bordered">
        <label class="text-xs" for="password">Mot de passe</label>
        <input bind:value={pass} class="input input-md input-bordered" placeholder="Mot de passe" type="password" name="password" id="password" >
        <label class="text-xs" for="institution">Institution</label>
        <select bind:value={institution} name="institution" id="institution" class="select select-bordered w-full max-w-xs">
          <option selected="selected" value="Université de Sherbrooke">Université de Sherbrooke</option>
          <option value="Université de Montréal">Université de Montréal</option>
          <option value="Université Bishop">Université Bishop</option>
          <option value="Collège Champlain">Collège Champlain</option>
          <option value="Collège Champlain">Autres</option>
        </select>
        <label class="text-xs" for="niveau">Niveau</label>
        <select bind:value={niveau} name="niveau" id="niveau" class="select select-bordered w-full max-w-xs">
          <option selected="selected" value="1">1</option>
        </select>
      </div>
      <div class="my-4">
        {#if message != null}
          <div class={`alert alert-${message[0]}`}>
            <div class="flex-1">
              <label>{message[1]}</label>
            </div>
          </div>
        {/if}
      </div>
      <div class="flex flex-row gap-2 justify-center items-stretch">
        <button class="btn mt-5 btn-neutral tracking-widest font-normal" on:click|preventDefault={() => modal = false}>Annuler</button>
        <button class="btn mt-5 btn-primary tracking-widest font-normal" type="submit">Inscription</button>
      </div>
    </form>
  </div>
{/if}

