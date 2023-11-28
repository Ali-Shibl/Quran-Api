$(document).ready(function () {
  
let quran = document.querySelector("audio")
let soura = document.querySelector(".soura")
let ayah = document.querySelector(".ayah")
let next = document.getElementById("next")
let play = document.getElementById("play")
let prev = document.getElementById("prev")
getSoura();
async function getSoura() {
  let q = await fetch(`https://api.quran.gading.dev/surah`, { method: 'get' })
  let result = await q.json();
  let cartona = ''

  for (const key in result.data) {
    cartona += `
    <div class="text-white bg-dark bg-opacity-25 p-3 mb-3 rounded-4 ">
    <p class="m-0 mb-2 fs-4 ">${result.data[key].name.long}</p>
    <p class="m-0 lead">${result.data[key].name.transliteration.en}</p>
  
    </div>
   `
    soura.innerHTML = cartona;
  }
  let allSoura = document.querySelectorAll(".soura div")
  for (let i = 0; i < allSoura.length; i++) {
    allSoura[i].addEventListener("click", async function () {
      let q = await fetch(`https://api.quran.gading.dev/surah/${i + 1}`)
      let result = await q.json();
      let numayah = 0
      let text = []
      let audi = []

      for (let i = 0; i < result.data.verses.length; i++) {

        text.push(result.data.verses[i].text.arab)
        audi.push(result.data.verses[i].audio.primary)
      }


      changeAyah(numayah)
      quran.addEventListener('ended', () => {
        numayah++
        if (numayah < audi.length) {
          changeAyah(numayah)
        }
        else {
          numayah = 0
          changeAyah(numayah)
          quran.pause()
          isplaying = true
          toggleplay();
        }
      })

      next.addEventListener('click', () => {
        if (numayah < audi.length - 1) {
          numayah++;
          changeAyah(numayah)
        }
        else {
          numayah = 0
          changeAyah(numayah)
        }
      })
      prev.addEventListener('click', () => {

        if (numayah > 0) {
          numayah--;
          changeAyah(numayah)
        }
        else {
          numayah = audi.length

        }
      })

      let isplaying = false;
      toggleplay()
      function toggleplay() {
        if (isplaying) {
          quran.pause();
          play.innerHTML = `<i  class="fas fa-play" ></i>`
          isplaying = false
        } else {
          quran.play();
          play.innerHTML = `<i class="fa-solid fa-pause "></i>`
          isplaying = true
        }
      }

      play.addEventListener('click', toggleplay)

      function changeAyah(index) {
        ayah.innerHTML = text[index]
        quran.src = audi[index]

      }

    })

  }
}

  $('.loadingspinner').fadeOut(2500,function(){
    $('.loading').hide(500,function(){
      $('body').css('overflow','auto');
      $('.loading').remove();
    })
  });
});