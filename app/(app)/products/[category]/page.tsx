import Product_Page from "@/components/pages/product_page/product_page_shell";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getPayload } from "payload";
import config from "@payload-config";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

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
export default  async function Page({ params }: { params: Promise<{ category: string }> }) {
  "use cache"
  const payload = await getPayload({ config });
  const { category } = await params;
  const products_res = await payload.find({
    collection: "products",
    where: {
      category: {
        equals: category,
      },
    },
  });
  
 const products = products_res.docs as Product[];

 const content_res = await payload.find({
    collection: "productpage",
    where: {
      category: {
        equals: category,
      },
    },
  }); 

 const content = content_res.docs[0] as HeroText;
  let processedProducts = products.reduce((acc, item) => {
    item.imagesrc = item.images[0].image.url;
    if (!acc[item.subcategory]) {
      acc[item.subcategory] = [];
      acc[item.subcategory].push(item);
    } else {
      acc[item.subcategory].push(item);
    }
    return acc;
  }, {});

 

  const data = {content:content, products: processedProducts}
return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin" />
        <p className="ml-3">Loading products...</p>
      </div>
    }>
      <Product_Page data={data} />
    </Suspense>
  );
}
