import CategoryTree from '@/components/category/CategoryTree';
import Footer from '@/components/home/Footer';
import { createClient } from '@/db/supabase/client';

async function getCategories() {
  const supabase = createClient();
  const { data: categories } = await supabase.from('navigation_category').select();
  return categories?.map(category => ({
    ...category,
    id: category.id.toString()
  })) || [];
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <main className='mx-auto flex w-full max-w-screen-2xl flex-1 gap-8 px-4 lg:px-8'>
        <CategoryTree 
          categories={categories} 
          className="hidden lg:block"
        />
        <div className='flex-1 min-w-0 pb-16'>
          {children}
        </div>
      </main>
      <Footer className="bg-white shadow-soft" />
    </>
  );
}
