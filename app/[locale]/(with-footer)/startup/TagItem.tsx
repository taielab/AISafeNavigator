interface TagItemProps {
  name: string;
}

export default function TagItem({ name }: TagItemProps) {
  return (
    <div className='flex-center h-7 rounded-lg bg-[#F4F6F8] px-3 text-sm font-medium text-[#687076] transition-colors duration-200 hover:bg-[#E6E8EB]'>
      {name}
    </div>
  );
}