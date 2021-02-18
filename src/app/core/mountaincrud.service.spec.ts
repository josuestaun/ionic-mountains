import { TestBed } from '@angular/core/testing';

import { MountaincrudService } from './mountaincrud.service';

describe('MountaincrudService', () => {
  let service: MountaincrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MountaincrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
