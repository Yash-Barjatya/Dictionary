//console.log("connected")

let loading_animation = document.getElementById('loading_animation');
/*
$(window).load(function () {
    // Animate loader off screen
    $("#loading_animation").fadeOut("slow");;
});*/
$(window).on('load', function () {
    $('#loading_animation').hide();
})
displayRecentWord();
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

/**RESIZING INPUT TEXTAREA */

/*
var input = document.querySelector('input'); // get the input element
input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
    this.style.width = this.value.length + "30ch";
}*/
/********** *****/
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
        fetchWord();
        loading_animation.style.display = "block";
        setTimeout(function () {
            loading_animation.style.display = "none";
        }, 2990)
        setTimeout(function () {
            show_result.style.display = "block";
        }, 3000)


    }
    let recently_searched = localStorage.getItem("recently_searched");
    if (recently_searched == null) {
        recentWord = [];
    } else {
        recentWord = JSON.parse(recently_searched);

    }

    if (search_word.value != "") {
        recentWord.push(search_word.value);
        localStorage.setItem("recently_searched", JSON.stringify(recentWord));
        displayRecentWord();
    }



})
reset_btn.addEventListener('click', function () {
    search_word.value = "";
    show_result.style.display = "none";
})
// API for WORD
async function fetchWord() {
    //console.log('call received for fetchWord function')
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search_word.value}`)
    //console.log(`https://api.dictionaryapi.dev/api/v2/entries/en/${search_word.value}`)
    const data = await response.json();
    if (response.ok) {
        audio_btn.style.display = "block";
        bookmark_btn.style.display = "block";

        card_title.innerHTML = `${data[0].word}`
        word_meaning.innerHTML = `<br>  <b><i>Meaning: </i></b>  ${data[0].meanings[0].definitions[0].definition} `
        word_example.innerHTML = `<b><i>Example: </i></b>   ${data[0].meanings[0].definitions[0].example} `
        word_audio_source.src = `${data[0].phonetics[0].audio}`
        word_pronounciation.innerHTML = `<b><i>Pronounciation:</i></b>  ${data[0].phonetics[0].text}  `

    }
    else {
        card_title.innerHTML = `${data.title}`
        word_meaning.innerHTML = `${data.message}`
        word_example.innerHTML = `${data.resolution}`
        word_pronounciation.innerHTML = "";
        audio_btn.style.display = "none";
        bookmark_btn.style.display = "none";

    }
}
//word_audio
audio_btn.addEventListener('click', function (e) {
    e.preventDefault();
    audio_btn.getElementsByTagName("i")[0].className = "bi bi-volume-down-fill";
    word_audio.load(); //call this to just preload the audio without playing
    word_audio.play();
    word_audio.addEventListener('ended', function () {

        audio_btn.getElementsByTagName("i")[0].className = "bi bi-volume-down";
        console.log(audio_btn.getElementsByTagName("i")[0].className)


    })


})
//Recently searched
function displayRecentWord() {
    // console.log('displayRecentWord() called ');
    let recently_searched = localStorage.getItem("recently_searched");
    if (recently_searched == null) {
        // console.log("recentWord was null")
        recentWord = [];
    } else {
        recentWord = JSON.parse(recently_searched);
        // console.log("recentWord was not null")
    }
    let html = "";
    recentWord.forEach(function (element, index) {
        // console.log("entered recentWord loop  fnc")
        html += `<div class="recent_word my-2 mx-2 card" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title">${element}</h5>
            </div>
    </div>`;
        deleteRecentSearch(index);
        //console.log(html);
    });
    let recently_searched_element = document.getElementById('recently_searched')
    let recent_search_title = document.getElementById("recent_search_title");
    if (recentWord.length != 0) {
        recent_search_title.style.display = "block"
        recently_searched_element.innerHTML = html;
    }

}
function deleteRecentSearch(index) {
    //console.log(`index ${index} given`)
    let recently_searched = localStorage.getItem("recently_searched");
    if (recently_searched == null) {

        recentWord = [];
    } else {
        recentWord = JSON.parse(recently_searched);
    }
    if (index == 4) {
        //console.log(`index ${index} therefore entered splice function part;expected index =4`)
        recentWord.splice(0, 1);
        //index = 0;
        localStorage.setItem("recently_searched", JSON.stringify(recentWord));
        displayRecentWord();

    }
    // console.log(`index:${index} before leaving  delete fnc`)
}
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

/**
 * Back to top button
 */

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}