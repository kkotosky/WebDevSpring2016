(function(){
    angular
        .module("KevinSporcleApp")
        .controller("QuizController", QuizController);

    function QuizController($location, $rootScope, QuizService, $routeParams) {
        var id = $routeParams.quizId;
        var totalAnswered = 0;
        $rootScope.numRows = 0;
        $rootScope.numCols = 0;
        $rootScope.input = {answer:""};
        QuizService.getFullQuiz(id).then(function(resp){
            $rootScope.quiz = resp.data[0];
            convertQuizzesToArrays();
            if ($rootScope.quiz.multi) {
                convertQuestionsToArrays();
                $rootScope.question = {current : $rootScope.quiz.questions[0][0][0]};
                $rootScope.answer = {current : $rootScope.quiz.answers[0][0][0]};
            }
            setDisplayValues();
        });
        $rootScope.getArray = function(num) {
            return new Array(num);
        };
        $rootScope.getSection = function(i,j) {
            return $rootScope.quiz.answers[j][i];
        };
        $rootScope.getHeader = function(col,row) {
            return row==1 ? $rootScope.headers[(row+col)+$rootScope.quiz.columns-1] : $rootScope.headers[(row+col)];
        };

        $rootScope.activateQuestion= function($event, row,col,num) {
            var actives = $('.active_question')[0];
            if (actives){
                $(actives).removeClass('active_question');
            }
            $rootScope.question ={ current : $rootScope.quiz.questions[row][col][num]};
            $rootScope.answer ={ current : $rootScope.quiz.answers[row][col][num]};
            $($event.currentTarget).addClass('active_question');
        };
        $rootScope.getIdString = function(x,y,z){
            return ""+x+y+z;
        };
        $rootScope.enterValue = function(value){
            var found = false;
            var r = -1;
            var r2 = -1;
            var r3 = -1;
            if (!$rootScope.quiz.multi || value == $rootScope.answer.current){
                for (var i = 0; i< $rootScope.quiz.answers.length; i++ ) {
                    $rootScope.quiz.displayAnswers.push([]);
                    for (var j = 0; j< $rootScope.quiz.answers[i].length; j++ ) {
                        $rootScope.quiz.displayAnswers[i].push([]);
                        for (var y = 0; y< $rootScope.quiz.answers[i][j].length; y++ ) {
                            if (value === $rootScope.quiz.answers[i][j][y] &&
                                $rootScope.quiz.displayAnswers[i][j][y] != value) {
                                $rootScope.quiz.displayAnswers[i][j][y] = value;
                                $rootScope.input.answer = "";
                                found = true;
                                totalAnswered++;
                            }
                            if ($rootScope.quiz.displayAnswers[i][j][y] === "?????????????????????" && r === -1) {
                                r = i;
                                r2=j;
                                r3=y;
                            }
                        }
                    }
                }
            }
            if (found && $rootScope.quiz.multi) {
                var actives = $('.active_question')[0];
                if (actives){
                    $(actives).removeClass('active_question');
                }
                $rootScope.question ={ current : $rootScope.quiz.questions[r][r2][r3]};
                $rootScope.answer ={ current : $rootScope.quiz.answers[r][r2][r3]};
                $('#'+r+r2+r3).addClass('active_question');
            }
        };
        $rootScope.getRowClass= function(numRows) {
            if(numRows === 1) {
                return "col-md-12";
            } else if (numRows === 2) {
                return "col-md-6";
            } else if (numRows === 3) {
                return "col-md-4";
            } else {
                return "col-md-3";
            }
        };
        setDisplayValues = function(){
            $rootScope.quiz.displayAnswers = [];
            for (var i = 0; i< $rootScope.quiz.answers.length; i++ ) {
                $rootScope.quiz.displayAnswers.push([]);
                for (var j = 0; j< $rootScope.quiz.answers[i].length; j++ ) {
                    $rootScope.quiz.displayAnswers[i].push([]);
                    for (var y = 0; y< $rootScope.quiz.answers[i][j].length; y++ ) {
                        $rootScope.quiz.displayAnswers[i][j].push("?????????????????????");
                    }
                }
            }
        };
        convertQuizzesToArrays = function() {
            $rootScope.quiz.answers = [];
            var isTwoRows = false;
            $rootScope.quiz.answers.push([]);
            if ($rootScope.quiz.rows == 2) {
                $rootScope.quiz.answers.push([]);
                isTwoRows = true;
            }
            if ($rootScope.quiz.columns >= 1) {
                $rootScope.quiz.answers[0].push($rootScope.quiz.answers1);
                if (isTwoRows) {
                    $rootScope.quiz.answers[1].push([$rootScope.quiz.answers5]);
                }
            }
            if ($rootScope.quiz.columns >= 2) {
                $rootScope.quiz.answers[0].push($rootScope.quiz.answers2);
                if (isTwoRows) {
                    $rootScope.quiz.answers[1].push($rootScope.quiz.answers6);
                }
            }
            if ($rootScope.quiz.columns >= 3) {
                $rootScope.quiz.answers[0].push($rootScope.quiz.answers3);
                if (isTwoRows) {
                    $rootScope.quiz.answers[1].push($rootScope.quiz.answers7);
                }
            }
            if ($rootScope.quiz.columns == 4) {
                $rootScope.quiz.answers[0].push($rootScope.quiz.answers4);
                if (isTwoRows) {
                    $rootScope.quiz.answers[1].push($rootScope.quiz.answers8);
                }
            }
        };
        convertQuestionsToArrays = function() {
            $rootScope.quiz.questions = [];
            var isTwoRows = false;
            $rootScope.quiz.questions.push([]);
            if ($rootScope.quiz.rows == 2) {
                $rootScope.quiz.questions.push([]);
                isTwoRows = true;
            }
            if ($rootScope.quiz.columns >= 1) {
                $rootScope.quiz.questions[0].push($rootScope.quiz.questions1);
                if (isTwoRows) {
                    $rootScope.quiz.questions[1].push($rootScope.quiz.questions5);
                }
            }
            if ($rootScope.quiz.columns >= 2) {
                $rootScope.quiz.questions[0].push($rootScope.quiz.questions2);
                if (isTwoRows) {
                    $rootScope.quiz.questions[1].push($rootScope.quiz.questions6);
                }
            }
            if ($rootScope.quiz.columns >= 3) {
                $rootScope.quiz.questions[0].push($rootScope.quiz.questions3);
                if (isTwoRows) {
                    $rootScope.quiz.questions[1].push($rootScope.quiz.questions7);
                }
            }
            if ($rootScope.quiz.columns == 4) {
                $rootScope.quiz.questions[0].push($rootScope.quiz.questions4);
                if (isTwoRows) {
                    $rootScope.quiz.questions[1].push($rootScope.quiz.questions8);
                }
            }
        };
    }
})();