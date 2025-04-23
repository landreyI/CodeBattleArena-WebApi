import React from 'react';

interface Props {
    href: string;
    label: string
}

export function NavLink({ href, label }: Props) {
    return (
        <a href={href} className="nav-link text-green-400">
            {label}
        </a>
    );
}

export default NavLink;