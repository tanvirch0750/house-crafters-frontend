/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

// @ts-ignore
function CategoryCard({ category }) {
  return (
    <div>
      <div className="relative flex max-w-full flex-col items-center justify-center object-cover border-teal-100 border-4">
        <img
          width={300}
          height={300}
          src={category?.categoryImage}
          alt=""
          className="inline-block h-[300px] w-full object-cover"
        />
        <Link
          href={`/category/${category?.id}`}
          className="absolute flex flex-col items-center justify-center border-4 border-teal-100 bg-teal-50 text-teal-900 px-8 py-4 text-center rounded-sm font-bold"
        >
          <p className="font-medium text-sm sm:text-xl">
            {category?.categoryName}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
