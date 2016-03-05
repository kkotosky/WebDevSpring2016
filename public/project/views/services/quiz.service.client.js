(function(){
    angular
        .module("KevinSporcleApp")
        .factory("QuizService",QuizService);

    function QuizService($http, $q) {

        var userQuizzes = [
            {title:"Star Wars Planets",
                _id: "1",
                description:"Name the star wars planets featured in the original trilogy?",
                creator:"123"
            },
            {title:"Boston T Stops",
                _id: "2",
                description:"Name the T stops based upon line color?",
                creator:"123"},
            {title:"Super Hero Identities",
                _id: "3",
                creator:"234",
                description:"Name the heroes secret identities"}
        ];
        var popQuizzes = [
            {title:"151 Pokemon",
                _id: "4",
                creator:"456",
                description:"Caught 'em all? Super! Now and name em all!"},
            {title:"NFL Teams",
                _id: "5",
                creator:"678",
                description:"Can you name all of the teams in the National Football League?"},
            {title:"Injustice Characters",
                _id: "6",
                creator:"888",
                description:"Can you name the playable characters in Injustice: Gods among us?"}
        ];

        var nflQuiz = {
            _id:"5",
            title:"NFL Teams",
            multi:false,
            question: "Name all the NFL teams",
            headers: ['AFC east', 'AFC west', 'AFC north', 'AFC south',
                'NFC east','NFC west', 'NFC north', 'NFC south'],
            columns: 4,
            rows: 2,
            answers: [[['patriots', 'dolphins','jets','bills'],
                ['Broncos','Chargers','Chiefs','Radiers'],
                ['Ravens','Steelers','Bengals','Browns'],
                ['Colts','Texans','Jaguars','Titans']],
                [['Eagles','Giants','Cowboys','Redskins'],
                ['cardinals','seahawks','rams','49ers'],
                ['vikings','packers','lions','bears'],
                ['panthers','falcons','saints','buccaneers']]]
        };

        var injusticeQuiz = {
            _id:"6",
            multi:false,
            title:"Injustice Characters",
            question: "Name all of the characters in injustice gods among us",
            headers: ['Heroes', 'Villians'],
            columns: 2,
            rows: 1,
            answers: [[
                ['flash', 'nightwing', 'batman', 'cyborg', 'green arrow', 'superman', 'martian manhunter',
                    'raven', 'aquaman', 'wonder woman' , 'batgirl', 'hawkgirl', 'shazam', 'green lantern',
                    'zatanna'],
                ['lobo', 'joker', 'harley quinn', 'soloman grundy', 'zod', 'lex luthor', 'catwoman',
                    'deathstroke', 'scorpion', 'killer frost' , 'doomsday', 'bane', 'black adam', 'sinestro',
                    'ares']
                ]
            ]
        };

        var herosQuiz = {
            _id:"3",
            title:"Super Hero Identities",
            multi:true,
            questions: ['Clark Kent','Bruce Wayne','Diana Prince', 'Arhur Curry', 'Hal Jordan', 'Dick Grayson'],
            showQuestionsNextToAnswers: false,
            columns:1,
            rows:1,
            answers : [
                'superman','batman','wonder woman','aquaman','green lantern','nightwing',''
            ]
        };

        var herosQuiz2 = {
            _id:"",
            multi:true,
            questions: ['Clark Kent','Bruce Wayne','Diana Prince', 'Arhur Curry', 'Hal Jordan', 'Dick Grayson'],
            showQuestionsNextToAnswers: true,
            columns:1,
            rows:1,
            answers : [
                'superman','batman','wonder woman','aquaman','green lantern','nightwing',''
            ]
        };

        var fullQuizzes = [injusticeQuiz, herosQuiz, nflQuiz];

        var allQuizzes = userQuizzes.concat(popQuizzes);

        function generateUUID() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var api = {
            getPopQuizzes: getPopQuizzes,
            getUserQuizzes: getUserQuizzes,
            getQuiz: getQuiz,
            searchQuizzes:searchQuizzes,
            getFullQuiz: getFullQuiz
        };
        return api;

        function getPopQuizzes () {
            var q = $q.defer();
            //GetSomeOfTopQuizzes
            q.resolve(popQuizzes);
            return q.promise;
        }
        function getUserQuizzes (id) {
            var q = $q.defer();
            //Get Some of Users Quizzes
            var tmp = [];
            for (var i = 0; i < allQuizzes.length; i++) {
                if (id === allQuizzes[i].creator) {
                    tmp.push(allQuizzes[i]);
                }
            }
            q.resolve(tmp);
            return q.promise;
        }
        function getQuiz (id) {
            var q = $q.defer();
            for (var i = 0; i < allQuizzes.length; i++) {
              if (id === allQuizzes[i]._id) {
                  q.resolve(allQuizzes[i])
              }
            }
            return q.promise;
        }
        function searchQuizzes (text) {
            var q = $q.defer();
            var titleTmp = [];
            var descriptTmp = []
            for (var i = 0; i < allQuizzes.length; i++) {
                if (allQuizzes[i].title.indexOf(text) >= 0) {
                    titleTmp.push(allQuizzes[i]);
                } else if (allQuizzes[i].description.indexOf(text) >= 0){
                    descriptTmp.push(allQuizzes[i]);
                }
            }
            q.resolve(titleTmp.concat(descriptTmp));
            return q.promise;
        };
        function getFullQuiz(id) {
            var q = $q.defer();
            for (var i = 0; i < fullQuizzes.length; i++) {
                if (id === fullQuizzes[i]._id) {
                    q.resolve(fullQuizzes[i]);
                }
            }
            return q.promise;
        }
        //Will Need to function to sort which are most relevant to user (i.e.) Popularity
    }
})();