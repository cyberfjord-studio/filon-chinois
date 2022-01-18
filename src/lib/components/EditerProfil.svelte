<script>
  import supabase from '$lib/db'
  import { profilData } from "$lib/store";

  let pseudo = $profilData.pseudo

  let path;

  let uploading = false
  let files;

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) throw error
      
      profilAvatar.set(URL.createObjectURL(data))
      
    } catch (error) {
      console.error('Error downloading image: ', error.message)
    } finally{
      path = ""
    }
  }

  async function sauvegarderProfil(){
    const { data, error } = await supabase
      .from('utilisateurs')
      .update({ 'nom' : nom})
      .eq('id', $profilData.id)
    
  }

  async function sauvegarderGroupe(){

  }

  async function uploadAvatar() {
    try {
      uploading = true

      if (!files || files.length === 0) {
        throw new Error('Vous devez sélectionner une nouvelle image.')
      }

      const file = files[0]
      const fileName = `${$profilData.id}.jpg`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true
        })

      if (uploadError) throw uploadError
      
      path = filePath
    } catch (error) {
      console.log(error)
    } finally {
      uploading = false
    }
  }

</script>
<form>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Modifier les informations
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Bienvenue sur votre profil Filon-Chinois!
      </p>
    </div>
    
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Pseudo
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input type="text" class="input input-primary input-bordered" bind:value={pseudo}>
              
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Avatar
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <label class="button primary block" for="single">
                  {uploading ? 'Uploading ...' : ''}
                </label>
              <input
                type="file"
                id="single"
                accept="image/jpeg"
                bind:files
                disabled={uploading}
              />

            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500"></dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button class="btn btn-primary" on:click|preventDefault={sauvegarderProfil}>Sauvegarder</button>
            </dd>
          </div>
        </dl>
      </div>
    
  </div>

  <div class="bg-white mt-5 shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Modifier le groupe
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Bienvenue sur votre profil Filon-Chinois!
      </p>
    </div>
    
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Groupe
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input type="text" class="input input-primary input-bordered" bind:value={groupe}>
            </dd>
          </div>
        </dl>
      </div>
      <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500"></dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <button class="btn btn-primary" on:click|preventDefault={sauvegarderGroupe}>Sauvegarder</button>
        </dd>
      </div>
  </div>

</form>