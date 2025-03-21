'use client';

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab? : number;
  tabOptions? : number[];
}


export const TabBar = ({ tabOptions = [1,2,3,4], currentTab = 1 }: Props ) => {

  const router = useRouter();
    //este hook se utiliza para obtener información sobre la ruta actual (por ejemplo, la URL) y para manipular el enrutamiento, como cambiar de página programáticamente.
    //console.log(router.pathname); // Muestra el nombre de la ruta actual
    //router.push('/nueva-pagina'); // Navega a /nueva-pagina
    //console.log(router.query); // Obtiene los parámetros de la URL si los hay, como query strings o segmentos dinámicos.

  const [selected, setSelected] = useState( currentTab );

  const onTabSelected = ( tab: number ) => {
    setSelected( tab );
    setCookie('selectedTab', tab.toString() );
    router.refresh();
  }

  return (
    <div className={`
        grid w-full space-x-2 rounded-xl bg-gray-200 p-2
        grid-cols-4
      `}>

      {
        tabOptions.map( tab => (
          <div key={tab}>
            <input 
              checked={ selected === tab }
              onChange={ () =>{ } }
              type="radio" 
              id={ tab.toString() } 
              className="peer hidden" 
            />
            <label 
              onClick={() => onTabSelected( tab )}
              className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                { tab }
            </label>
          </div>

        ))
      }

    </div>
  )
}