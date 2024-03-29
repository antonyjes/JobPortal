import LayoutHome from "../LayoutHome"

const LayoutAdmin = ({children}) => {
    const items = [
        {title: "Dashboard", href: "/admin/home"},
        {title: "Recruiters", href: "/admin/recruiters"},
        {title: "Applications", href: "/admin/applications"},
        {title: "Profile", href: "/admin/profile"},
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutAdmin;