'use strict';

describe('Service: showingsDataService', function () {

  // load the service's module
  beforeEach(module('moviesowlApp'));

  // instantiate service
  var showingsDataService;
  beforeEach(inject(function (_showingsDataService_) {
    showingsDataService = _showingsDataService_;
  }));

  it('should do something', function () {
    expect(!!showingsDataService).toBe(true);
  });

});
