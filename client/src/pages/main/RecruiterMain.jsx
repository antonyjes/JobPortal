import LayoutMain from "./LayoutMain"

const RecruiterMain = () => {
    const items = [
        {title: "Dashboard", href: "/recruiter/home"},
        {title: "Jobs", href: "/recruiter/jobs"},
        {title: "Applicants", href: "/recruiter/applicants"},
        {title: "Profile", href: "/recruiter/profile"}
    ]

    return(
        <LayoutMain items={items}>
            <div className="space-y-4 p-8 pt-6">
                <h1>Recruiter Home</h1>
            </div>
        </LayoutMain>
    )
}

export default RecruiterMain;