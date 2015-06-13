basket.clear();

var files = [{
    url: 'js/app.js'
}, {
    url: 'js/templates.js'
}];

console.log('Device is ready, time to load app files');
basket.require.apply(null, files).then(function() {
    console.log('Loaded required files, bootstrapping now');
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['cats']);
    });
}, function(reason) {
    console.log('Failed to load files!', reason);
});
