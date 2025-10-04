import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceComponent } from './attendance.component';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Attendance');
  });

  it('should have a mark attendance button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Mark Attendance');
  });
});
