import { NavItems } from "../interfaces/navigation";

export const Navigation: NavItems[] = [
    {
      title: 'Home',
      path: '',
    },
    {
      title: 'Shop',
      path: 'shop',
    },
    {
        title: 'Log In',
        path: 'auth'
    },
    {
        title: 'Register',
        path: 'auth'
    }
]

export const BeforeAuthNav: NavItems[] = [
    // {
    //     title: 'Home',
    //     path: '',
    // },
    // {
    //     title: 'Shop',
    //     path: 'shop',
    // },
    {
        title: 'Log In',
        path: 'auth'
    },
    {
        title: 'Register',
        path: 'auth'
    }
]

export const AfterAuthNav: NavItems[] = [
    {
        title: 'Profile',
        path: 'profile',
    },
    {
        title: 'Shop',
        path: 'shop',
    },
    // {
    //     title: 'Log Out',
    //     path: 'logOut'
    // }

]