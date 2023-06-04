import { Route } from "@vaadin/router";
import './my-app'
import './bloodborne-gallery'
import './components/boss-page'

export const routes:Route[] =[
    
    {
        path: "/",
        component: "my-app",
       
      },
      {
        path: "/about",
        component: "bloodborne-gallery",
      },
      {
        path: "/bloodborne/boss/:id",
        component: "boss-page",
      }
   
]
