
export function HomePage() {
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

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
                {/* Центр контента */}
                <div className="z-10">
                    <div className="glow-box text-center">
                        <div className="mb-4 text-md sm:text-lg font-mono text-primary whitespace-pre-line">
                            Love to code and play? <br /> Start playing with friends in any programming language!
                        </div>
                        <a
                            href="/session/create-session"
                            className="inline-block mt-4 px-6 py-2 bg-primary btn-animation"
                        >
                            Start
                        </a>
                    </div>
                </div>

                {/* Овальная орбита логотипов */}
                <div className="absolute w-full h-full z-0 pointer-events-none">
                    {logos.map((logo, index) => {
                        const angle = (index / logos.length) * 2 * Math.PI;
                        const radiusX = 45; // vw
                        const radiusY = 40; // vh
                        const centerX = 50; // % (центр)
                        const centerY = 50; // % (центр)

                        // Расчёт координат относительно центра экрана
                        const x = centerX + radiusX * Math.cos(angle);
                        const y = centerY + radiusY * Math.sin(angle);

                        return (
                            <img
                                key={index}
                                src={logo.src}
                                alt={logo.alt}
                                className="absolute transition-transform duration-300"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    width: 'clamp(35px, 5vw, 70px)',
                                    height: 'clamp(35px, 5vw, 70px)',
                                    objectFit: 'contain',
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default HomePage;
