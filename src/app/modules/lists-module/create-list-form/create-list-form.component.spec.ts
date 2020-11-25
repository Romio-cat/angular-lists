import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogRef } from '@angular/material/dialog';
import { CreateListFormComponent } from './create-list-form.component';
import { ListsService } from '../lists.service';

describe('CreateNewListComponent', () => {
  let component: CreateListFormComponent;
  let fixture: ComponentFixture<CreateListFormComponent>;
  let debugElement: DebugElement;
  let mockDialogRef;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };
    await TestBed.configureTestingModule({
      declarations: [CreateListFormComponent],
      imports: [HttpClientModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        ListsService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog form when Cancel button is clicked', () => {
    const cancelButton = debugElement.query(By.css('.create-list__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog form when Create button is clicked AND the name is at least 1 character long', () => {
    component.name = 'First';
    const createButton = debugElement.query(By.css('.create-list__create'));

    createButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should NOT close the dialog form when Create button is clicked AND the name is NOT at least 1 character long',
    () => {
      component.name = '';
      const createButton = debugElement.query(By.css('.create-list__create'));

      createButton.triggerEventHandler('click', null);

      expect(mockDialogRef.close.calls.count()).toBe(0, 'dialog is not closed');
    });
});
