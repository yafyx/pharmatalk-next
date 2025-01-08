import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

async function getChats() {
  try {
    const allChats = await prisma.chatMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        sender: {
          select: {
            name: true,
            role: true,
          },
        },
        receiver: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    const chats = allChats
      .filter(
        (chat) =>
          chat.sender && chat.receiver && chat.sender.name && chat.receiver.name
      )
      .slice(0, 100);

    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

export default async function AdminChats() {
  const chats = await getChats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Monitoring Percakapan</h1>
        <p className="text-gray-500">Pantau semua percakapan</p>
      </div>

      <Card className="bg-white shadow-sm">
        <ScrollArea className="h-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dari</TableHead>
                <TableHead>Ke</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead>Waktu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{chat.sender.name}</p>
                        <p className="text-xs text-gray-500">
                          {chat.sender.role}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{chat.receiver.name}</p>
                        <p className="text-xs text-gray-500">
                          {chat.receiver.role}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{chat.content}</p>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(chat.createdAt).toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Tidak ada percakapan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}
