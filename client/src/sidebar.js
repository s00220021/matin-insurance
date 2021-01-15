
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";

import Appointments from "views/examples/Appointments.js";
import Videos from "views/examples/Videos.js";

var routes = [

  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/appointments",
    name: "Appointments",
    icon: "ni ni-bullet-list-67 text-red",
    component: Appointments,
    layout: "/admin"
  },
  {
    path: "/videos",
    name: "Videos",
    icon: "ni ni-planet text-blue",
    component: Videos,
    layout: "/admin"
  },
  {
    path: "/comments",
    name: "Comments",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/sonasodian",
    name: "Settings",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
];
export default routes;
