<script>
  export let d
  export let c
  console.log(c)
</script>


  <div class="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-full scale-95 transition-transform duration-500 hover:scale-100">
    <a href="/u/exercices/{d.id}">
    <div class="flex items-center px-3 py-1" style="background-color: {c.couleur};">
      <h4 class="mx-3 text-lg font-semibold text-white">{c.titre_fr}</h4>
    </div>

    <div class="px-6 py-4 relative">
        <h1 class="text-xl font-semibold text-gray-800 dark:text-white">{d.titre_fr}</h1>
        {#if d.description != null}
          <p class="py-2 text-gray-700 dark:text-gray-400 h-20">{@html d.description}</p>
          <div class="flex items-center my-4 text-gray-700 dark:text-gray-200"></div>
          <div class="absolute block bottom-0 left-0 right-0 h-12 z-50 " style="background-image: linear-gradient(0deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%)"></div>
        {/if}
        
    </div>
  </a>
  </div>

