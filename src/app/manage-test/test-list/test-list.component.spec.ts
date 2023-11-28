import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test } from 'app/models/test.model';
import { TestListComponent } from './test-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from '../test.service';
import { TestCategory } from 'app/models/test-category.model'; 
import { RouterTestingModule } from '@angular/router/testing';

describe('TestListComponent', () => {
  let component: TestListComponent;
  let fixture: ComponentFixture<TestListComponent>;
  let testService: TestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestListComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestListComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(TestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all test categories on initialization', async () => {

    const categories: TestCategory[] = [
      { categoryID: 1, name: 'Category 1', createdDate: '12-7-2023', companyID: 1, Active: true },
      { categoryID: 2, name: 'Category 2', createdDate: '12-7-2023', companyID: 1, Active: true },
    ];

    component.ngAfterViewInit();

    expect(component.testCategories).toEqual(categories);
  });


  it('should retrieve all tests on initialization', async () => {

    const tests: Test[] = [
      { testID: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
      { testID: 2, description: 'Test 2', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
    ];

    component.ngAfterViewInit();

    expect(component.dataSource.data).toEqual(tests);
  });

  it('should filter tests by description', async () => {
    const tests: Test[] = [
      { testID: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
      { testID: 2, description: 'Test 2', categoryID: 1, active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
    ];
    component.dataSource = new MatTableDataSource<Test>(tests);
    await component.doFilter('Test 1');
    expect(component.dataSource.filter).toEqual('Test 1');
  });

  it('should navigate to test details page when createTest called', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();

    component.createTest();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/create')
  });

  it('should navigate to deleted test page when gotoDeletedTests called', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();


    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test/deleted')
  })




});
