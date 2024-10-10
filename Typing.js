console.log("Ready");
let EasyLevel = document.getElementById('Easy');                                            //Levels
let MediumLevel = document.getElementById('Medium');                                        //Levels
let HardLevel = document.getElementById('Hard');                                            //Levels
let TimeValue = document.getElementById("TimeValue");                                       //Time
let PracticeTypeSelectionBox = document.getElementById('PracticeTypeSelection');            // Practice Type selectio box 
let PracticeChoiceSelected;                                                                 //Which Practice option is selected
let OutputData = "";                                                                             //To store fetched data through api in var
let CorrectCharacters = 0;                                                                  //To count the correct Characters typed
let IncorrectCharacters = 0;                                                                //To count the INcorrect Characters typed
let UserTimeinMilliseonds;                                                                  //To get time limit entered by user in MilliSeconds -> later used for TimeStopWatch/Time counter
let SubmitAllowedOrNot = true;                                                              //Allow user to submit data/Click only once
let RandomParagraph = [];
RandomParagraph = ["What were the chances? It would have to be a lot more than 100 to 1. It was likely even more than 1,000 to 1. The more he thought about it, the odds of it happening had to be more than 10,000 to 1 and even 100,000 to 1. People often threw around the chances of something happening as being 1,000,000 to 1 as an exaggeration of an unlikely event, but he could see that they may actually be accurate in this situation. Whatever the odds of it happening, he knew they were big. What he didn't know was whether this happening was lucky or unlucky.", "It was a simple green chair. There was nothing extraordinary about it or so it seemed. It was the type of chair one would pass without even noticing it was there, let alone what the actual color of it was. It was due to this common and unassuming appearance that few people actually stopped to sit in it and discover its magical powers.", "There was a reason for her shyness. Everyone assumed it had always been there but she knew better. She knew the exact moment that the shyness began. It had been that fateful moment at the lake. There are just some events that do that to you.", "The time had come for Nancy to say goodbye. She had been dreading this moment for a good six months, and it had finally arrived despite her best efforts to forestall it. No matter how hard she tried, she couldn't keep the inevitable from happening. So the time had come for a normal person to say goodbye and move on. It was at this moment that Nancy decided not to be a normal person. After all the time and effort she had expended, she couldn't bring herself to do it.", "It was always the Monday mornings. It never seemed to happen on Tuesday morning, Wednesday morning, or any other morning during the week. But it happened every Monday morning like clockwork. He mentally prepared himself to once again deal with what was about to happen, but this time he also placed a knife in his pocket just in case.", "Pink ponies and purple giraffes roamed the field. Cotton candy grew from the ground as a chocolate river meandered off to the side. What looked like stones in the pasture were actually rock candy. Everything in her dream seemed to be perfect except for the fact that she had no mouth.",
    "Josh had spent year and year accumulating the information. He knew it inside out and if there was ever anyone looking for an expert in the field, Josh would be the one to call. The problem was that there was nobody interested in the information besides him and he knew it. Years of information painstakingly memorized and sorted with not a sole giving even an ounce of interest in the topic.", "After hunting for several hours, we finally saw a large seal sunning itself on a flat rock. I took one of the wooden clubs while Larry took the longer one. We slowly snuck up behind the seal until we were close enough to club it over its head. The seal slumped over and died. This seal would help us survive. We could eat the meat and fat. The fat could be burned in a shell for light and the fur could be used to make a blanket. We declared our first day of hunting a great success.", "The spot was perfect for camouflage. At least that's what she thought when she picked the spot. She couldn't imagine that anyone would ever be able to see her in these surroundings. So there she sat, confident that she was hidden from the world and safe from danger. Unfortunately, she had not anticipated that others may be looking upon her from other angles, and now they were stealthily descending toward her hiding spot.", "The shades were closed keeping the room dark. Peter knew that he should open them and let in the sunlight so he could begin the day, but he didn't have the energy or willpower. Nothing had gone as expected the day before and he no longer wanted to spend the energy to begin a new day. He stared at the shades wondering if there was a way to disappear from the reality of the world for the rest of the day."];
let RandomEssay = "";
let ParagraphLocation;

// Form VALIDATIONS On click
document.getElementById('StartButton').addEventListener("click", FormValidations);
function FormValidations() {

    // TIME Validation
    if ((TimeValue.value.length == 0)) {
        document.getElementById('ErrorTimeSelection').style.display = "";
    } else if (TimeValue.value > 0 && TimeValue.value <= 20) {
        TimeSet = TimeValue.value;
    } else {
        document.getElementById('ErrorTimeSelection').style.display = "";
    }

    // PRACTICE Type Validation
    if (PracticeTypeSelectionBox.value == "") {
        document.getElementById('ErrorTypeSelection').style.display = "";
    } else if (PracticeTypeSelectionBox.value != "") {
        document.getElementById('ErrorTypeSelection').style.display = "none";
        PracticeChoiceSelected = PracticeTypeSelectionBox.value;
    }

    // LEVEL Validations
    if (EasyLevel.checked || MediumLevel.checked || HardLevel.checked) {
        document.getElementById('ErrorLevelSelection').style.display = "none";
    } else {
        document.getElementById('ErrorLevelSelection').style.display = "";
    }

    // Form Fully Valid -> Start Testing By fetching data from API
    if ((TimeValue.value.length != 0) && (TimeValue.value > 0 && TimeValue.value <= 20) && (PracticeTypeSelectionBox.value != "") && (EasyLevel.checked || MediumLevel.checked || HardLevel.checked)) {

        document.getElementById('Form').style.display = "none";                 //Hide Settings
        document.getElementById('TestBox').style.display = "";                  //Display Fetched Data for practice
        document.getElementById('SubmitButtonBox').style.display = "";          //Display Submit Button
        document.getElementById('Timebox').style.display = "";                  //Display Time Counter/StopWatch
        UserTimeinMilliseonds = (TimeValue.value * 60) * 1000;                  //User given time converted to MS -> used later for TimcCounter/TimeStopWatch
        if (PracticeChoiceSelected == "Paragraph") {                            //If Selected Paragraph -> Fetch Paragraphs


            ParagraphLocation = Math.floor(Math.random() * RandomParagraph.length);     //Gets RandomNumber formt he RandoParagraph Array -> Gets Paragraph at athta lcation -> set it as value of the OuputData and later performed testing 
            OutputData = RandomParagraph[ParagraphLocation];
            Span();                                                     //Covert all data characters to single span Tag
            Testing();                                                  //testing(User type data and check if correct or not)
            timeCounter();                                              //Time counter -> Allow typing/compare for specified time

        };

        if (PracticeChoiceSelected == "RandomWrods") {                               //If Selected RandomWords -> Fetch Random Words  
            fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text")
                .then(response => {
                    return response.text();
                })
                .then(FetchedResponse => {
                    OutputData += FetchedResponse;
                    Span();
                    Testing();
                    timeCounter();
                });
        };

        if (PracticeChoiceSelected == "Essay") {                               //If Selected Essays -> Fetch Essays (An essay of random paragraphs)      
            let i = 0;
            for (let i = 0; i < 6; i++) {
                ParagraphLocation = Math.floor(Math.random() * RandomParagraph.length);     //Get ranDom number form the RandomParagraph array -> Loop runs 6 times -> gets 6 paragraphs -> Set a value of OutputData lter performed testing
                OutputData += " " + RandomParagraph[ParagraphLocation];
            }
            OutputData;
            Span();                                                     //Covert all data characters to single span Tag
            Testing();                                                  //testing(User type data and check if correct or not)
            timeCounter();                                              //Time counter -> Allow typing/compare for specified time
        };


        if (PracticeChoiceSelected == "Alphanumeric") {                               //If Selected Essays -> Fetch Essays (An essay of random paragraphs)      
            let Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwyz1234567890!@#$%^&*()_+-={}[]|\'\\\":;?/><,.';
            let CharactersLength = Characters.length;
            let AlphanumericData = "";
            for (let j = 0; j < 70; j++) {
                for (let i = 0; i < 10; i++) {
                    AlphanumericData += " " + Characters.charAt(Math.floor(Math.random() * CharactersLength));
                }
            };
            OutputData += AlphanumericData;
            Span();
            Testing();
            timeCounter();
        };
    };
};
// To remove Time Error if correct time -> Form validations -> error handling
function RemoveTimeError() {
    TimeValue.value = "";
    document.getElementById('ErrorTimeSelection').style.display = "none";                   //On focus-> Time input -> Error display-> none
}
// For Paragraph's Each character to be stored in a span
function Span() {
    for (let i = 0; i <= OutputData.length; i++) {
        document.getElementById('TypingTest').innerHTML += `<span class="OuputDataCharactersSpan">${OutputData.charAt(i)}</span>`;
    };
}
// For testing of Correct/Incorrect Typed keys
let index = 0;
let WordsIndex = 0;
let ip = 0;
function Testing() {
    let KeyForCompare = "";
    document.onkeyup = function (keypressed) {                                                      //Gets the key Pressed
        keypressed.preventDefault();
        KeyForCompare = keypressed.key;                                                             //Key Pressed Stored as string
        if (keypressed.keyCode == 20 || keypressed.keyCode == 16 || keypressed.keyCode == 17 || keypressed.keyCode == 9) {         //20 ->Capslock , 16->shift , 17->ctrl , 9-> Tab
            keypressed.preventDefault();
        } else {
            let Words = document.getElementById('TypingTest').innerText.split(' ');
            // console.log(Words);/
            let WordsTobecomapred = document.getElementById('TypingTest').innerText;
            // console.log("Paragraph to be comopared : " + WordsTobecomapred);
            let spanTagsTobeCompared = document.getElementsByClassName("OuputDataCharactersSpan")[index];    //Get the First span Tag of the Paragraph  
            let TagTobecomapred = document.getElementsByClassName("OuputDataCharactersSpan")[index];    //Get the First span Tag of the Paragraph  

            // console.log(spanTagsTobeCompared);

            if (spanTagsTobeCompared.innerText == ' ') {
                // console.log(spanTagsTobeCompared);
                if (WordsIndex < Words.length)
                    if (WordsTobecomapred.includes(Words[WordsIndex])) {
                        console.log("This is word found : " + Words[WordsIndex] + " with a length of " + Words[WordsIndex].length + " at position : " + WordsTobecomapred.indexOf(Words[WordsIndex]));
                      

                        WordsIndex++;
                    };
            }

            if (TagTobecomapred.innerText == KeyForCompare) {                                           //Compare span.innertext(character) wd Key pressed
                TagTobecomapred.classList.add('CorrectChar');                                           //If matched Change  Character's color to Green
                CorrectCharacters++;
            } else {

                TagTobecomapred.classList.add('IncorrectChar');                                         //If not matched Change Character's color to red
                IncorrectCharacters++;
            };
            if (index <= OutputData.length) {                                                           //Condition Checked -> index++ -. only if  Paragraph characters(span) left
                index++;
            };
        };
    }
};
// TIMER
let TimeIncrement;                                                                                  //To store the id returned from SetInterval()
let timeElement = document.getElementById('Timer');

function timeCounter() {                                                                            //Called on data etch through api/won't start till data is fetched
    let sec = 0;
    let min = 0;
    let timeinMS = 0;                                                                               //To calculate current time in milliseconds
    TimeIncrement = setInterval(() => {                                                             //After 1000ms (1sec) -> run function setInterval -> checks condition (If user entered time < Current time ) -> then lets user keep testing > else get output function and return(stops execution)
        if (timeinMS < UserTimeinMilliseonds) {
            timeElement.innerHTML = min + ":" + sec;                                                // 0 min and 1 sec -> keeps incrementing secs
            sec++;
            timeinMS = 0 + Number(sec * 1000);                                                            //After each second convert the current time to milliseconds
            if (sec == 60) {                                                                        //if sec=60 -> 1 minute completed -> min=0++ -> 1 && seconds =0 -> again start from 1 min and 1 sec -> then again keep on incrementing secs
                min++;
                sec = 0;
                timeElement.innerHTML = min + ":" + sec;
            }
        } else {                                                                                      //If counter time> user time -> Call result table(function) and retunr(stops execution)
            ReportResultDisplay();
            return;
        };
    }, 1000);                                                                                       //Set interval function is called continuesly after each 1sec
};
// OUTPUTRESULT Table
function ReportResultDisplay() {                                                                     //Called on click on submit/Time end

    if (SubmitAllowedOrNot) {                                                                           //For 1st click -> True -> On next call flase -> hence doestnexecute next code -> no chnges in output
        clearTimeout(TimeIncrement);                                                                    //Whenever this function called -> timer count stops
        document.getElementById('DetailsResult').style.display = "";                                    //Display Output table
        document.getElementById('PracticeType').innerText = PracticeChoiceSelected;                     //Practice type(Essay/paragraph/game etc)
        document.getElementById('TotalCharacters').innerText = OutputData.length;                       //Total Characters in data
        document.getElementById('MissedCharacters').innerText = Math.abs((CorrectCharacters + IncorrectCharacters) - OutputData.length);      //Missed/not typed character
        document.getElementById('Correct').innerText = CorrectCharacters;                               //Correctly typed character
        document.getElementById('InCorrect').innerText = IncorrectCharacters;                           //Incorrectly typed characters
        document.getElementById('Total Time').innerText = TimeValue.value + " mins";                    //Total time set by user
        document.getElementById('Time Taken').innerText = document.getElementById('Timer').innerText;   //Time taken by user to complete testing
        document.getElementById('Accuracy').innerText = ((CorrectCharacters / 100) * 100 + " %").split('.');         //Total accuracy in percentage} 
        SubmitAllowedOrNot = false;                                                                       //After 1st click -> chang value to fase -> on next click -> condition false -> hence the click/function runs only once
    };
};
