import { Route } from '@vaadin/router';
import './my-app';
import './bloodborne-gallery';
import './components/boss-page';
import './not-found-page';
import { bossList } from '../public/data';


const bloodborneBossesRoute = bossList.map((item) => ({
  path: `/bloodborne-blog/boss/${item.component.replace('.md', '')}`,
  component: 'boss-page',
  action: (context: any) => {
    context.params.bossUrl = item.component;
  },
}));

export const routes: Route[] = [
  {
    path: '/bloodborne-blog',
    component: 'my-app',
  },
  {
    path: '/about',
    component: 'bloodborne-gallery',
  },
  ...bloodborneBossesRoute,
  {
    path: '(.*)',
    component: 'not-found-page', // The 404 component you created
  },

 
];
