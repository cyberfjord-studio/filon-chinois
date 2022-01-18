<script>
  export let d
  const publicFolder = "https://fjzpeeuodgpzyiranoip.supabase.in/storage/v1/object/public/ressources/"
  const fichier = publicFolder + d
  const type = d.split("/")[0]
</script>

{#if type == "images"}
  <img src={fichier} alt="">
{:else if type == "sons"}
  <audio src={fichier} controls></audio>
{:else if type == "icones"}
  <img src={fichier} alt="">
{:else}
  <span></span>
{/if}