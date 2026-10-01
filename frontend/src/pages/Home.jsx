import React from 'react';
import HeroSection from '../components/HeroSection';
import ShopByCategory from '../components/ShopByCategory';
import PromoBanners from '../components/PromoBanners'
import EditorialGrid from '../components/EditorialGrid';
import BrandPerks from '../components/BrandPerks';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Shop By Category Section */}
      <ShopByCategory />

      {/* 3. 3-Grid Promotional Banners Section */}
      <PromoBanners />

      {/* 4. Editorial Grid (Holiday Gifts & Cleaner Fashion) */}
      <EditorialGrid />

      {/* 5. Brand Perks (Shipping, Crafted, Stores) */}
      <BrandPerks />

      {/* Baad me yahan baki homepage components aayenge:
          <FeaturedProducts />
          <Footer />
      */}
    </div>
  );
}