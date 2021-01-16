import Vue from "vue";
import VueRouter from "vue-router";
import music from "../views/sound";
import weather from "../views/weather";
import home from "../views/home";
import bookMark from "../views/bookMark";

Vue.use(VueRouter);

const routes = [
  {
    path: "/sound",
    name: "sound",
    component: music
  },
  {
    path: "/weather",
    name: "weather",
    component: weather,
  },
  {
    path: "/bookmark",
    name: "bookMark",
    component: bookMark,
  },
  {
    path: "/",
    name: "home",
    component: home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
