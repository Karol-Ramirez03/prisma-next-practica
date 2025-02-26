export const dynamic = 'force-dynamic';
//le estamos diciendo a Next.js que esta página debe ser siempre dinámica, es decir, que debe ser re-renderizada en cada solicitud y no usar ningún tipo de almacenamiento en caché o renderizado estático
export const revalidate = 0;
//Esta configuración le dice a Next.js que no espere para revalidar el contenido de la página. Es decir, la página nunca se guarda en caché y siempre se vuelve a generar en cada solicitud. 
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listado de Todos',
 description: 'SEO Title',
};


export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

  
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </div>
  );
}