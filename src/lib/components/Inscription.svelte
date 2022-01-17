<script>
  import supabase from '$lib/db'

  let emailins = ""
  let passins = ""
  let niveauins = 1
  let institutionins = ""

  let modal = false
  let message = 0

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
    if (emailins != "" && passins != "" && niveauins != "" && institutionins != "") {
      const { user, session, error } = await supabase.auth.signUp({
      email: emailins,
      password: passins,
    },
    {
      data: {
        pseudo: emailins.split('@')[0],
        niveau: niveauins,
        institution: institutionins
      }
    }
    
    )
    }
    

    nouvelAvatar(user.id)
    if (error) {
      message = 2
    } else {
      message = 1
    }

  }
</script>

<button class="btn btn-neutral shadow-xl" on:click={() => modal = true}>Inscription</button> 

{#if modal}
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 flex justify-center items-center">
    <form class="gap-2 bg-base-100 w-full md:w-4/12 xl:w-2/12 p-7 rounded-md" on:submit|preventDefault={inscription}>
      <div class="flex flex-col gap-2 justify-center items-stretch">
        <input bind:value={emailins} type="email" name="email" id="email" placeholder="Adresse courriel" class="input input-md input-bordered">
        <input bind:value={passins} class="input input-md input-bordered" placeholder="Mot de passe" type="password" name="password" id="password" >
        <select bind:value={institutionins} name="institution" id="institution">
          <option value="Université de Sherbrooke">Université de Sherbrooke</option>
          <option value="Université de Montréal">Université de Montréal</option>
          <option value="Université Bishop">Université Bishop</option>
          <option value="Collège Champlain">Collège Champlain</option>
        </select>
        <select bind:value={niveauins} name="niveau" id="niveau">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div class="my-4">
        {#if message == 1}
          <div class="alert alert-success">
            <div class="flex-1">
              <label>Vous êtes inscrit! Veuillez confirmer votre adresse courriel afin d'accèder au site!</label>
            </div>
          </div>
        {:else if message == 2}
          <div class="alert alert-error">
            <div class="flex-1">
              <label>Une erreur est survenue, veuillez réessayer plus tards!</label>
            </div>
          </div>
        {:else if message == 3}
          <div class="alert alert-error">
            <div class="flex-1">
              <label>Le groupe que vous avez inscrit est invalide!</label>
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

