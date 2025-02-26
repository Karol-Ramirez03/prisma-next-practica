import { cookies } from 'next/headers'
import { TabBar } from "@/components";


export const metadata = {
 title: 'Cookies Page',
 description: 'SEO Title',
};

export default async function CookiesPage() {

    const cookieStore = await cookies();
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';
    //?.: El operador de encadenamiento opcional
    //??: El operador de fusión nula asigna un valor predeterminado solo si el valor a la izquierda es null o undefined.


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar
         currentTab={ +cookieTab } 
         //tranformar a numero con +
         />
      </div>
      

    </div>
  );
}