import Product_Page from "@/components/pages/product_page/product_page_shell";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getPayload } from "payload";
import config from "@payload-config";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";


//Implement ISR here for performace by figuring out some way to get this thing to work with the dynamic parameter of category by putting it in the sus[ense so that it works. it doesn't though yet so gahhhhhh. In the meantime I will remove the use cache check until next time futurer me. 

interface Image {
  createdAt: string;
  updatedAt: string;
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  thumbnailURL: string | null;
  id: string;
}

interface ProductImage {
  image: Image;
  id: string;
}

interface Product {
  createdAt: string;
  updatedAt: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  images: ProductImage[];
  featured: boolean;
  _status: string;
  id: string;
  imagesrc: string;
}

interface HeroText {
  createdAt: string;
  updatedAt: string;
  category: string;
  content: SerializedEditorState;
  id: string;
}

interface PageContent {
  content: HeroText;
  products: Record<string, Product[]>;
}
async function getData(category: string): Promise<PageContent> {
  const payload = await getPayload({ config });

  const [products_res, content_res] = await Promise.all([
    payload.find({
      collection: "products",
      where: { category: { equals: category } },
    }),
    payload.find({
      collection: "productpage",
      where: { category: { equals: category } },
    }),
  ]);

  const products = products_res.docs as Product[];
  const content = content_res.docs[0] as HeroText;

  const processedProducts = products.reduce<Record<string, Product[]>>(
    (acc, item) => {
      item.imagesrc = item.images[0].image.url;
      if (!acc[item.subcategory]) acc[item.subcategory] = [];
      acc[item.subcategory].push(item);
      return acc;
    },
    {}
  );

  return { content, products: processedProducts };
}

// ← Inner component: lives inside Suspense, so await params is fine here
async function PageContent({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await getData(category);
  return <Product_Page data={data} />;
}

// ← Outer shell: sets up the Suspense boundary synchronously
export default function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoaderCircle className="animate-spin" />
          <p className="ml-3">Loading products...</p>
        </div>
      }
    >
      <PageContent params={params} />
    </Suspense>
  );
}