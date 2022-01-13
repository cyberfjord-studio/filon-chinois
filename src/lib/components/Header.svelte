<script>
  import supabase from '$lib/db'

  async function deconnexion(){
    await supabase.auth.signOut()
  }
</script>


<div class="bg-base-100 shadow-lg py-5 px-6 md:px-16 flex flex-row justify-between items-center">
  <h2 class="uppercase font-light text-2xl md:text-4xl">Filon Chinois <span class="text-primary md:text-3xl font-medium">学习中文</span></h2>
  <div class="flex flex-row gap-4">
    <button class="text-2xl md:text-3xl"><i class="fas fa-cog text-primary "></i></button>
    <button class="text-2xl md:text-3xl" on:click={deconnexion}><i class="fas fa-close text-primary "></i></button>
  </div>
</div>