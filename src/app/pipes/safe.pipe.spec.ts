import { SafePipe } from './safe.pipe';

const mockSanitizer = {
  sanitize: jasmine.createSpy('sanitize'),
  bypassSecurityTrustHtml: jasmine.createSpy('bypassSecurityTrustHtml'),
  bypassSecurityTrustStyle: jasmine.createSpy('bypassSecurityTrustStyle'),
  bypassSecurityTrustScript: jasmine.createSpy('bypassSecurityTrustScript'),
  bypassSecurityTrustUrl: jasmine.createSpy('bypassSecurityTrustUrl'),
  bypassSecurityTrustResourceUrl: jasmine.createSpy('bypassSecurityTrustResourceUrl'),
}

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafePipe(mockSanitizer);
    expect(pipe).toBeTruthy();
  });
});
