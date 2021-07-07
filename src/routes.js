

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User",
    icon: "<i className='fas fa-user'><i/>",
    layout: "/admin"
  },
  {
    path: "/practitioner",
    name: "Practitioner",
    icon: "<i className='fas fa-user-md'></i>",
    layout: "/admin"
  },
  {
    path: "/specialization",
    name: "Specialization",
    icon: "pe-7s-news-paper",
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    layout: "/admin"
  }
];

export default dashboardRoutes;
