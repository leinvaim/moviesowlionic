'use strict';

describe('Controller: MoviedetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('moviesowlApp'));

  var MoviedetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoviedetailsCtrl = $controller('MovieDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
