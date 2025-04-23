import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 py-4 text-center text-white">
            <p className="text-sm">&copy; 2025 CodeBattleArena</p>
            <div className="flex justify-center gap-6 mt-4">
                {/* Instagram */}
                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-400 transition-colors"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/800px-Instagram_logo_2022.svg.png"
                        alt="Instagram"
                        className="w-6 h-6"
                    />
                </a>

                {/* TikTok */}
                <a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg"
                        alt="TikTok"
                        className="w-6 h-6"
                    />
                </a>

                {/* Telegram */}
                <a
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 transition-colors"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                        alt="Telegram"
                        className="w-6 h-6"
                    />
                </a>

                {/* YouTube */}
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-colors"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                        alt="YouTube"
                        className="w-6 h-6"
                    />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
