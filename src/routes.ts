import { Route } from "@vaadin/router";
import './my-app'
import './bloodborne-gallery'

export const routes:Route[] =[
    
    {
        path: "/",
        component: "my-app",
       
      },
      {
        path: "/about",
        component: "bloodborne-gallery",
      }
   
]
