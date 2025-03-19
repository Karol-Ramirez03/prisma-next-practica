export const dynamic = 'force-dynamic';
//le estamos diciendo a Next.js que esta página debe ser siempre dinámica, es decir, que debe ser re-renderizada en cada solicitud y no usar ningún tipo de almacenamiento en caché o renderizado estático
export const revalidate = 0;
import { getUserSessionServer } from "@/auth/actions/auth-actions";
//Esta configuración le dice a Next.js que no espere para revalidar el contenido de la página. Es decir, la página nunca se guarda en caché y siempre se vuelve a generar en cada solicitud. 
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'Listado de Todos',
 description: 'SEO Title',
};


export default async function RestTodosPage() {
  const user = await getUserSessionServer();
  if ( !user ) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: 'asc' } 
  })

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </div>
  );
}