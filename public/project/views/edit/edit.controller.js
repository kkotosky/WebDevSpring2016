(function(){
    angular
        .module("KevinSporcleApp")
        .controller("EditController", EditController);

    function EditController($location, $rootScope, QuizService, $cookies, $routeParams) {

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
        if ($rootScope.loggedIn) {
            QuizService.getFullQuiz($routeParams.quizId).then(function (resp) {
                $rootScope.edit = resp.data[0];
                $rootScope.numAnswers = [[[0],[0],[0],[0]], [[0],[0],[0],[0]]];
                convertQuestionsToArrays();
                convertQuizzesToArrays();
                console.log($rootScope.edit);
                if ($rootScope.edit.multi) {
                    $rootScope.edit.questionType = 'multi';
                } else {
                    $rootScope.edit.questionType = 'single';
                }
                $('#question_type').val("single");
                $rootScope.numColsChange = function (){
                    if ($rootScope.edit.columns <= 0 ||
                        $rootScope.edit.columns > 4 ) {
                        $('#num_columns').removeClass('ng-valid');
                        $('#num_columns').addClass('ng-invalid');
                    } else {
                        $('#num_columns').removeClass('ng-invalid');
                        $('#num_columns').addClass('ng-valid');
                    }
                };
                $rootScope.numRowsChange = function (){
                    if ($rootScope.edit.rows <= 0 ||
                        $rootScope.edit.rows > 2 ) {
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
                    var numCols = $rootScope.edit.columns;
                    for (var i= 0; i < numCols; i++) {
                        a2.push(i);
                    }
                    return a2;
                };
                $rootScope.getNumRows = function(){
                    var a = [];
                    var x = $rootScope.edit.rows;
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
                    if (($rootScope.edit.rows == 1 || $rootScope.edit.rows == 2) && x == 1) {
                        return "create_quiz_rows";
                    } else if ($rootScope.edit.rows == 2 && x == 2) {
                        return "create_quiz_rows";
                    }
                };
                gatherAnswers = function() {
                    var rows = $('.answer_inputs');
                    var toReturnRows = [];
                    for (var i = 0; i < $rootScope.edit.rows; i ++) {
                        toReturnRows.push([]);
                        for(var j = 0; j < $rootScope.edit.columns; j++) {
                            toReturnRows[i].push([]);
                            for (var y = 0; y < $rootScope.edit.answers[i][j].length; y++) {
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
                    if ($rootScope.edit.rows == 2) {
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
                    for (var i = 0; i < $rootScope.edit.rows; i ++) {
                        toReturnRows.push([]);
                        for(var j = 0; j < $rootScope.edit.columns; j++) {
                            toReturnRows[i].push([]);
                            for (var y = 0; y < $rootScope.edit.answers[i][j].length; y++) {
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
                    if ($rootScope.edit.rows == 2) {
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
                $rootScope.updateQuiz = function(){
                    var questions = getQuestions();
                    var answers = gatherAnswers();
                    var quiz = {
                        _id: $rootScope.edit._id,
                        title : $rootScope.edit.title,
                        createdBy: $rootScope.currentUser._id,
                        description: $rootScope.edit.description,
                        columns: $rootScope.edit.columns,
                        rows: $rootScope.edit.rows,
                        multi : $rootScope.edit.questionType === 'multi' ? true : false,
                        question : $rootScope.edit.question,
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
                    QuizService.updateFullQuiz(quiz).then(function(resp){
                        QuizService.updateMetaQuiz(getMetadata(resp.data)).then(function(resp) {
                            window.alert("Successful Update!");
                            $location.url("/profile");
                        }, function(err){
                            window.alert("Failed To update");
                        });
                    }, function(err){
                        window.alert("Failed to Create update");
                    });
                }
            });
        }
        convertQuizzesToArrays = function() {
            $rootScope.edit.answers = [];
            var isTwoRows = false;
            $rootScope.edit.answers.push([]);
            if ($rootScope.edit.rows == 2) {
                $rootScope.edit.answers.push([]);
                isTwoRows = true;
            }
            if ($rootScope.edit.columns >= 1) {
                $rootScope.edit.answers[0].push($rootScope.edit.answers1);
                if (isTwoRows) {
                    $rootScope.edit.answers[1].push($rootScope.edit.answers5);
                }
            }
            if ($rootScope.edit.columns >= 2) {
                $rootScope.edit.answers[0].push($rootScope.edit.answers2);
                if (isTwoRows) {
                    $rootScope.edit.answers[1].push($rootScope.edit.answers6);
                }
            }
            if ($rootScope.edit.columns >= 3) {
                $rootScope.edit.answers[0].push($rootScope.edit.answers3);
                if (isTwoRows) {
                    $rootScope.edit.answers[1].push($rootScope.edit.answers7);
                }
            }
            if ($rootScope.edit.columns == 4) {
                $rootScope.edit.answers[0].push($rootScope.edit.answers4);
                if (isTwoRows) {
                    $rootScope.edit.answers[1].push($rootScope.edit.answers8);
                }
            }
        };
        convertQuestionsToArrays = function() {
            $rootScope.edit.questions = [];
            var isTwoRows = false;
            $rootScope.edit.questions.push([]);

            if ($rootScope.edit.rows == 2) {
                $rootScope.edit.questions.push([]);
                isTwoRows = true;
            }
            if ($rootScope.edit.columns >= 1) {
                $rootScope.edit.questions[0].push($rootScope.edit.questions1);
                if (isTwoRows) {
                    $rootScope.edit.questions[1].push($rootScope.edit.questions5);
                }
            }
            if ($rootScope.edit.columns >= 2) {
                $rootScope.edit.questions[0].push($rootScope.edit.questions2);
                if (isTwoRows) {
                    $rootScope.edit.questions[1].push($rootScope.edit.questions6);
                }
            }
            if ($rootScope.edit.columns >= 3) {
                $rootScope.edit.questions[0].push($rootScope.edit.questions3);
                if (isTwoRows) {
                    $rootScope.edit.questions[1].push($rootScope.edit.questions7);
                }
            }
            if ($rootScope.edit.columns == 4) {
                $rootScope.edit.questions[0].push($rootScope.edit.questions4);
                if (isTwoRows) {
                    $rootScope.edit.questions[1].push($rootScope.edit.questions8);
                }
            }
        };
    }
})();