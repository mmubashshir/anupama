// import { Calendar, MessageCircle } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// export default function TopStories() {
//   const categories = ['SPORT', 'ENTERTAINMENT', 'TRAVEL'] as const;

//   // Group articles by category
//   const articlesByCategory = categories.map((category) => ({
//     category,
//     articles: [].filter((article) => article.category === category),
//   }));

//   return (
//     <div className="mx-auto w-full max-w-6xl">
//       {/* Desktop Layout */}
//       <div className="hidden gap-8 p-4 md:grid md:grid-cols-3">
//         {articlesByCategory.map(({ category, articles }) => (
//           <div key={category} className="space-y-6">
//             {/* Only render if there are articles */}
//             {articles.length > 0 && (
//               <>
//                 {/* Category Heading */}
//                 <div className="text-lg font-medium text-gray-600">
//                   {category}
//                 </div>

//                 {/* Featured Article */}
//                 {articles[0] ? (
//                   <div className="space-y-3">
//                     <div className="overflow-hidden">
//                       <Image
//                         src={articles[0].image}
//                         alt={articles[0].title}
//                         width={500}
//                         height={300}
//                         className="h-auto w-full object-cover"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex flex-col space-y-1">
//                         <Link
//                           href="#"
//                           className="hover: text-md w-fit tracking-wide text-slate-400 uppercase transition duration-300 hover:text-black"
//                         >
//                           {category}
//                         </Link>
//                         <Link
//                           href="#"
//                           className="inline-block w-fit text-xl leading-tight font-semibold text-slate-800"
//                         >
//                           {articles[0].title}
//                         </Link>
//                       </div>

//                       <p className="text-sm text-gray-600">
//                         {articles[0].excerpt}
//                       </p>
//                       <div className="flex items-center space-x-4 text-xs text-gray-500">
//                         <div className="flex items-center">
//                           <span className="mr-1">
//                             <Calendar className="size-4" />
//                           </span>
//                           {articles[0].date}
//                         </div>
//                         <div className="flex items-center">
//                           <span className="mr-1">
//                             <MessageCircle className="size-4" />
//                           </span>
//                           {articles[0].comments}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : null}

//                 {/* Smaller Articles */}
//                 <div className="space-y-4">
//                   {articles.slice(1).map((article) => (
//                     <div
//                       key={article.id}
//                       className="flex gap-3 border-t border-gray-300 pt-4"
//                     >
//                       <div className="h-20 w-25 flex-shrink-0 overflow-hidden">
//                         <Image
//                           src={article.image}
//                           alt={article.title}
//                           width={100}
//                           height={100}
//                           className="h-full w-full object-cover"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-md leading-tight font-semibold">
//                           <Link href="#">{article.title}</Link>
//                         </h3>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Mobile Layout */}
//       <div className="md:hidden">
//         {articlesByCategory.map(({ category, articles }) => (
//           <div
//             key={category}
//             id={category.toLowerCase()}
//             className="last:border-b-0"
//           >
//             <div className="p-4">
//               <h2 className="text-lg font-medium">{category}</h2>
//             </div>

//             {/* Featured Article */}
//             {articles[0]?.image && articles[0]?.title ? (
//               <div className="space-y-3 p-4">
//                 <div className="overflow-hidden">
//                   <Image
//                     src={articles[0].image}
//                     alt={articles[0].title}
//                     width={500}
//                     height={300}
//                     className="h-auto w-full object-cover"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-sm text-gray-500">{category}</div>
//                   <h2 className="text-xl leading-tight font-bold">
//                     <Link href="#">{articles[0].title}</Link>
//                   </h2>
//                   <p className="text-sm text-gray-600">{articles[0].excerpt}</p>
//                   <div className="flex items-center space-x-4 text-xs text-gray-500">
//                     <div className="flex items-center">
//                       <span className="mr-1">
//                         <Calendar />
//                       </span>
//                       {articles[0].date}
//                     </div>
//                     <div className="flex items-center">
//                       <span className="mr-1">
//                         <MessageCircle />
//                       </span>
//                       {articles[0].comments}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : null}

//             {/* Smaller Articles */}
//             <div className="space-y-0">
//               {articles.slice(1).map((article) => (
//                 <div key={article.id} className="flex gap-3 p-4">
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden">
//                     <Image
//                       src={article.image}
//                       alt={article.title}
//                       width={100}
//                       height={100}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <div className="mb-1 text-xs text-gray-500">{category}</div>
//                     <h3 className="text-base leading-tight font-semibold">
//                       <Link href="#">{article.title}</Link>
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
