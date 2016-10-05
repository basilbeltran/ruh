'use strict';

angular.module("SessionApp")
  .controller('qController', questionController);

function questionController(){
  var main = this;
  main.message = "RU Stuck?";

  main.questions = [
    { "group":"sept-2016",
      "status":"yellow",
      "time": 0,
      "subject": "javascript",
      "subarea": "functions",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "textsIn":["1", "Is it ok?", "letter A"],
      "textsOut":["2", "ok thats fine", "letter B"],
      "question":"How do you decide where to merge the data for a composite view element like this? It must happen above angular because it needs to use ng-repeat. Since mongo is a document db I will proceed on the assumption that it all goes into one big document. But that is silly. User info is certainly in its own table. Right?"
    },
    { "group":"sept-2016",
      "status":"red",
      "time": 600,
      "subject": "dev-ops",
      "subarea": "bash",
      "user":"basil.beltran@tinkermill.org",
      "textsIn":["3", "Turtles", "letter C"],
      "textsOut":["4", "All the way down", "letter D"],
      "question":"how do I migrate from cloud9 to a local dev environment"
    },
    { "group":"sept-2016",
      "status":"orange",
      "time": 240,
      "subject": "css",
      "subarea": "bootstrap",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "textsIn":["5", "You wana go?", "letter E"],
      "textsOut":["6", "ok lets go", "letter F"],
      "question":"How many turtles are there?"
    }
  ] // end $scope.questions



  main.addQuestion = function(){
    main.questions.push({
      "group":"",     // derived from userId
      "status":"",   // derived programatically
      "time": "",      // derived proframatically
      "subject":"", // GET DROP CHOICE WORKING
      "subarea":"", // GET DROP CHOICE WORKING
      "user":"",          // derived proframatically
      "expert":"",      // assigned or choosen
        // "group":main.group,     // derived from userId
        // "status":main.status,   // derived programatically
        // "time": main.time,      // derived proframatically
        // "subject":main.subject, // GET DROP CHOICE WORKING
        // "subarea":main.subarea, // GET DROP CHOICE WORKING
        // "user":main.user,          // derived proframatically
        // "expert":main.expert,      // assigned or choosen
        "question":main.question
    });
  }

  main.categories = [
    {"subjectName": "JAVASCRIPT",
      "subAreas":["functions", "prototype", "scope", "this", "iteration", "modules"]
    },
    {"subjectName": "CSS",
      "subAreas":["selectors", "bootstrap"]
    },
    {"subjectName": "DEVOPS",
      "subAreas":["git", "bash", "c9"]
    },
    {"subjectName": "ANGULAR",
      "subAreas":["directives", "controller", "factory"]
    },
    {"subjectName": "MONGO",
      "subAreas":["mongoose", "sharding"]
    },
    {"subjectName": "NODE",
      "subAreas":["npm", "grunt"]
    }
  ] // end categories

  main.groups = [
    {"groupName": "sept-2016",
      "members":["basil", "JeffM", "JeffB", "Chris", "JustinD", "Justin"]
    },
    {"groupName": "aug-2016",
      "members":["Dylan", "Tim", "John"]
    }
  ] // end groups


  main.status = [
    {"color": "green",
      "message": ""}

  ]

} //mainController
