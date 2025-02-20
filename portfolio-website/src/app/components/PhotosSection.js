'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FadeIn } from './motion/MotionElements';

const photos = [
  {
    id: 1,
    src: '/photos/photo1.jpg',
    alt: 'Description 1',
    width: 'col-span-2',
    height: 'row-span-2',
  },
  {
    id: 2,
    src: '/photos/photo2.jpg',
    alt: 'Description 2',
  },
  {
    id: 3,
    src: '/photos/photo3.jpg',
    alt: 'Description 3',
  },
  {
    id: 4,
    src: '/photos/photo4.jpg',
    alt: 'Description 4',
    width: 'col-span-2',
  },
  {
    id: 5,
    src: '/photos/photo5.jpg',
    alt: 'Description 5',
  },
  {
    id: 6,
    src: '/photos/photo6.jpg',
    alt: 'Description 6',
  },
];

function PhotoCard({ photo, index }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${photo.width || ''} ${photo.height || ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="aspect-square relative overflow-hidden group">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-display text-lg">{photo.alt}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhotosSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-32" id="photos">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text funky-underline">Photography</span>
          </h2>
          <p className="body-text mt-4 text-foreground/80">
            Capturing moments and memories through my lens
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
        {photos.map((photo, index) => (
          <FadeIn key={photo.id} delay={index * 0.1}>
            <PhotoCard photo={photo} index={index} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="text-center mt-12">
          <motion.a
            href="/photos"
            className="funky-border inline-flex items-center gap-2 px-6 py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">View All Photos →</span>
          </motion.a>
        </div>
      </FadeIn>
    </section>
  );
} 