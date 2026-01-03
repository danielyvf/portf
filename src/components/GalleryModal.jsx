import React from 'react';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

Modal.setAppElement('#root');

export default function GalleryModal({ isOpen, onClose, images }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000 },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          border: 'none',
          padding: 0,
          width: '90%',
          maxWidth: '1000px',
          height: '70%',
        }
      }}
    >
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} style={{ width: '80%', height: '100%' }}>
            <img
              src={img}
              alt={`Galeria ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: "2em",
          color: "#fff",
          background: "transparent",
          border: "none",
          cursor: "pointer"
        }}
      >
        ×
      </button>
    </Modal>
  );
}
