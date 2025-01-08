import { Card } from "@/components/ui/card";
import { Users, MessageSquare, Newspaper, Activity } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [userCount, chatCount, articleCount] = await Promise.all([
    prisma.user.count(),
    prisma.chatMessage.count(),
    prisma.artikel.count(),
  ]);

  const recentChats = await prisma.chatMessage.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      sender: {
        select: {
          name: true,
          image: true,
        },
      },
      receiver: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    userCount,
    chatCount,
    articleCount,
    recentChats,
  };
}

export default async function AdminDashboard() {
  const { userCount, chatCount, articleCount, recentChats } = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Selamat datang di panel admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Pengguna
              </p>
              <h3 className="text-2xl font-bold">{userCount}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Percakapan
              </p>
              <h3 className="text-2xl font-bold">{chatCount}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Newspaper className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Artikel</p>
              <h3 className="text-2xl font-bold">{articleCount}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Percakapan Terbaru</h2>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {recentChats.map((chat) => (
            <div key={chat.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full">
                {chat.sender?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={chat.sender.image}
                    alt={chat.sender.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">{chat.sender?.name}</span>
                  <span className="text-gray-500"> ke </span>
                  <span className="font-medium">{chat.receiver?.name}</span>
                </p>
                <p className="text-sm text-gray-500">{chat.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(chat.createdAt).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
