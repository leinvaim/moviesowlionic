'use strict';

describe('Service: selectedMovieService', function () {

  // load the service's module
  beforeEach(module('moviesowlApp'));

  // instantiate service
  var selectedMovieService;
  beforeEach(inject(function (_selectedMovieService_) {
    selectedMovieService = _selectedMovieService_;
  }));

  it('should do something', function () {
    expect(!!selectedMovieService).toBe(true);
  });

});
