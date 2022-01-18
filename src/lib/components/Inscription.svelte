<script>
  import supabase from '$lib/db'

  let email = ""
  let pass = ""
  let niveau = 1
  let institution = ""

  let modal = false
  let message = null

  async function nouvelAvatar(utilisateur){
    const avatarFile = 'https://www.filon-chinois.app/avatarsample.jpg'
    const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload(`${utilisateur}.jpg`, avatarFile, {
        cacheControl: '3600',
        upsert: false
      })
  }

  async function inscription(){
    if (pass.length < 6) {
      message = ["error", "Votre mot de passe doit faire au moins 6 caractères"]
    }
    else {
      const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
        },
        {
          data: {
            pseudo: email.split('@')[0],
            niveau: niveau,
            institution: institution
          }
        }
    )

      if (error) {
        message = ["error", "Une erreur est survenue, veuillez réessayer plus tards!"]
      } else {
        message = ["success", "Veuillez confirmer votre adresse courriel avant de vous connecter"]
        nouvelAvatar(user.id)
      }
    }
    

    

  }
</script>

<button class="btn btn-neutral shadow-xl" on:click={() => modal = true}>Inscription</button> 

{#if modal}
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 flex justify-center items-center">
    <form class="gap-2 bg-base-100 w-full md:w-4/12 xl:w-2/12 p-7 rounded-md" on:submit|preventDefault={inscription}>
      <div class="flex flex-col gap-2 justify-center items-stretch">
        <input bind:value={email} type="email" name="email" id="email" placeholder="Adresse courriel" class="input input-md input-bordered">
        <input bind:value={pass} class="input input-md input-bordered" placeholder="Mot de passe" type="password" name="password" id="password" >
        <select bind:value={institution} name="institution" id="institution">
          <option selected="selected" value="Université de Sherbrooke">Université de Sherbrooke</option>
          <option value="Université de Montréal">Université de Montréal</option>
          <option value="Université Bishop">Université Bishop</option>
          <option value="Collège Champlain">Collège Champlain</option>
          <option value="Collège Champlain">Autres</option>
        </select>
        <select bind:value={niveau} name="niveau" id="niveau">
          <option selected="selected" value="1">1</option>
        </select>
      </div>
      <div class="my-4">
        {#if message != null}
          <div class={`alert alert-${message[0]}`}>
            <div class="flex-1">
              <p>{message[1]}</p>
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

