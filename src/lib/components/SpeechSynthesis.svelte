<script>
  import { onMount } from "svelte"
  export let texte 

  let voices
  let zhVoices = []

  function getOtherVoices(){
    voices = speechSynthesis.getVoices()
    zhVoices = voices.filter((v) => {
        return v.lang == "zh-CN" && v.name != "Ting-Ting"
    })
  }

  onMount(() => {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices()
      zhVoices = voices.filter((v) => {
        return v.name == "Google 普通话（中国大陆）"
      })
      if (!zhVoices.length) {
        getOtherVoices()
      }
    }
  })

  function play(){
    const speak = new SpeechSynthesisUtterance(texte)
    speechSynthesis.cancel()
    speak.rate = 0.7
    speak.pitch = 1
    speak.volume = 100
    speak.voice = zhVoices[0]
    speechSynthesis.speak(speak)
  }


</script>


<button class="btn btn-secondary btn-circle" on:click={play}>
  <i class="fas fa-play"></i>
</button>