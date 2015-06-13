'use strict';

describe('Controller: CinemasCtrl', function () {

  // load the controller's module
  beforeEach(module('moviesowlApp'));

  var CinemasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CinemasCtrl = $controller('CinemasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
