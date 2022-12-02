import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/website-header/main-heading/main-heading.component.spec.ts
import { MainHeadingComponent } from './main-heading.component';

describe('MainHeadingComponent', () => {
  let component: MainHeadingComponent;
  let fixture: ComponentFixture<MainHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHeadingComponent ]
========
import { ShowBlogComponent } from './show-blog.component';

describe('ShowBlogComponent', () => {
  let component: ShowBlogComponent;
  let fixture: ComponentFixture<ShowBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBlogComponent ]
>>>>>>>> 048b13cc6a5b278ecbdb66effe59d5a5c914d791:src/app/blogs/show-blog/show-blog.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<<< HEAD:src/app/website-header/main-heading/main-heading.component.spec.ts
    fixture = TestBed.createComponent(MainHeadingComponent);
========
    fixture = TestBed.createComponent(ShowBlogComponent);
>>>>>>>> 048b13cc6a5b278ecbdb66effe59d5a5c914d791:src/app/blogs/show-blog/show-blog.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
