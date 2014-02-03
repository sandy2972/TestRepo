/// <reference path="../jquery-1.10.2.min.js" />
/// <reference path="../bootstrap.min.js" />
/// <reference path="../angular.min.js" />
/// <reference path="../angular-resource.min.js" />
/// <reference path="../angular-route.min.js" />

var TodoApp = angular.module("TodoApp", ["ngResource", "ngRoute"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'new.html' }).
            when('/edit/:editId', { controller: EditCtrl, templateUrl: 'new.html' }).
            otherwise({ redirectTo: '/' });
    })

.directive('greet', function () {

    return {
        template: "<h2> Greetings from {{from}} to my dear {{to}} </h2>",
        controller: function ($scope, $element, $attrs) {
            $scope.from = $attrs.from;
            $scope.to = $attrs.greet;
        }
    }

});

TodoApp.factory('Todo', function ($resource) {
    return $resource('/api/todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var EditCtrl = function ($scope, $location, $routeParams, Todo) {
    $scope.action = "Update";
    var id = $routeParams.editId;
    $scope.item = Todo.get({ id: id });

    $scope.save = function () {
        Todo.update({ id: id }, $scope.item, function () {
            $location.path('/');
        });
    };
};

var CreateCtrl = function ($scope, $location, Todo) {
    $scope.action = "Add";
    $scope.save = function () {
        Todo.save($scope.item, function () {
            $location.path('/');
        });
    };
};


    var ListCtrl = function ($scope, $location, Todo) {
        $scope.search = function () {
            Todo.query({
                q:$scope.query,
                sort: $scope.sort_order,
                desc: $scope.isdesc,
                offset: $scope.offset,
                limit: $scope.limit
            },
            function (data) {
                $scope.more = data.length === 20;
                $scope.todos = $scope.todos.concat(data);
            });
        };

        $scope.sort = function (col) {
            if ($scope.sort_order === col) {
                $scope.isdesc = !$scope.isdesc;
            }
            else {
                $scope.sort_order = col;
                $scope.isdesc = false;
            }
            $scope.reset();

        };

        $scope.showMore = function () {
            $scope.offset += $scope.limit;
            $scope.search();
        };
    
        $scope.has_more = function () {
            return $scope.more;
        };

        $scope.reset = function () {
       
            $scope.limit = 20;
            $scope.offset = 0;
            $scope.todos = [];
            $scope.more = true;
            $scope.search();
        };

        $scope.delete = function () {

            var id = this.item.TodoId;
            Todo.delete({ id: id }, function () {
                $('#todo_'+id).fadeOut();
            });
        }

        $scope.sort_order = "Priority";
        $scope.isdesc = false;
        $scope.reset();
   
    
    };
