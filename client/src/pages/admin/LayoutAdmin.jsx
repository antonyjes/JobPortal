import LayoutHome from "../LayoutHome"

const LayoutAdmin = ({children}) => {
    const items = [
        {title: "Dashboard", href: "/admin/home"},
        {title: "Reclutadores", href: "/admin/recruiters"},
        {title: "Aplicaciones", href: "/admin/applications"},
        {title: "Perfil", href: "/admin/profile"},
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutAdmin;