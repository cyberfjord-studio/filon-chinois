<script>
  import { onMount } from "svelte"
  import { pitch, speed, voice } from "$lib/store"
  export let texte 

  let voices
  let zhVoices = []
  onMount(() => {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      zhVoices = voices.filter((v) => {
        return v.lang == "zh-CN"
      })
      voice.set(zhVoices[0])
      console.log($voice)
    }
  })

  function play(){
    const speak = new SpeechSynthesisUtterance(texte)
    speechSynthesis.cancel()
    speak.rate = $speed
    speak.pitch = $pitch
    speak.volume = 100
    speak.voice = zhVoices[0]
    speechSynthesis.speak(speak)
  }


</script>


<button class="btn btn-secondary btn-circle" on:click={play}>
  <i class="fas fa-play"></i>
</button>
  