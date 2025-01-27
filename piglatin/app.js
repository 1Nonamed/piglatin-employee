const $ = (el) => document.querySelector(el);

const form = $("form");
const translatedWordInput = $('[name="translatedWord"]');

let regexVowels = /^[aeiou]$/i;

function pigLatin(word) {
  if (!word || !isNaN(word)) return word; // If empty

  const vowels = "aeiou";
  let cluster = "";
  let i = 0;

  while (i < word.length && !vowels.includes(word[i].toLowerCase())) {
    cluster += word[i];
    i++;
  }

  if (cluster.length > 0) {
    // Consonant cluster
    let translatedWord = word.slice(i) + cluster + "ay";
    console.log(translatedWord);

    return (translatedWordInput.value = translatedWord);
  } else {
    // Word starts with vowel
    let translatedWord = word + "way";
    console.log(translatedWord);

    return (translatedWordInput.value = translatedWord);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = $('[name="word"]').value.trim();
  pigLatin(inputValue)
});
