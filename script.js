let level = 1;
let xp = 0;
let user = "";

/* LOGIN */
function login(){
    user = prompt("Dein Name:");
    if(user){
        loadData();
        updateUI();
        alert("Willkommen " + user + " 👋");
    }
}

/* SPEICHERN */
function saveData(){
    if(!user) return;

    let data = {
        level: level,
        xp: xp
    };

    localStorage.setItem(user, JSON.stringify(data));
}

/* LADEN */
function loadData(){
    let data = localStorage.getItem(user);

    if(data){
        let obj = JSON.parse(data);
        level = obj.level;
        xp = obj.xp;
    }

    updateTask();
    updateUI();
}

/* AUFGABE PRÜFEN */
function checkTask(){

let html = document.getElementById("html").value.toLowerCase();
let correct = false;

/* Level 1 */
if(level === 1){
    if(html.includes("<h1>") && html.includes("hallo welt")){
        correct = true;
    }
}

/* Level 2 */
if(level === 2){
    if(html.includes("<button")){
        correct = true;
    }
}

/* LEVEL 3 */
if(level === 3){
    if(html.includes("<p")){
        correct = true;
    }
}

if(correct){
    xp += 10;

    document.getElementById("result").innerHTML = "🎉 Richtig!";
    document.getElementById("result").style.color = "lightgreen";

    updateLevel();
    saveData();

}else{
    document.getElementById("result").innerHTML = "❌ Noch nicht richtig!";
    document.getElementById("result").style.color = "red";
}

updateUI();
}

/* LEVEL SYSTEM */
function updateLevel(){

if(xp >= 20) level = 2;
if(xp >= 40) level = 3;

updateTask();
}

/* AUFGABEN */
function updateTask(){

if(level === 1){
    document.getElementById("taskTitle").innerText = "Aufgabe 1";
    document.getElementById("taskText").innerText =
    "Erstelle eine <h1> mit 'Hallo Welt'";
}

if(level === 2){
    document.getElementById("taskTitle").innerText = "Aufgabe 2";
    document.getElementById("taskText").innerText =
    "Erstelle einen <button>";
}

if(level === 3){
    document.getElementById("taskTitle").innerText = "Aufgabe 3";
    document.getElementById("taskText").innerText =
    "Erstelle einen <p> Text";
}

}

/* UI UPDATE */
function updateUI(){
    document.getElementById("level").innerText = level;
    document.getElementById("xp").innerText = xp;
}

/* AUTO SAVE */
setInterval(saveData, 2000);
