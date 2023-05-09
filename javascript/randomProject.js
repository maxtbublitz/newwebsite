let numProjects = 7;
let projectsToShow = 3;

let numberSorter = []; //random numbers between 0 and num projects

let temp = 0;


let selectProject1 = 1;
let selectProject2 = 2;
let selectProject3 = 3;

let projects = [];

projects[0] =
'<a href="vitaaerospace.html"><img class="coverImage" src="../photos/pjct-cover-vita.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">Vita Aerospace</h3 class="lightText"><p class="lightText">Graphic</p></div></a>';

projects[1] = 
'<a href="calculatorDescription.html"><img class="coverImage" src="../photos/UICalc.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">ROI Calculator</h3><p class="lightText">UI/UX + Web</p></div></a>';

projects[2] =
'<a href="CTQ.html"><img class="coverImage" src="../photos/prjt-cover-qtc.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">Audio Visulatization</h3><p class="lightText">Motion Graphic</p></div></a>';

projects[3] = 
'<a href="techbooklets.html"><img class="coverImage" src="../photos/prjt-cover-spec.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">Technical Booklets</h3><p class="lightText">Graphic</p></div></a>';

projects[4] = 
'<a href="breatheasy.html"><img class="coverImage" src="../photos/pjct-cover-breatheasy.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">Breatheasy</h3><p class="lightText">UI/UX + Web</p></div></a>';

projects[5] = 
'<a href="egobro.html"><img class="coverImage" src="../photos/prjct-cover-egobro-old.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">EgoBro</h3><p class="lightText">Graphic + UI/UX</p></div></a>';

projects[6] =
'<a href="cards.html"><img class="coverImage" src="../photos/prjt-cover-avalanche.jpg" alt=""><div class="descHolder" data-aos="fade-in"><h3 class="lightText">Sports Cards</h3><p class="lightText">Graphic</p></div></a>';

function populateSorter(array){
    for(let i = 0; i < numProjects; i++){
        array.push(i);
    }
    console.log("populate entered");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log("shuffled");
}

function randomProjects (array1, array2){
    temp = array1[0];
    $("#randProject1").append(array2[temp]);
    console.log(array2[temp]);
    temp = array1[1];
    $('#randProject2').append(array2[temp]);
    temp = array1[2];
    $('#randProject3').append(array2[temp]);
    
    console.log("random projects entered");
}

populateSorter(numberSorter);
shuffleArray(numberSorter);
randomProjects(numberSorter, projects);
