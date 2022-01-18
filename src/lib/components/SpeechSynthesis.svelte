<script>
  import { onMount } from "svelte"
  export let texte 

  let voices
  let zhVoices = []
  onMount(() => {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      zhVoices = voices.filter((v) => {
        return v.lang == "zh-CN"
      })
    }
  })

  function play(){
    const speak = new SpeechSynthesisUtterance(texte)
    speechSynthesis.cancel()
    speak.rate = 1
    speak.pitch = 1
    speak.volume = 100
    speak.voice = zhVoices[0]
    speechSynthesis.speak(speak)
    console.log("played")
  }


</script>


<button class="btn btn-secondary btn-circle" on:click={play}>
  <i class="fas fa-play"></i>
</button>
  