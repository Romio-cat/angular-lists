import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListsMaterialModule } from '../lists-material.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const list1 = {
    id: 1, name: 'First', total: 10, completed: 5,
  };
  const list2 = {
    id: 1, name: 'Second', total: 10, completed: 10,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [ListsMaterialModule],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        component.list = list1;
        fixture.detectChanges();
      });
  }));

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should return false because not all items are completed', () => {
    expect(component.isEverythingDone).toBe(false);
  });

  it('should return true because everything is done', () => {
    component.list = list2;

    expect(component.isEverythingDone).toBe(true);
  });

  it('should return 50', () => {
    expect(component.listProgress).toBe(50);
  });

  it('should return 100', () => {
    component.list = list2;

    expect(component.listProgress).toBe(100);
  });

  it('should render name in a mat-card-title tag', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-title').textContent).toContain('First');
  });

  it('should render progress in a mat-card-content tag', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-content').textContent).toContain('5/10');
  });
});
