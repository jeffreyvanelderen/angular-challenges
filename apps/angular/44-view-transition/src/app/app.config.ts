import { ApplicationConfig, inject } from '@angular/core';
import {
  provideRouter,
  ViewTransitionInfo,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { PostService } from './services/post.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        { path: '', loadComponent: () => import('./blog/blog.component') },
        {
          path: 'post/:id',
          loadComponent: () => import('./post/post.component'),
        },
      ],
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions({
        onViewTransitionCreated: (transitionInfo: ViewTransitionInfo): void => {
          const postService = inject(PostService);

          // set the activeId when transitioning to or from a post
          const activeId =
            transitionInfo.to.firstChild?.params['id'] ||
            transitionInfo.from.firstChild?.params['id'];
          postService.activeId.set(activeId);

          // clear the activeId when the transition is finished
          transitionInfo.transition.finished.then(() => {
            postService.activeId.set(undefined);
          });
        },
      }),
    ),
  ],
};
