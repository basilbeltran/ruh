
stub = {};
stub.questions = [
  { "qUUID":"qweweqwewe",
    "qGroupID":"aaaaaaaaaa",
    "qStatus":"yellow",
    "qInTime": 0,
    "qSubject": "javascript",
    "qUserID":"11111",
    "qHelpers":"22222",
    "qComments":[
      {myUUID:"11111", myText:"Is it ok?"},
      {myUUID:"22222", myText:"It's just fine"}
    ],
    "qText":"where to merge the data, above angular because it needs to use ng-repeat. Since mongo is a document db I will proceed on the assumption that it all goes into one big document. But that is silly. User info is certainly in its own table. Right?"
  },
  { "qUUID":"12345qwewe",
    "qGroupID":"bbbbbbbbbb",
    "qStatus":"red",
    "qInTime": 600,
    "qSubject": "dev-ops",
    "qUserID":"22222",
    "qHelpers":"22222",
    "qComments":[
      {myUUID:"22222", myText:"You a moron?"},
      {myUUID:"11111", myText:"Yes, I a moron."}
    ],
    "qText":"how do I migrate from cloud9 to a local"
  },
  { "qUUID":"55555qwewe",
    "qGroupID":"cccccccccc",
    "qStatus":"orange",
    "qInTime": 240,
    "qSubject": "css",
    "qUserID":"11111",
    "qHelpers":"22222",
    "qComments":[
      {myUUID:"11111", myText:"Is it a turtle?"},
      {myUUID:"22222", myText:"Lots and lots of turtles"}
    ],
    "qText":"How many turtles are there?"
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
