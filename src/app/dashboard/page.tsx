import { WidgetItem } from "@/components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('api/auth/signin')
  }
  return (
    <div className="grid gap-6 grid-cols-1 ">
      <WidgetItem tittle="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>{ session.user?.name }</span>
          <span>{ session.user?.image }</span>
          <span>{ session.user?.email }</span>
          
          <div>
            { JSON.stringify( session ) }
          </div>
        </div>
      </WidgetItem>
    </div>
  );
}