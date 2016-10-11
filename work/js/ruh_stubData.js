
stub = {};
stub.questions = [
  { "group":"aaaaaaaaaa",
    "myStatus":"yellow",
    "inTime": 0,
    "subject": "javascript",
    "user":"11111",
    "helpers":"22222",
    "comments":[
      {myUUID:"11111", myText:"Is it ok?"},
      {myUUID:"22222", myText:"It's just fine"}
    ],
    "question":"where to merge the data, above angular because it needs to use ng-repeat. Since mongo is a document db I will proceed on the assumption that it all goes into one big document. But that is silly. User info is certainly in its own table. Right?"
  },
  { "group":"bbbbbbbbbb",
    "myStatus":"red",
    "inTime": 600,
    "subject": "dev-ops",
    "user":"22222",
    "helpers":"22222",
    "comments":[
      {myUUID:"22222", myText:"You a moron?"},
      {myUUID:"11111", myText:"Yes, I a moron."}
    ],
    "question":"how do I migrate from cloud9 to a local"
  },
  { "group":"cccccccccc",
    "myStatus":"orange",
    "inTime": 240,
    "subject": "css",
    "user":"11111",
    "expert":"basil.beltran@tinkermill.org",
    "helpers":"22222",
    "comments":[
      {myUUID:"11111", myText:"Is it a turtle?"},
      {myUUID:"22222", myText:"Lots and lots of turtles"}
    ],
    "question":"How many turtles are there?"
  }
] // end $scope.questions


stub.usersData = [
    {
        email: "basil.beltran@gmail.com",
        password: "12345678",
        expertise: ["javascript", "devops"]
    },
    {
        email: "basil.beltran@tinkermill.org",
        password: "asdf09",
        expertise: ["css", "node"]
    },
];


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
    "myUUID":"aaaaaaaaaa"
  },
  {"groupName": "aug-2016",
    "myUUID":"bbbbbbbbbb"
  }
] // end groups


stub.myStatus = [
  {
    "color": "green",
    "message": "question is answered"
  },
  {
    "color": "red",
    "message": "user put on hold"
  },
  {
    "color": "orange",
    "message": "question is queued"
  },
  {
    "color": "yellow",
    "message": "answer in progress"
  }
]
