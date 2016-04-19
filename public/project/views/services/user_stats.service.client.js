(function(){
    angular
        .module("KevinSporcleApp")
        .factory("UserStatsService",UserStatsService);

    function UserStatsService($http, $q) {
        var api = {
            findStats: findStats,
            updateStats: updateStats,
            deleteStats: deleteStats,
            createStats: createStats
        };
        return api;

        function findStats(username) {
            return $http.get('/api/project/userstats/'+username);
        }
        function updateStats(username, stats) {
            return $http.put('/api/project/userstats/'+username, stats);
        }
        function deleteStats(username) {
            return $http.delete('/api/project/userstats/'+username);
        }
        function createStats(stats) {
            return $http.post('/api/project/userstats/', stats);
        }
    }
})();