(function(){
    angular
        .module("KevinSporcleApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope) {
        $rootScope.userQuizzes = [
            {title:"Star Wars Planets",
                description:"Name the star wars planets featured in the original trilogy?"},
            {title:"Boston T Stops",
                description:"Name the T stops based upon line color?"},
            {title:"WWII People",
                description:"Name the important people of World War II?"}
        ];
        $rootScope.priorQuizzes = [
            {title:"151 Pokemon",
                description:"Caught 'em all? Now name em all!"},
            {title:"NFL Teams",
                description:"Can you name all of the teams in the National Football League?"},
            {title:"Super Hero Secret Identities",
                description:"Can you name the secret identities of these DC superheros?"}
        ];
        $rootScope.takeQuiz = function(quiz) {
            console.log("take " + quiz);
        }
        $rootScope.editQuiz = function (quiz) {
            console.log("Edit "+ quiz);
        }
    }
})();