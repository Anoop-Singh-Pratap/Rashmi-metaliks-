import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom CSS for the Swiper navigation buttons
import '../styles/custom-swiper.css';

interface Slide {
  image: string;
  title: string;
  description: string;
}

interface ImageSwiperProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    image: 'https://swiperjs.com/demos/images/nature-1.jpg',
    title: 'Environmental Conservation',
    description: 'Our tree plantation drives have created sustainable green belts across West Bengal.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-2.jpg',
    title: 'Solar Energy Initiative',
    description: 'Harnessing renewable energy through state-of-the-art solar installations.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-3.jpg',
    title: 'Community Development',
    description: 'Working with local communities to create long-lasting positive impact.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-4.jpg',
    title: 'Clean Water Projects',
    description: 'Providing access to clean water through innovative water conservation techniques.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-5.jpg',
    title: 'Educational Support',
    description: 'Empowering future generations through various educational programs.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-6.jpg',
    title: 'Healthcare Initiatives',
    description: 'Regular health camps and medical support for underprivileged communities.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-7.jpg',
    title: 'Rural Development',
    description: 'Infrastructure and livelihood projects for sustainable rural development.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-8.jpg',
    title: 'Women Empowerment',
    description: 'Programs designed to strengthen and empower women in local communities.',
  },
  {
    image: 'https://swiperjs.com/demos/images/nature-9.jpg',
    title: 'Sustainable Agriculture',
    description: 'Supporting sustainable farming practices to promote food security.',
  },
];

const ImageSwiper: React.FC<ImageSwiperProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const usedSlides = slides && slides.length > 0 ? slides : defaultSlides;

  return (
    <div className="w-full relative group">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {usedSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="rounded-lg shadow-lg w-[300px] h-[300px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Caption Container - Below the Swiper */}
      <div className="mt-10 max-w-3xl mx-auto relative h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 120
            }}
            className="text-center relative"
          >
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-4 left-1/2 w-12 h-1 bg-rashmi-red/70 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ translateX: "-50%" }}
            />
            {/* Title with staggered reveal effect */}
            <h3 className="text-2xl font-bold text-foreground mb-3 font-display relative inline-block">
              {usedSlides[activeIndex]?.title}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              />
            </h3>
            {/* Description with subtle reveal */}
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {usedSlides[activeIndex]?.description}
            </motion.p>
            {/* Initiative number indicator */}
            <motion.div 
              className="absolute -right-2 bottom-1/2 translate-y-1/2 text-xs text-rashmi-red/30 font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
            >
              0{activeIndex + 1}/0{usedSlides.length}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageSwiper; 