import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ResourceStatus,
  viewChild,
} from '@angular/core';
import { ExpandableCard } from './expandable-card';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-page-2',
  template: `
    page2
    <app-expandable-card>
      <div title>Load Post</div>
      <div>
        @defer (when component().isExpanded()) {
          @for (post of postResource.value(); track post.id) {
            <div>{{ post.title }}</div>
          }
        } @placeholder (minimum 1s) {
          <p>Placeholder</p>
        } @loading (minimum 1s) {
          <p>Loading...</p>
        } @error {
          <p>Failed to load component</p>
        }
      </div>
    </app-expandable-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpandableCard],
})
export class Page2 {
  public postResource = httpResource<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
  );
  protected readonly ResourceStatus = ResourceStatus;

  // Get reference of child component
  component = viewChild.required(ExpandableCard);

  constructor() {
    effect(() => {
      console.log(`isExpanded`, this.component()?.isExpanded());
    });

    effect(() => {
      console.log(`value`, this.postResource.value());
    });
  }
}
