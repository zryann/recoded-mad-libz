/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
const POS={
  n:"noun",
  v:"verb",
  a:"adj"
}
function findPOS(pos){
  const fixedPOS=pos.replace("[","").replace("]","");
  return POS[fixedPOS];
}

const OUR_REGEX=/(?<word>\w+)(?<pos>\[[nva]\])?(?<punc>[\.,])?/;

function parseStory(rawStory) {
    const arrStory=rawStory.split(" ");
    const fixedArray=[];
    for(let el of arrStory){
      const group=OUR_REGEX.exec(el).groups;
       if(group.pos!=undefined && group.punc==undefined){
        fixedArray.push({
          word:group.word,
          pos:findPOS(group.pos)
        });
      }
      else if(group.pos==undefined && group.punc!=undefined){
        fixedArray.push({
          word:group.word
        });
        fixedArray.push({
          word:group.punc
        });
      }
      else if(group.pos!=undefined && group.punc!=undefined){
        fixedArray.push({
          word:group.word,
          pos:findPOS(group.pos)
        });
        fixedArray.push({
          word:group.punc
        });
      }
     else{
      fixedArray.push({
      word:group.word
      });
     }
    }
    return fixedArray; 
  }
     
  

    // for(let e of arrStory){
    //   if(/([[]a])/.test(e) && /[.,]/.test(e)){
    //   fixedArray.push({word:e.replace("[a]","").substring(0,e.length-1),pos:"adj"});
    //   fixedArray.push({word:e.substring(e.length-1)})
    //   }
    //   else if(/[[]a]/.test(e) && !(/[.,]/.test(e))){
    //     fixedArray.push({word:e.replace("[a]",""),pos:"adj"});
    //   }
    //   else if(/[[]v]/.test(e) && /[.,]/.test(e)){
    //     fixedArray.push({word:e.replace("[v]","").substring(0,e.length-1),pos:"verb"});
    //     fixedArray.push({word:e.substring(e.length-1)})
    //     }
    //   else if(/[[]v]/.test(e) && !/[.,]/.test(e)){
    //     fixedArray.push({word:e.replace("[v]",""),pos:"verb"});
    //   }
    //   else if(/[[]n]/.test(e) && /[.,]/.test(e)){
    //     fixedArray.push({word:e.replace("[n]","").substring(0,e.length-1),pos:"noun"});
    //     fixedArray.push({word:e.substring(e.length-1)})
    //     }
    //   else if(/[[]n]/.test(e) && !/[.,]/.test(e)){
    //     fixedArray.push({word:e.replace("[n]",""),pos:"noun"});
    //   }
    //   else if(/[.,]/.test(e)){
    //     fixedArray.push({word:e.replace("\n","").substring(0,e.length-1)});
    //     fixedArray.push({word:e.substring(e.length-1)})
    //   }
    //   else{
    //     fixedArray.push({word:e.replace("\n","")});
    //   }
    




/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
  console.log(processedStory);
  const madLibsEdit=document.querySelector(".madLibsEdit");
  const madLibsPreview=document.querySelector(".madLibsPreview");
  const pEdit=document.createElement('p');
  const pPrev=document.createElement('p');
  madLibsEdit.append(pEdit);
  madLibsPreview.append(pPrev);
  for(let wp of processedStory){
    if(wp.pos!=undefined){
    const inputEdit=document.createElement('input');
    const inputPrev=document.createElement('input');
    pEdit.appendChild(inputEdit);
    pPrev.appendChild(inputPrev);
    inputEdit.placeholder=wp.pos;
    inputPrev.placeholder=wp.pos;
    inputEdit.maxLength=20;
    inputPrev.readOnly=true;
    
    inputEdit.addEventListener('input',()=>{
      inputPrev.value=inputEdit.value;
    });
    
    inputEdit.addEventListener('keydown', e => {
      if(e.keyCode === 13) {
        let nextEl = inputEdit.nextElementSibling;
            if(nextEl!=null){
              if(nextEl.nodeName === 'INPUT') {
              nextEl.focus();
               }
          }
          else {
            alert('Done!!!');
        }
        }
      });
    }
    else{ 
      if(wp.word=="," || wp.word=="."){
        pEdit.append(`${wp.word}`);
       pPrev.append(`${wp.word}`);
      }
      else{
      pEdit.append(` ${wp.word}`);
      pPrev.append(` ${wp.word}`);
      }
    }
  }
   
 });
