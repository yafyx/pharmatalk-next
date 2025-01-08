import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Home, Users, MessageSquare, Newspaper, BarChart } from "lucide-react";

const sidebarLinks = [
  { name: "Beranda", href: "/admin", icon: Home },
  { name: "Pengguna", href: "/admin/users", icon: Users },
  { name: "Percakapan", href: "/admin/chats", icon: MessageSquare },
  { name: "Artikel", href: "/admin/articles", icon: Newspaper },
  { name: "Analitik", href: "/admin/analytics", icon: BarChart },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="flex h-screen">
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="h-full px-3 py-4 flex flex-col">
            <div className="flex items-center justify-between mb-6 px-3">
              <h1 className="text-xl font-bold">Panel Admin</h1>
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
            <nav className="space-y-1 flex-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <link.icon className="w-5 h-5 mr-3" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
