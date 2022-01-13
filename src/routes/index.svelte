<script>
  import Connexion from "$lib/components/Connexion.svelte";
  import Inscription from '$lib/components/Inscription.svelte';
  import { bgImage } from '$lib/store';
</script>

<div class="w-full h-96 md:h-full" style="background-image: linear-gradient(175deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 37%), url('{$bgImage}'); background-size: cover; background-position: bottom center;">
  <header class="flex flex-col md:gap-5 pl-10 pt-4">
    <h1 class="uppercase font-light text-3xl md:text-6xl">Filon Chinois</h1>
    <h2 class="text-primary text-2xl md:text-5xl">学习中文</h2>
  </header>
  <footer class="absolute left-0 bottom-0 md:left-24 right-0 h-32 bg-base-100">
    <div class="shadow-2xl absolute bottom-32 md:bottom-0 left-0  w-full md:w-4/12 p-6 md:p-10 bg-base-100 md:rounded-r-xl z-50">
      <p class="prose-sm font-sm">Le Filon Chinois, c'est un site dédié à l'apprentissage du mandarin pour les débutants. Il a été créé afin de fournir un outil multimédia pratique regroupant plusieurs avantages et ressources en un endroit, dont une multitude d'exercices avec rétroaction immédiate, des jeux de mémoires et des fonctions technologiques comme la synthèse vocale. Le site est en constante évolution afin de pouvoir mieux vous aider alors ne soyez pas surpris si le contenu a changé depuis votre dernière visite! Bon apprentissage!</p>
      <div class="mt-4 md:mt-10 flex flex-row justify-center items-center gap-5">
          <Connexion/>
          <Inscription/>
        </div>
      </div>
      <div class="absolute bottom-0 mx-auto md:right-0 md:w-8/12 h-32 bg-base-100 flex justify-end items-center px-5 md:pr-16">
        <img src="/partenaires.png" alt="">
      </div>
    </footer>
  </div>