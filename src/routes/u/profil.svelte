<script>
  import { profilData, groupeData, bgImage } from "$lib/store";
  import ProfilTable from "$lib/components/ProfilTable.svelte";
  let tab = 1
</script>

<article class="pb-24 md:pb-0">
  <div>
    <div>
      <div class="h-32 w-full lg:h-64" style="background-image: url('{$bgImage}'); background-size: cover; background-position: 50% 70%;">

      </div>
    </div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="-mt-12 sm:-mt-16 flex items-end space-x-5">
        <div class="flex">
          <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-white" src={$profilData.avatar} alt="">
        </div>
        <div class="mt-6 flex-1 sm:min-w-0 flex items-center sm:justify-end sm:space-x-6 sm:pb-1">
          <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
            <h1 class="text-2xl font-bold text-gray-900 truncate">
              {$profilData.pseudo}
            </h1>
          </div>
          <div class="mt-6 flex md:flex-col md:justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500" on:click={() => tab = 3}>
              <i class="fas fa-user-edit"></i>
              <span class="pl-3">Éditer</span>
            </button>
          </div>
        </div>
      </div>
      <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
        <h1 class="text-2xl font-bold text-gray-900 truncate">
          {$profilData.pseudo}
        </h1>
      </div>
    </div>
  </div>

  <div class="w-full py-5">
    <div class="w-full xl:w-1/2 mx-auto flex flex-col">
      <div>
        {#if tab == 1}
          <ProfilTable gr={groupeData} u={profilData}/>
        {:else}
          Édition
        {/if}
      </div>
    </div>
  </div>
  

</article>