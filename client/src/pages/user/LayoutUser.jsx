import LayoutHome from "../LayoutHome"

const LayoutUser = ({children}) => {
    const items = [
        {title: "Inicio", href: "/user/home"},
        {title: "Empleos", href: "/user/jobs"},
        {title: "Perfil", href: "/user/profile"}
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutUser;