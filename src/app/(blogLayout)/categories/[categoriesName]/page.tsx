import BlogList from "@/components/BlogList";
import { Metadata } from "next";
import { getCategoryList } from "../../api/notion";

type Props = {
  params: Promise<{ categoriesName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = decodeURI((await params).categoriesName);

  const title = `${categoryName} | castle log`;

  return {
    title: title,
    description: "개발과 일상을 공유 합니다.",
    openGraph: {
      title: title,
      description: "개발과 일상을 공유 합니다.",
      siteName: title,
      locale: "ko_KR",
      type: "website",
      url: "https://bocelog.vercel.app/blog/" + categoryName,
      images: {
        url: `${process.env.NEXT_PUBLIC_IMG}/7nxjpqB/image.png`,
      },
    },
    verification: {
      google: `${process.env.GOOGLE_SITE_VERIFICATION_KEY}`,
      other: {
        "naver-site-verification": `${process.env.NAVER_SITE_VERIFICATION_KEY}`,
        "google-adsense-account": `${process.env.GOOGLE_ADSENSE_ACCOUNT}`,
      },
    },
  };
}

export default async function SelectCategoryPage({ params }: Props) {
  const categoryName = decodeURI((await params).categoriesName);
  const List = await getCategoryList({ categoryName: categoryName });

  return (
    <div className="w-3/5 items-start max-md:w-full max-sm:w-full flex flex-col md:gap-5 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
      <BlogList list={List} />
    </div>
  );
}
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams({ params }: Props) {
  const categoryName = decodeURI((await params).categoriesName);
  const List = await getCategoryList({ categoryName: categoryName });
  return List;
}
