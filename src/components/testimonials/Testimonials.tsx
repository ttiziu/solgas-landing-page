import { useRef, useEffect } from "react";
import type { FC } from "react";
import { Marquee } from "../magicui/marquee";
import "../../styles/testimonials/ReviewCardApple.css";

interface Review {
  name: string;
  username: string;
  body: string;
  img: string;
}

const reviews: ReadonlyArray<Review> = [
  {
    name: "Carlos Pérez",
    username: "@carlosp",
    body: "El servicio fue rápido y seguro. Muy satisfecho.",
    img: "https://avatar.vercel.sh/carlosp",
  },
  {
    name: "María López",
    username: "@marial",
    body: "Excelente atención y entrega puntual del gas.",
    img: "https://avatar.vercel.sh/marial",
  },
  {
    name: "Juan Torres",
    username: "@juant",
    body: "Solgas siempre cumple con lo que promete.",
    img: "https://avatar.vercel.sh/juant",
  },
  {
    name: "Ana Fernández",
    username: "@anafe",
    body: "Muy buen servicio, lo recomiendo.",
    img: "https://avatar.vercel.sh/anafe",
  },
  {
    name: "Luis Gómez",
    username: "@luisg",
    body: "Atención rápida y personal amable.",
    img: "https://avatar.vercel.sh/luisg",
  },
  {
    name: "Patricia Ruiz",
    username: "@patriciar",
    body: "Siempre recibo mi pedido a tiempo. Gracias Solgas!",
    img: "https://avatar.vercel.sh/patriciar",
  },
];

const firstRow: ReadonlyArray<Review> = reviews.slice(0, reviews.length / 2);
const secondRow: ReadonlyArray<Review> = reviews.slice(reviews.length / 2);

interface ReviewCardProps extends Review {}

/**
 * Tarjeta individual de testimonio.
 */
const ReviewCard: FC<ReviewCardProps> = ({ img, name, username, body }) => {
  return (
    <figure className="review-card-apple">
      <div className="review-header">
        <img
          className="review-avatar"
          width={44}
          height={44}
          alt={name}
          src={img}
        />
        <div>
          <figcaption className="review-name">{name}</figcaption>
          <p className="review-username">{username}</p>
        </div>
      </div>
      <blockquote className="review-body">{body}</blockquote>
    </figure>
  );
};

/**
 * Sección de testimonios con animación de Marquee.
 */
const Testimonials: FC = () => {
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        sectionRef.current.classList.add("visible");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!subtitleRef.current) return;
      const rect = subtitleRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        subtitleRef.current.classList.add("benefits-subtitle", "visible");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section bg-background">
      <h2
        ref={subtitleRef}
        className="benefits-subtitle text-3xl font-bold text-center mb-8 text-gray-800 mt-20"
      >
        Testimonios de confianza
      </h2>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] gap-8 px-2">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] gap-8 px-2">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
