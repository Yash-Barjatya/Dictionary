console.log("connected")
let loading_animation = document.getElementById('loading_animation');
/*
$(window).load(function () {
    // Animate loader off screen
    $("#loading_animation").fadeOut("slow");;
});*/
$(window).on('load', function () {
    $('#loading_animation').hide();
})
displayquote();
/**********FETCH API************/

// API for QUOTE
let quote = document.getElementById('quote');
let author = document.getElementById('author');
async function displayquote() {
    let quote_num = Math.floor(Math.random() * 1643)
    const response = await fetch("https://type.fit/api/quotes")
    const data = await response.json();
    if (response.ok) {
        // Update DOM elements
        quote.innerHTML = `"${data[quote_num].text}"`
        author.innerHTML = `~${data[quote_num].author} `
    }
    else {
        fetch("http://api.quotable.io/random")
            .then(res => res.json())// to convert into json format
            .then(data => {
                quote.innerHTML = `"${data.content}"`
                author.innerHTML = `~${data.author} `
            })

    }
}




let search_word = document.getElementById('search_word');
let card_title = document.getElementById('card_title');
let word_meaning = document.getElementById('word_meaning');
let word_example = document.getElementById('word_example');
let word_pronounciation = document.getElementById('word_pronounciation');
let word_audio_source = document.getElementById('word_audio_source');
let word_audio = document.getElementById('word_audio');
let audio_btn = document.getElementById('audio_btn');
let search_btn = document.getElementById('search_btn');

let word_result_div = document.getElementById('word_result_div');

search_btn.addEventListener('click', function () {
    let show_result = document.getElementById('show_result');
    show_result.style.display = "none";
    if (search_word.value == "") {
        show_result.style.display = "none";
        var toastLiveExample = document.getElementById('liveToast')
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show()
    }
    else {
        displayWord();
        loading_animation.style.display = "block";
        setTimeout(function () {
            loading_animation.style.display = "none";
        }, 2990)
        setTimeout(function () {
            show_result.style.display = "block";
        }, 3000)


    }

})
reset_btn.addEventListener('click', function () {
    search_word.value = "";
})
// API for WORD
async function displayWord() {
    console.log('call received for displayWord function')
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search_word.value}`)
    console.log(`https://api.dictionaryapi.dev/api/v2/entries/en/${search_word.value}`)
    const data = await response.json();
    if (response.ok) {
        card_title.innerHTML = `${data[0].word}`
        word_meaning.innerHTML = `<br>  <b><i>Meaning: </i></b>  ${data[0].meanings[0].definitions[0].definition} `
        word_example.innerHTML = `<b><i>Example: </i></b>   ${data[0].meanings[0].definitions[0].example} `
        word_audio_source.src = `${data[0].phonetics[0].audio}`
        word_pronounciation.innerHTML = `<b><i>Pronounciation:</i></b>  ${data[0].phonetics[0].text}  `
    }
}
//word_audio
audio_btn.addEventListener('click', function (e) {
    e.preventDefault();
    audio_btn.getElementsByTagName("i")[0].className = "bi bi-volume-down-fill";
    word_audio.load(); //call this to just preload the audio without playing
    word_audio.play();
    word_audio.onended() = function () {
        audio_btn.getElementsByTagName("i")[0].className = "bi bi-volume-down";
    }


})
//bookmark
let bookmark_btn = document.getElementById('bookmark_btn')
bookmark_btn.addEventListener('click', function () {

    let bookmark_icon = bookmark_btn.getElementsByTagName("i")[0].className

    if (bookmark_icon == "bi bi-bookmark") {

        bookmark_btn.getElementsByTagName("i")[0].className = "bi bi-bookmark-check-fill";

    }
    else {
        bookmark_btn.getElementsByTagName("i")[0].className = "bi bi-bookmark";
    }

})