export interface IProduct {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}
