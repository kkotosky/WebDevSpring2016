(function(){
    angular
        .module("KevinSporcleApp")
        .controller("CreateController", CreateController);

    function CreateController($location, $rootScope, QuizService, $cookies) {

        if (!$rootScope.loggedIn) {
            $rootScope.loggedIn = $cookies.get("loggedIn");
            $rootScope.currentUser = {
                username : $cookies.get("username"),
                firstName : $cookies.get("firstName"),
                lastName : $cookies.get("lastName"),
                email : $cookies.get("email"),
                _id : $cookies.get("id"),
                admin : $cookies.get("admin")
            };
            if (!$rootScope.loggedIn) {
                $location.url("/register");
            }
        }
        $rootScope.numAnswers = [[[0],[0],[0],[0]], [[0],[0],[0],[0]]];
        $('#question_type').val("single");
        $rootScope.create = {
            questionType : "single",
            numCols: "1",
            numRows:"1",
        };
        $rootScope.numColsChange = function (){
           if ($rootScope.create.numCols <= 0 ||
               $rootScope.create.numCols > 4 ) {
               $('#num_columns').removeClass('ng-valid');
               $('#num_columns').addClass('ng-invalid');
           } else {
               $('#num_columns').removeClass('ng-invalid');
               $('#num_columns').addClass('ng-valid');
           }
        };
        $rootScope.numRowsChange = function (){
            if ($rootScope.create.numRows <= 0 ||
                $rootScope.create.numRows > 2 ) {
                $('#num_rows').removeClass('ng-valid');
                $('#num_rows').addClass('ng-invalid');
            } else {
                $('#num_rows').removeClass('ng-invalid');
                $('#num_rows').addClass('ng-valid');
            }
        };
        $rootScope.getNumAnswers = function(row, column) {
            var a = [];
            for (var i= 0; i < $rootScope.numAnswers[row][column]; i++) {
                a.push(i);
            }
            return a;
        };
        $rootScope.getNumColumns = function(){
            var a2 = [];
            var numCols = parseInt($rootScope.create.numCols);
            for (var i= 0; i < numCols; i++) {
                a2.push(i);
            }
            return a2;
        };
        $rootScope.getNumRows = function(){
            var a = [];
            var x = parseInt($rootScope.create.numRows);
            for (var i= 0; i < x; i++) {
                a.push(i);
            }
            return a;
        };
        $rootScope.getColumnSpacing = function(x) {
            if (x === "1") {
                return "col-md-12"
            } else if (x==="2") {
                return "col-md-6"
            } else if (x === "3") {
                return "col-md-4"
            } else {
                return "col-md-3"
            }
        };
        $rootScope.increaseAnswerNumbers = function(row, col) {
            $rootScope.numAnswers[row][col].push($rootScope.numAnswers[row][col].length+1);
        };
        $rootScope.decreaseAnswerNumbers = function(row, col) {
            $rootScope.numAnswers[row][col]
                .splice(
                    $rootScope.numAnswers[row][col].length-1,
                    $rootScope.numAnswers[row][col].length
                );
        };
        $rootScope.getCreateBorderClasses = function (x){
            if (($rootScope.create.numRows == '1' || $rootScope.create.numRows == '2') && x == 1) {
                return "create_quiz_rows";
            } else if ($rootScope.create.numRows == '2' && x == 2) {
                return "create_quiz_rows";
            }
        };
        gatherAnswers = function() {
            var rows = $('.answer_inputs');
            var toReturnRows = [];
            for (var i = 0; i < $rootScope.create.numRows; i ++) {
                toReturnRows.push([]);
                for(var j = 0; j < $rootScope.create.numCols; j++) {
                    toReturnRows[i].push([]);
                    for (var y = 0; y < $rootScope.numAnswers[i][j].length; y++) {
                        toReturnRows[i][j].push($(rows[0]).find('.answer_input').val());
                        rows.splice(0,1);
                    }
                }
            }
            var tmp = {
                answers1: toReturnRows[0][0],
                answers2: toReturnRows[0][1],
                answers3: toReturnRows[0][2],
                answers4: toReturnRows[0][3]
            }
            if ($rootScope.create.numRows == '2') {
                tmp['answers5'] = toReturnRows[1][0];
                tmp['answers6'] = toReturnRows[1][1];
                tmp['answers7'] = toReturnRows[1][2];
                tmp['answer8'] = toReturnRows[1][3];
            }
            return tmp;
        };
        getQuestions = function() {
            var rows = $('.answer_inputs');
            var toReturnRows = [];
            for (var i = 0; i < $rootScope.create.numRows; i ++) {
                toReturnRows.push([]);
                for(var j = 0; j < $rootScope.create.numCols; j++) {
                    toReturnRows[i].push([]);
                    for (var y = 0; y < $rootScope.numAnswers[i][j].length; y++) {
                        toReturnRows[i][j].push($(rows[0]).find('.question_input').val());
                        rows.splice(0,1);
                    }
                }
            }
            var tmp =  {
                questions1: toReturnRows[0][0],
                questions2: toReturnRows[0][1],
                questions3: toReturnRows[0][2],
                questions4: toReturnRows[0][3]
            };
            if ($rootScope.create.numRows == '2') {
                tmp['questions5'] = toReturnRows[1][0];
                tmp['questions6'] = toReturnRows[1][1];
                tmp['questions7'] = toReturnRows[1][2];
                tmp['questions8'] = toReturnRows[1][3];
            }
            return tmp;
        };
        getHeaders = function() {
            var headers = $('.section_label');
            var toReturnHeaders = [];
            for(var i = 0; i < headers.length; i++) {
                toReturnHeaders.push($(headers[i]).val());
            }
            return toReturnHeaders;
        };
        getMetadata = function(fullQuiz) {
            return {
                _id: fullQuiz._id,
                description: fullQuiz.description,
                createdBy: fullQuiz.createdBy,
                title: fullQuiz.title
            }
        };
        $rootScope.finishQuiz = function(){
            var questions = getQuestions();
            var answers = gatherAnswers();
            var quiz = {
                title : $rootScope.create.title,
                createdBy: $rootScope.currentUser._id,
                description: $rootScope.create.quizDescription,
                columns: parseInt($rootScope.create.numCols),
                rows: parseInt($rootScope.create.numRows),
                multi : $rootScope.create.questionType === 'multi' ? true : false,
                question : $rootScope.create.singleQuestion,
                headers : getHeaders(),
                answers1: answers.answers1,
                answers2: answers.answers2,
                answers3: answers.answers3,
                answers4: answers.answers4,
                answers5: answers.answers5,
                answers6: answers.answers6,
                answers7: answers.answers7,
                answers8: answers.answers8,
                questions1: questions.questions1,
                questions2: questions.questions2,
                questions3: questions.questions3,
                questions4: questions.questions4,
                questions5: questions.questions5,
                questions6: questions.questions6,
                questions7: questions.questions7,
                questions8: questions.questions8
            };
            console.log(quiz);
            QuizService.makeFullQuiz(quiz).then(function(resp){
                QuizService.makeMetaQuizzes(getMetadata(resp.data)).then(function(resp) {
                    $location.url("/profile");
                }, function(err){
                    window.alert("Failed To Create");
                });
            }, function(err){
                window.alert("Failed to Create Quiz");
            });
        }
    }
})();