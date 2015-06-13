'use strict';

describe('Controller: ShowingsCtrl', function () {

  // load the controller's module
  beforeEach(module('moviesowlApp'));

  var ShowingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowingsCtrl = $controller('ShowingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
