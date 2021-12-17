import { TestBed } from '@angular/core/testing';

import { RoleFakeBackendInterceptor } from './role-fake-backend.interceptor';

describe('RoleFakeBackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RoleFakeBackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RoleFakeBackendInterceptor = TestBed.inject(RoleFakeBackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
