import { motion, useMotionValue, useSpring } from "framer-motion";

const logos = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', alt: 'C' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', alt: 'C++' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', alt: 'C#' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', alt: 'Java' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg', alt: 'Ruby' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', alt: 'Swift' },
];

function getRandomOffset(max = 20) {
    return (Math.random() - 0.5) * 2 * max;
}

function OrbitingLogo({ index, total, logo }: any) {
    const angle = (index / total) * 2 * Math.PI;
    const radiusX = 40;
    const radiusY = 35;
    const centerX = 50;
    const centerY = 50;

    const xPercent = centerX + radiusX * Math.cos(angle);
    const yPercent = centerY + radiusY * Math.sin(angle);

    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);

    const springX = useSpring(offsetX, { stiffness: 120, damping: 10 });
    const springY = useSpring(offsetY, { stiffness: 120, damping: 10 });

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                x: '-50%',
                y: '-50%',
                translateX: springX,
                translateY: springY,
            }}
            animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 0.97, 1.03, 1],
            }}
            transition={{
                rotate: { repeat: Infinity, duration: 4 + (index % 3), ease: 'easeInOut', delay: index * 0.2 },
                scale: { repeat: Infinity, duration: 4 + (index % 3), ease: 'easeInOut', delay: index * 0.2 },
            }}
            onMouseEnter={() => {
                offsetX.set(getRandomOffset());
                offsetY.set(getRandomOffset());
            }}
            onMouseLeave={() => {
                offsetX.set(0);
                offsetY.set(0);
            }}
        >
            <img
                src={logo.src}
                alt={logo.alt}
                style={{
                    width: 'clamp(35px, 5vw, 70px)',
                    height: 'clamp(35px, 5vw, 70px)',
                    objectFit: 'contain',
                    pointerEvents: 'auto',
                }}
            />
        </motion.div>
    );
}

function WigglingLogo({ logo, index }: { logo: { src: string; alt: string }, index: number }) {
    return (
        <motion.div
            className="flex flex-1 justify-center"
            animate={{
                rotate: [0, 3, -3, 0],
                scale: [1, 1.05, 0.97, 1.03, 1],
            }}
            transition={{
                rotate: {
                    repeat: Infinity,
                    duration: 4 + (index % 3),
                    ease: 'easeInOut',
                    delay: index * 0.2,
                },
                scale: {
                    repeat: Infinity,
                    duration: 4 + (index % 3),
                    ease: 'easeInOut',
                    delay: index * 0.2,
                },
            }}
        >
            <img src={logo.src} alt={logo.alt} className="h-10 object-contain" />
        </motion.div>
    );
}

export function HomePage() {
    return (
        <div className="w-full h-auto md:h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Верхняя полоса логотипов (мобилка) */}
            <div className="md:hidden w-full">
                <div className="flex w-full">
                    {logos.slice(0, Math.ceil(logos.length / 2)).map((logo, idx) => (
                        <WigglingLogo key={idx} logo={logo} index={idx} />
                    ))}
                </div>
            </div>

            {/* Центрированный контент */}
            <div className="glow-box z-10 text-center my-4">
                <div className="text-primary font-semibold mb-4 text-md sm:text-lg whitespace-pre-line">
                    Love to code and play? <br /> Start playing with friends in any programming language!
                </div>
                <a
                    href="/session/create-session"
                    className="inline-block font-semibold mt-4 px-6 py-2 bg-primary btn-animation rounded-lg shadow-md"
                >
                    Start
                </a>
            </div>

            {/* Нижняя полоса логотипов (мобилка) */}
            <div className="md:hidden w-full">
                <div className="flex w-full">
                    {logos.slice(Math.ceil(logos.length / 2)).map((logo, idx) => (
                        <WigglingLogo key={idx} logo={logo} index={idx} />
                    ))}
                </div>
            </div>

            {/* Орбитальные иконки (только на десктопе) */}
            <div className="hidden md:block absolute w-full h-full z-0 pointer-events-none">
                {logos.map((logo, index) => (
                    <OrbitingLogo key={index} index={index} total={logos.length} logo={logo} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
