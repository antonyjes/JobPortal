import { Heading } from "@/components/heading";
import LayoutUser from "./LayoutUser";
import { Separator } from "@/components/ui/separator";

const UserMain = () => {
    return(
        <LayoutUser>
            <div className="space-y-4 p-8 pt-6">
                <Heading title="Dashboard User" description="Overview your status" />
                <Separator />
                {/* STATUS OF JOB APPLIED BY */}
            </div>
        </LayoutUser>
    )
}

export default UserMain;