import { Route } from "@vaadin/router";
import './my-app'
import './bloodborne-gallery'
import './components/boss-page'
import { bossList } from "../public/data";



interface BossPageParams {
  bossUrl: string;
}

export const routes:Route[] =[
    
    {
        path: "/",
        component: "my-app",
       
      },
      {
        path: "/about",
        component: "bloodborne-gallery",
      },
   
      ...bossList.map((bossUrl:String) => ({
        path: `/bloodborne/boss/${bossUrl.replace('.md', '')}`,
        // component: "boss-page",
        action: async (_context: any, commands: { component: (arg0: string,arg1:String) => any; })  => {
        console.log('bossUrl', bossUrl)
          return commands.component('boss-page', bossUrl);
        },
      })),
    ];
