"use client"; // Agrega esta línea al inicio del archivo

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Requisición', href: '/dashboard/form', icon: PencilSquareIcon },
  { name: 'Tabla', href: '/dashboard/grid', icon: Squares2X2Icon }, // New link for the form
  { name: 'Mejoras', href: '/dashboard/mejoras', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href; // Check if the current pathname matches the link's href

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium 
              ${isActive ? 'bg-green-100 text-green-600' : 'bg-gray-50 hover:bg-green-100 hover:text-green-600'}
              md:flex-none md:justify-start md:p-2 md:px-3`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}