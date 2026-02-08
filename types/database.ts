/**
 * Database Types for Supabase
 * Based on Section 15 of the Master Build Document
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price: number; // In cents (R149 = 14900)
  original_price: number | null;
  category: 'student' | 'business' | 'creative' | 'wellness';
  type: 'template' | 'saas' | 'ebook' | 'service';
  thumbnail: string | null;
  images: string[];
  features: ProductFeature[] | null;
  status: 'draft' | 'live' | 'coming-soon' | 'archived';
  is_featured: boolean;
  payfast_item_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductFeature {
  title: string;
  description?: string;
  icon?: string;
}

export interface Order {
  id: string;
  product_id: string;
  user_email: string;
  user_name: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payfast_payment_id: string | null;
  payfast_transaction_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: 'homepage' | 'blog' | 'mirembe' | 'product_page' | 'poetry';
  interests: string[];
  subscribed_at: string;
  unsubscribed_at: string | null;
  metadata: Record<string, unknown> | null;
}

export interface Testimonial {
  id: string;
  product_id: string | null;
  author_name: string;
  author_title: string | null;
  author_avatar: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface Poem {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  collection: string | null;
  mood: string | null;
  theme: string | null;
  audio_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  heart_count: number;
  created_at: string;
  published_at: string | null;
}

export interface PoemHeart {
  id: string;
  poem_id: string;
  session_id: string;
  user_id: string | null;
  created_at: string;
}

export interface PoemRose {
  id: string;
  poem_id: string;
  content: string;
  author_name: string | null;
  author_email: string | null;
  is_anonymous: boolean;
  status: 'pending' | 'approved' | 'featured' | 'rejected';
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: 'dev' | 'writing' | 'business';
  tags: string[];
  reading_time: number | null;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Engagement metrics
  view_count: number;
  like_count: number;
  // Contributor relationship
  author_id: string | null;
  contributor?: Contributor | null;
  mentions?: ArticleMention[];
  reviews?: BlogReview[];
}

// Blog Review (Reader insights/reviews)
export interface BlogReview {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string | null;
  content: string;
  rating: number | null; // 1-5 stars, optional
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

// Blog Like (Unique likes per session)
export interface BlogLike {
  id: string;
  post_id: string;
  session_id: string;
  created_at: string;
}

// Blog View (Track views)
export interface BlogView {
  id: string;
  post_id: string;
  session_id: string;
  created_at: string;
}

// Blog Contributor (Guest Writers)
export interface Contributor {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatar: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  specialties: ('dev' | 'writing' | 'business')[];
  is_featured: boolean;
  article_count: number;
  created_at: string;
}

// Featured People (Mentioned in Articles)
export interface FeaturedPerson {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  company: string | null;
  avatar: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  category: 'dev' | 'writing' | 'business' | null;
  is_featured: boolean;
  created_at: string;
}

// Article Mentions (Junction table)
export interface ArticleMention {
  id: string;
  article_id: string;
  person_id: string;
  mention_context: string | null; // e.g., "Interview", "Quote", "Case Study"
  created_at: string;
  person?: FeaturedPerson;
}

// Cart Types (client-side only, not in database)
export interface CartItem {
  id: string;
  product_id: string;
  slug: string;
  name: string;
  price: number;
  original_price?: number;
  thumbnail: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Database schema type for Supabase
export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
      subscribers: {
        Row: Subscriber;
        Insert: Omit<Subscriber, 'id' | 'subscribed_at'>;
        Update: Partial<Omit<Subscriber, 'id' | 'subscribed_at'>>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, 'id' | 'created_at'>;
        Update: Partial<Omit<Testimonial, 'id' | 'created_at'>>;
      };
      poems: {
        Row: Poem;
        Insert: Omit<Poem, 'id' | 'created_at' | 'heart_count'>;
        Update: Partial<Omit<Poem, 'id' | 'created_at'>>;
      };
      poem_hearts: {
        Row: PoemHeart;
        Insert: Omit<PoemHeart, 'id' | 'created_at'>;
        Update: Partial<Omit<PoemHeart, 'id' | 'created_at'>>;
      };
      poem_roses: {
        Row: PoemRose;
        Insert: Omit<PoemRose, 'id' | 'created_at'>;
        Update: Partial<Omit<PoemRose, 'id' | 'created_at'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'view_count' | 'like_count' | 'contributor' | 'mentions' | 'reviews'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'contributor' | 'mentions' | 'reviews'>>;
      };
      blog_reviews: {
        Row: BlogReview;
        Insert: Omit<BlogReview, 'id' | 'created_at' | 'is_approved' | 'is_featured'>;
        Update: Partial<Omit<BlogReview, 'id' | 'created_at'>>;
      };
      blog_likes: {
        Row: BlogLike;
        Insert: Omit<BlogLike, 'id' | 'created_at'>;
        Update: never;
      };
      blog_views: {
        Row: BlogView;
        Insert: Omit<BlogView, 'id' | 'created_at'>;
        Update: never;
      };
      contributors: {
        Row: Contributor;
        Insert: Omit<Contributor, 'id' | 'created_at' | 'article_count'>;
        Update: Partial<Omit<Contributor, 'id' | 'created_at'>>;
      };
      featured_people: {
        Row: FeaturedPerson;
        Insert: Omit<FeaturedPerson, 'id' | 'created_at'>;
        Update: Partial<Omit<FeaturedPerson, 'id' | 'created_at'>>;
      };
      article_mentions: {
        Row: ArticleMention;
        Insert: Omit<ArticleMention, 'id' | 'created_at' | 'person'>;
        Update: Partial<Omit<ArticleMention, 'id' | 'created_at' | 'person'>>;
      };
    };
  };
}
