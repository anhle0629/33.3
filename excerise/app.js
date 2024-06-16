
///async & await method 

$(function(){
  let baseURL = "http://numbersapi.com/"
//1.  
  async function part1A() {
      let myNumber = $.getJSON(`${baseURL}/3/trivia`)
      console.log(myNumber)


//2.
  async function part1B (){
      let promise7 = $.getJSON(`${baseURL}/7/trivia`)
      let promise4 = $.getJSON(`${baseURL}/4/trivia`)
      let promise8 = $.getJSON(`${baseURL}/8/trivia`)
      let promise9 = $.getJSON(`${baseURL}/9/trivia`)

      let  num7 = await promise7 
      let  num4 = await promise4 
      let  num8 = await promise8
      let  num9 = await promise9

      console.log(num7)
      console.log(num4)
      console.log(num8)
      console.log(num9)
  }

//3
  async function part3A(){
      let fact = await Promise.all([
      $.getJSON(`${baseURL}/7/trivia`),
      $.getJSON(`${baseURL}/7/trivia`),
      $.getJSON(`${baseURL}/7/trivia`),
      $.getJSON(`${baseURL}/7/trivia`)
      ]) 

      console.log(`the first fact is ${fact}`)
      console.log(`the second fact is ${fact}`)
      console.log(`the third fact is ${fact}`)
      console.log(`the last fact is ${fact}`)
  }
}
})

$(function(){
  let baseURL = 'https://deckofcardsapi.com/api/deck'

  //1.
  async function part1(){
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let {suit, value} = data.card[0]
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
  }


  //2.
  async function part2(){
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`)
    let deckID = firstCardData.deck_ID;
    let secondCardData = await $.getJSON(`${baseURL}/${deckID}/draw/`) 
    [firstCardData, secondCardData].forEach(card => {
      let {suit, value} = card.card[0]
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    });

  }

  //3. 
  async function part3(){
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckdata = await $.getJSON(`${baseURL}/new/shuffle/`)
    $btn.show().on('click', async function(){
      let cardData = await $.getJSON(`${baseURL}/${deckdata.deck_ID}/draw/`)
      let cardSrc = cardData.card[0].image;
      let angle = Math.random()* 90 - 45;
      let randomX= Math.random()* 40-20; 
      let randomY= Math.random()* 40-20; 

      $cardArea.append(
        src:cardSrc,
        css:{
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      )
      if (cardData.remaining === 0) $btn.remove();
    })
  }
  setup();
})