import { TestBed } from '@angular/core/testing';

import { MountaindbService } from './mountainsdb.service';

describe('MoviedbService', () => {
  let service: MountaindbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MountaindbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
