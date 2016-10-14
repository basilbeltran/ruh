
stub = {};
stub.questions = [
  { "qUUID":"qweweqwewe",
    "qStatus":"yellow",
    "qSubject": "javascript",
    "qUserID":"11111",
    "qInterested":["22222", "11111"],
    "qComments":["5555555555", "6666666666"],
    "qText":"where to merge the data, above angular because it needs to use ng-repeat. Since mongo is a document db I will proceed on the assumption that it all goes into one big document. But that is silly. User info is certainly in its own table. Right?"
  },
  { "qUUID":"12345qwewe",
    "qStatus":"red",
    "qSubject": "dev-ops",
    "qUserID":"22222",
    "qInterested":["22222", "11111"],
    "qComments":["3333333333", "4444444444"],
    "qText":"how do I migrate from cloud9 to a local"
  },
  { "qUUID":"55555qwewe",
    "qStatus":"orange",
    "qSubject": "css",
    "qUserID":"11111",
    "qInterested":["22222", "11111"],
    "qComments":["1111111111", "2222222222"],
    "qText":"How many turtles are there?"
  }
] // end $scope.questions


stub.usersData = [
    {
        uEmail: "basil.beltran@gmail.com",
        uPassword: "12345678",
        uExpertise: ["javascript", "devops"],
        uUUID: "22222"
    },
    {
        uEmail: "basil.beltran@tinkermill.org",
        uPassword: "asdf09",
        uExpertise: ["css", "node"],
        uUUID: "11111"
    },
];


stub.comments = [
  {
    cUUID:"1111111111",
    cUserID:"11111",
    cTopic:"55555qwewe",
    cText:"How many turtles?"
  },
  {cUUID:"2222222222", cUserID:"22222", cTopic:"55555qwewe", cText:"Lots and lots of turtles"},
  {cUUID:"3333333333", cUserID:"22222", cTopic:"12345qwewe", cText:"Me a moron?"},
  {cUUID:"4444444444", cUserID:"11111", cTopic:"12345qwewe", cText:"Yes, I a moron."},
  {cUUID:"5555555555", cUserID:"11111", cTopic:"qweweqwewe", cText:"Is it ok?"},
  {cUUID:"6666666666", cUserID:"22222", cTopic:"qweweqwewe", cText:"It's just fine"}
]




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
  {"gName": "sept-2016",
    "gUUID":"aaaaaaaaaa"
  },
  {"gName": "aug-2016",
    "gUUID":"bbbbbbbbbb"
  }
] // end groups


stub.status = [
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
