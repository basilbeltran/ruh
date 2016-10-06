
stub = {};
stub.questions = [
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

stub.categories = [
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

stub.groups = [
  {"groupName": "sept-2016",
    "members":["basil", "JeffM", "JeffB", "Chris", "JustinD", "Justin"]
  },
  {"groupName": "aug-2016",
    "members":["Dylan", "Tim", "John"]
  }
] // end groups


stub.qStatus = [ {"color": "green", "message": "its ok"} ]
