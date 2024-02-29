import LayoutMain from "./LayoutMain"

const UserMain = () => {
    const items = [
        {title: "Inicio", href: "/user/home"},
        {title: "Jobs", href: "/user/applicants"},
        {title: "Profile", href: "/user/profile"}
    ]

    return(
        <LayoutMain items={items}>
            <div className="space-y-4 p-8 pt-6">
                <h1>User Home</h1>
            </div>
        </LayoutMain>
    )
}

export default UserMain;