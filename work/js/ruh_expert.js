'use strict';

angular.module("MainApp", []);
angular.module("MainApp").controller('mainController', mainController);
mainController.$inject=['$scope'];

function mainController($scope){
  $scope.message = "here - we have acess to $scope";
  $scope.things = ['first', 'second', 'third', 'fourth'];

  $scope.questions = [
    { "group":"sept-2016",
      "status":"yellow",
      "time": 0,
      "subject": "javascript",
      "subarea": "functions",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "question":"How do you decide where to merge the data for a composite view element like this? It must happen above angular because it needs to use ng-repeat. Since mongo is a document db I will proceed on the assumption that it all goes into one big document. But that is silly. User info is certainly in its own table. Right?"
    },
    { "group":"sept-2016",
      "status":"red",
      "time": 600,
      "subject": "dev-ops",
      "subarea": "bash",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "question":"how do I migrate from cloud9 to a local dev environment"
    },
    { "group":"sept-2016",
      "status":"orange",
      "time": 240,
      "subject": "css",
      "subarea": "bootstrap",
      "user":"basil.beltran@tinkermill.org",
      "expert":"basil.beltran@tinkermill.org",
      "question":"How many turtles are there?"
    }
  ] // end $scope.questions

  console.dir($scope);

  $scope.addThing = function(){
    $scope.things.push($scope.newThing);
  }

} //mainController


var categories = [
  {"subjectName": "javascript",
    "subAreas":["functions", "prototype", "scope", "this", "iteration", "modules"]
  },
  {"subjectName": "css",
    "subAreas":["selectors", "bootstrap"]
  },
  {"subjectName": "css",
    "subAreas":["selectors", "bootstrap"]
  },
  {"subjectName": "dev-ops",
    "subAreas":["git", "bash", "c9"]
  },
  {"subjectName": "angular",
    "subAreas":["directives", "controller", "factory"]
  },
  {"subjectName": "mongo",
    "subAreas":["mongoose", "sharding"]
  },
  {"subjectName": "node",
    "subAreas":["npm", "grunt"]
  }
] // end categories
