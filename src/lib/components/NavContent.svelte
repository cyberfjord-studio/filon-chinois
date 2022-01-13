<script>
  const menu = [
    {
      "texte_cn": "课程",
      "texte_fr": "Lecons",
      "url": "/u/lecons"
    },
    {
      "texte_cn": "练习",
      "texte_fr": "Exercices",
      "url": "/u/exercices"
    },
    {
      "texte_cn": "词典",
      "texte_fr": "Lexique",
      "url": "/u/lexique"
    },
    {
      "texte_cn": "轮廓",
      "texte_fr": "Profil",
      "url": "/u/profil"
    }
  ]
</script>

<div class="flex flex-row md:flex-col gap-10 justify-center md:justify-start px-5 md:px-0 md:items-center pt-5">
  {#each menu as menuItem}
    <a href={menuItem.url} class="text-center w-full group">
      <span class="font-bold text-xl md:text-3xl text-base-content group-hover:text-primary-focus">
        {menuItem.texte_cn}
      </span>
      <p class="text-sm text-neutral-content group-hover:text-secondary-focus">
        {menuItem.texte_fr}
      </p>
    </a>
  {/each}
</div>