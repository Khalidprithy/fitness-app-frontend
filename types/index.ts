import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type Category = {
  $oid: string;
};

export type Product = {
  _id: {
    $oid: string;
  };
  id?: string;
  name: string;
  image: string;
  status: boolean;
  isPopular: boolean;
  price: number;
  quantity: number;
  description: string;
  category: Category;
  createdAt: {
    $date: string; // Consider using a proper date type if possible
  };
  updatedAt: {
    $date: string; // Consider using a proper date type if possible
  };
};

interface RootStream {
  url: string;
  token: string;
}

interface Watermark {
  text: string;
}

export type StreamingSourceType = {
  _id: string;
  matchId: string;
  id: number;
  match_id: number;
  stream_title: string;
  is_premium: number;
  resolution: string;
  stream_status: string;
  platform: string;
  stream_type: string;
  portrait_watermark: Watermark;
  landscape_watermark: Watermark;
  root_streams: RootStream[];
  stream_url: string;
  headers: { [key: string]: string };
  stream_key: string;
  position: number;
};
