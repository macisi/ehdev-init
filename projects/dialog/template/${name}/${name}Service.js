define([
    'angular'
], function (angular) {
    return function (app, elem, attrs, scope) {
        app.factory('<%= name %>Service', ['$rootScope', '$http', 'G', function ($rootScope, $http, G) {
            return {
                example: function (opts) {
                    return $http({
                        url: '/goodstaxiAdmin/url',
                        method: 'post',
                        data: opts,
                        test: '/<%= packageName %>/<%= moduleName %>/<%= name %>/<%= name %>.json'
                    });
                }   
            };
        }]);
    }
});