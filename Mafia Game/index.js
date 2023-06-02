//jshint maxerr: 1000
//0 is the player
let [profile0, profile1, profile2, profile3, profile4] = [{}, {}, {}, {}, {}, {}];
//HTML
let start = $("#start");
let selection = $("#selection");
let selectRole = $("#selectRole");
let game = $("#game");
let startButton = $("#startButton");
let selectionButton = $("#selectionButton");
let firstName = $("#firstName");
let lastName = $("#lastName");
let playerInfo = $("#playerInfo");
let dayCount = $("#dayCount");
let playerNameDisplay = $("#playerNameDisplay");
let playerRoleDisplay = $("#playerRoleDisplay");
let playersDisplay = $("#playersDisplay");
let support = $("#support");
let accuse = $("#accuse");
let abstain = $("#abstain");
let advance = $("#advance");
let messages = $("#messages");

//Game Values
let killed;
let suspected;
//0 is out of the game, 1 is ready for night, 2 is nighttime
//3 is messages, 4 is accusations, 5 is voting, 6 is hanging
let state = 0;

//Names
let firstNames = ["Ismael", "Jo", "Wilbert", "Edwardo", "Cassandra", "Jame", "Carmine", "Hans", "Janine", "Marva"];
let lastNames = ["Collins", "Singleton", "Palmer", "Sloan", "Cardenas", "Kent", "Hurley", "Marks", "Avila", "Aguilar"];
let profileNames = ["profile0", "profile1", "profile2", "profile3", "profile4", "profile5"];
let players = [profile0, profile1, profile2, profile3, profile4];
let alivePlayers = [];

let roles = ["Sheriff", "Mafia", "Civilian", "Civilian", "Civilian"];
let allRoles = ["Sheriff", "Mafia", "Civilian", "Assassin", "Bodyguard", "Candlemaker", "Minotaur", "Woodsman"]
let timeState = "Day";
let daysPassed = 1;
let playersText;
let turn = 4;

//Player values
let accusing = false;
let supporting = false;
let playerTargets;
let playerCanAccuse = false;
let playerVoted = [];

//Functions

//Starts the game
function gameStart(){
  state = 1;
  
  //Making the players and assigning their attributes
  roles.splice(roles.indexOf(selectRole.val()), 1);
  players.forEach((profile, index) => {
    profile.number = index;
    profile.status = 1;
    profile.accusations = 0;
    profile.guilties = 0;
    profile.protection = 0;
    profile.uses = 0;
    profile.lastTarget = -1;
    profile.revealed = false;
    if (index === 0){
      profile.firstName = firstName.val();
      profile.lastName = lastName.val();
      profile.fullName = profile.firstName + " " + profile.lastName;
      profile.role = selectRole.val();
      profile.trait = undefined;
    } else{
      profile.firstName = firstNames.splice(randomNumber(firstNames.length), 1)[0];
      profile.lastName = lastNames[randomNumber(lastNames.length)];
      profile.fullName = profile.firstName + " " + profile.lastName;
      profile.role = roles.splice(randomNumber(roles.length), 1)[0];
    }
  });
  
  //Displays the game for the player
  playerNameDisplay.text(profile0.firstName + " " + profile0.lastName);
  playerRoleDisplay.text(profile0.role);
  dayCount.text(timeState + " " + daysPassed);
  players.forEach((player, index) => {
    let playersText = `<div id = "player${index}" class = "player"><p id = "profile${index}" class = "profile">${player.fullName}${index === 0 ? " (You)" : ""}</p><p id = role${index}" class = "role"></div>`;
    playersDisplay[0].innerHTML += playersText;

  });
  
  console.log(players);
}

//Changes the time when advancing
function changeTime(){
  if (timeState == "Day"){
    timeState = "Night";
    dayCount.text("Night" + ": " + daysPassed);
  } else {
    timeState = "Day";
    dayCount.text("Day" + ": " + (daysPassed += 1));
  }
}

//Gets a random Number
function randomNumber(max, min = 0){
  return Math.floor(Math.random() * max + min);
}

//Resets everyone's accusations on a new day
function resetAccusations() {
  players.forEach(profile => {
    profile.accusations = 0;
  });
}

//Allows the bots to decide their accusations
// function discuss(profile) {
  
//   console.log(profile, "discussing");
//   let order = [0, 1, 2, 3, 4];
//   order.splice(profile.number, 1);
//   let possibleVictims = [];
//   order.forEach(val => {
//     possibleVictims.push(val);
//   });
//   possibleVictims = removeDeadFromOptions(possibleVictims);
//   possibleVictims = shuffleOrder(possibleVictims);
//   console.log(possibleVictims);
// }

function showAbilities() {
  
}

// function doAbilities() {
//   players.forEach(profile => {
//     if (profile.number === 0) {
//       if (profile.role == "Mafia" && playerTargets !== undefined) {
//         mafiaKills(playerTargets);
//         messages.text(`You killed ${playerTargets.firstName}.`);
//         killed = playerTargets;
//       } else if (profile.role == "Sheriff" && playerTargets !== undefined) {
//         messages.text(`${playerTargets.firstName} is a ${sheriffInvestigates(playerTargets)}.`);
//       } else {
//         messages.text("You did nothing today.");
//       }
//     } else {
//       if (profile.role == "Mafia" && profile.status == 1) {
//         let order = players.map(profile => {
//           return profile.number;
//         });
//         order.splice(profile.number, 1);
//         order = shuffleOrder(order);
//         order = removeDeadFromOptions(order);
//         console.log(order);
//         let kill;
//         if (kill === undefined) {
//           kill = players[order[0]];
//         }
//         killed = kill;
//         if (kill.number === 0) {
//           killed = undefined;
//           profile.trust[kill.number] = 0;
//         } else {
//           mafiaKills(kill);
//         }
//       } else if (profile.role == "Sheriff" && profile.status == 1) {
//         let order = players.map(profile => {
//           return profile.number;
//         });
//         order.splice(profile.number, 1);
//         order = shuffleOrder(order);
//         order = removeDeadFromOptions(order);
//         console.log(order);
//         let investigate;
//         if (investigate === undefined) {
//           investigate = players[order[0]];
//         }
//         console.log(investigate);
//         let role = sheriffInvestigates(investigate);
        
//       }
//     }
//   });
//   console.log(players);
// }

function mafiaKills(victim) {
    if (victim.protection < 1) {
        victim.status = 0;
    } else {
        console.log("Mafia's victim was protected")
        //showFailMessage
    }
}

function sheriffInvestigates(suspect) {
  var message;
  var role = suspect.role;
  if (role == "Mafia" || role == "Minotaur") {
    message = "mafia"
  } else {
    message = "innocent"
  }
  return message
}

function assassinKills(assassin, victim) {
    if (assassin.uses > 0) {
        assassin.uses = 0;
        if (victim.protection < 1) {
            victim.status = 0;
        } else {
            console.log("assassin's victim was protected");
        }
    }
}

function bodyguardProtects(bodyguard, target) {
    if (target.protection < 1) {
        target.protection = 1;
    }
    bodyguard.lastTarget = target;
}

function changeAdvanceAction() {
  advance.text("Advance");
  if (playerTargets !== undefined && state == 2) {
    advance.text(profile0.role == "Mafia" ? "Kill" : "Investigate");
  } else if (playerTargets === undefined && state == 2) {
    advance.text("Do nothing");
  }
}

function shuffleOrder(order) {
  let shuffledOrder = [];
  while (shuffledOrder.length != order.length) {
    let number = order[randomNumber(order.length)];
    if (shuffledOrder.indexOf(number) == -1) {
      shuffledOrder.push(number);
    }
  }
  return shuffledOrder;
}

function announcements() {
  state = 3;
  if (killed === undefined) {
    messages.text("No one died tonight");
    setTimeout(() => {
      messages.text("It will be time for accusations now");
      state = 3;
      startAccusations();
    }, 5000);
  } else {
    messages.text(`${killed.fullName} died tonight. Their role was ${killed.role}`);
    resetPlayerDisplays();
    setTimeout(() => {
      messages.text("It will be time for accusations now");
      state = 3;
      startAccusations();
    }, 5000);
  }
}

function startAccusations() {
  state = 4;
  let playersAvaliable = players.slice(1);
  playersAvaliable = removeDeadFromOptions(playersAvaliable);
  console.log(playersAvaliable);
  let startDiscussing = setInterval(() => {
    if (playersAvaliable[0] === undefined) {
      playerCanAccuse = true;
      messages.text("Who do you accuse or support, " +  profile0.fullName);
      clearInterval(startDiscussing);
    } else {
      discuss(playersAvaliable[0]);
      playersAvaliable.splice(0, 1);
    }
  }, 5000);
}

function countAccusations() {
  suspected = [];
  players.forEach(profile => {
    if (profile.accusations >= 1) {
      suspected.push(profile);
    }
  });
  return suspected;
}

function countVotes() {
  let alive = players.filter(profile => {
    return profile.status == 1;
  });
  let neededVotes = Math.round(alive.length / 2);
  let highestVoted = 0;
  let tie = false;
  let highest = [];
  let hangedPeople = suspected.forEach(suspect => {
    if (suspect.guilties > highestVoted) {
      tie = false;
      highestVoted = suspect.guilties;
      highest = [suspect];
    } else if (suspect.guilties == highestVoted) {
      highest.push(suspect);
      tie = true;
    }
  });
  displayVotes();
  if (hangedPeople.length === 0) {
    messages.text("No one has enough votes to get hung.");
  } else {
    if (tie) {
      
    }
    state = 6;
    messages.text("Some people will be hanged today. Their roles are revealed.");
    hangGuilties(hangedPeople);
  }
  setTimeout(() => {
      messages.text("You can now go to sleep.");
      state = 1;
    }, 5000);
  resetPlayerDisplays();
}

//Displays the amount of guilties suspected people got
function displayVotes() {
  suspected.forEach(suspect => {
    let html = $(playersDisplay.children()[suspect.number]);
    html.text(suspect.fullName + ": Votes - " + suspect.guilties);
  });
}

function hangGuilties(guilties) {
  guilties.forEach(guilty => {
    guilty.status = 0;
    let html = $(playersDisplay.children()[guilty.number]);
    html.text(guilty.fullName + ": " + guilty.role);
  });
}

function allowVoting() {
  state = 5;
  let suspected = countAccusations();
  if (suspected.length === 0) {
    messages.text("No one has enough accusations to be voted up.");
    setTimeout(() => {
      messages.text("You can now advance into night");
      state = 1;
    }, 5000);
  } else {
    let suspectedNames = suspected.map(profile => {
      return profile.fullName;
    });
    messages.text("The people who are on the stand are: " + suspectedNames.join(",") + ". Vote wisely.");
    if (suspected.length == 1) {
      if (suspected[0].number === 0) {
        setTimeout(() => {
          vote();
          countVotes();
        }, 5000);
      }
    }
    suspected.forEach(suspect => {
      let html = $(playersDisplay.children()[suspect.number]);
      html.css("background-color", "orange");
      html.text(html.text() + ": On Stand");
    });
  }
}

// function vote() {
  
// }

function playerVotes(suspect, action) {
  let suspectId = suspect.number;
  let suspectedIds = suspected.map(suspect => {
    return suspect.number;
  });
  
  if (suspectedIds.includes(suspectId) && !playerVoted.includes(suspectId)) {
    switch(action) {
      case "guilty":
        suspect.guilties += 1;
        break;
      case "innocent":
        suspect.guilties -= 1;
        break;
      case "abstain":
        break;
    }
    playerVoted.push(suspect.number);
  }
  if (playerVoted.length == suspected.length || (suspectedIds.indexOf(0) != -1 && playerVoted.length == suspected.length - 1)) {
    vote();
    countVotes();
  }
}

function removeDeadFromOptions(arr) {
  let copyArr = arr.filter(profile => {
    if (typeof profile === "object") {
      return profile.status == 1;
    } else if (typeof profile == "number") {
      return players[profile].status == 1;
    }
  });
  console.log(copyArr);
  return copyArr;
}

function resetPlayerDisplays() {
  players.forEach(profile => {
    
    let html = $(playersDisplay.children()[profile.number]);
    let deadColor = "rgb(255, 0, 0)";
    
    if (profile.status === 0 && (state != 2 || html.css("background-color") == deadColor)) {
      html.css("background-color", "red");
      html.text(profile.fullName + ": " + profile.role);
    } else {
      html.text(profile.fullName);
      html.css("background-color", "inherit");
    }
    if (profile.number === 0) {
      html.text(html.text() + " (You)");
    }
  });
  if (suspected !== undefined && state == 5) {
    suspected.forEach(suspect => {
      let html = $(playersDisplay.children()[suspect.number]);
      html.css("background-color", "orange");
      html.text(html.text() + ": On Stand");
    });
  }
}

function candlemakerReveals(target) {
  let index = target.number;
  let roleDisplay = $("#role" + index);
  target.revealed = true;
  //roleDisplay[0].style = "opacity: 0";
}

// function playerAccuses( accused) {
// }

// function playerSupports(supported) {
// }

//Click Events
advance.click(function() {
  if (state == 1) {
    updateAlivePlayers();
    state = 2;
    changeTime();
    resetAccusations();
    killed = undefined;
    playerTargets = undefined;
    resetPlayerDisplays();
    if (profile0.role == "Mafia") {
      if (daysPassed == 1) {
        messages.text("You cannot kill on the first night. Advance to the next day.");
      } else {
        messages.text("Choose a person to kill.");
      }
    } else if (profile0.role == "Sheriff") {
      messages.text("Choose a person to investigate");
    }
    startPassiveNightAbilities();
  } else if (state == 2) {
    doAbilities();
    playerTargets = undefined;
    resetPlayerDisplays();
    state = 3;
    setTimeout(() => {
      changeTime();
      announcements();
    }, 5000);
    updateAlivePlayers
  }
  changeAdvanceAction();
});

function startPassiveNightAbilities() {
    var allLivingPlayers = alivePlayers.length;
    for (let i = 0; i < players.length; i ++) {
        let player = players[i];
        let role = player.role;
        if (role == "Woodsman") {
            var firstIndex = (allLivingPlayers - 1) % allLivingPlayers
            var neighbours = [allLivingPlayers[firstIndex], allLivingPlayers[i + 1]]
            if (neighbours[0].role == "Civilian" || neighbours[1].role == "Civilian") {
                player.protection = 1;
            }
        } else if (role == "Minotaur") {
            player.protection = 1;
        }
    }
}

function triggerLynchingAbilities(lynched) {
    if (lynched.role == "Candlemaker") {
        candlemakerReveals();
    }
}

playersDisplay.click(event => {
  console.log(event.target);
  resetPlayerDisplays();
  playerTargets = undefined;
  let person = $(event.target).attr("id");
  let profile = players[profileNames.indexOf(person)];
  if (person != "playersDisplay"
  && ((state == 2 && 
  ((profile0.role == "Mafia" && daysPassed != 1) ||
  profile0.role == "Sheriff")) || 
  (state == 4 && playerCanAccuse) || state == 5) 
  && profile.status == 1 && profile.number !== 0) {
    playerTargets = profile;
    $(event.target).css("background-color", "yellow");
  }
  
  changeAdvanceAction();
});

startButton.click(() => {start.toggle(); selection.css("display", "flex");});
selectionButton.click(() => {selection.toggle(); game.toggle(); gameStart()});

accuse.click(() => {
  if (state == 4 && playerCanAccuse && playerTargets !== undefined) {
    resetPlayerDisplays();
    playerAccuses(playerTargets);
    setTimeout(allowVoting, 5000);
  } else if (state == 5 && suspected.length > 0 && playerTargets !== undefined) {
    playerVotes(playerTargets, "guilty");
  }
});

support.click(() => {
  if (state == 4 && playerCanAccuse && playerTargets !== undefined) {
    resetPlayerDisplays();
    playerSupports(playerTargets);
    setTimeout(allowVoting, 5000);
  } else if (state == 5 && suspected.length > 0 && playerTargets !== undefined) {
    playerVotes(playerTargets, "innocent");
  }
});

abstain.click(() => {
  if (state == 4 && playerCanAccuse) {
    resetPlayerDisplays();
    playerTargets === undefined;
    messages.text(`${profile0.fullName}: I'll pass`);
    setTimeout(allowVoting, 5000);
  } else if (state == 5 && suspected.length > 0 && playerTargets !== undefined) {
    playerVotes(playerTargets, "abstain");
  }
});

function updateAlivePlayers() {
    alivePlayers = players.filter(profile => {
        return profile.status == 1;
      });
}

function checkEndGame() {
    updateAlivePlayers();
  let roles = alivePlayers.map(profile => {
    return profile.role;
  });
  if (profile0.status === 0) {
    state = 0;
    if (profile0.role == "Mafia") {
      messages.text("You lost. The town won.");
    } else if (profile0.role == "Sheriff") {
      messages.text("You lost. The mafia won.");
    }
  } else if (!roles.includes("Mafia")) {
    state = 0;
    messages.text("The mafia died. You won!");
  } else if (alivePlayers.length <= 2) {
    state = 0;
    if (profile0.role == "Mafia") {
      messages.text("There are too little players. You won!");
    } else if (profile0.role == "Sheriff") {
      messages.text("There are too little players. You lost.");
    }
  }
}
