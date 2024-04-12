import LayoutHome from "../LayoutHome"

const LayoutRecruiter = ({children}) => {
    const items = [
        {title: "Dashboard", href: "/recruiter/home"},
        {title: "Empleos", href: "/recruiter/jobs"},
        {title: "Aplicaciones", href: "/recruiter/applications"},
        {title: "Perfil", href: "/recruiter/profile"}
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutRecruiter;