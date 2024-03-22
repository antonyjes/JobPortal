import LayoutHome from "../LayoutHome"

const LayoutRecruiter = ({children}) => {
    const items = [
        {title: "Dashboard", href: "/recruiter/home"},
        {title: "Jobs", href: "/recruiter/jobs"},
        {title: "Applications", href: "/recruiter/applications"},
        {title: "Profile", href: "/recruiter/profile"}
    ]

    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutRecruiter;