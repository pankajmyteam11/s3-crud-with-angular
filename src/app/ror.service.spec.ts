import { TestBed } from '@angular/core/testing';

import { RorService } from './ror.service';

describe('RorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RorService = TestBed.get(RorService);
    expect(service).toBeTruthy();
  });
});
