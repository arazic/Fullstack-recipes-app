import Home from "./pages/Home.vue";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
        
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import ("./pages/Login.vue")
    },
    {
        path: "/Register",
        name: "Register",
        component: () => import ("./pages/Register.vue")
    },
    {
        path: "/recipe",
        name: "recipe",
        component: () => import ("./pages/Recipe.vue"),
        props: (route)=>({recipe : route.query.recipe})
    },
    {
        path: "/Search",
        name: "Search",
        component: () => import ("./pages/Search.vue")
    },
    {
        path: "/Personal",
        name: "Personal",
        component: () => import ("./pages/Personal.vue")
    },
    {
        path: "/Family",
        name: "Family",
        component: () => import ("./pages/Family.vue")
    },
    {
        path: "/Favorites",
        name: "Favorites",
        component: () => import ("./pages/Favorites.vue")
    },
    {
        path: "/About",
        name: "About",
        component: () => import ("./pages/About.vue")
    },
    { path: "*", redirect: "/"}
];