<script>
  import supabase from '$lib/db'

  async function deconnexion(){
    await supabase.auth.signOut()
  }
</script>

<button class="btn btn-primary shadow-xl" on:click={deconnexion}>Déconnexion</button> 

