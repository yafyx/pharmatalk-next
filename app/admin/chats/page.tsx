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
  const chats = await prisma.chatMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      sender: true,
      receiver: true,
    },
  });

  return chats;
}

export default async function AdminChats() {
  const chats = await getChats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Chat Monitoring</h1>
        <p className="text-gray-500">Monitor all chat conversations</p>
      </div>

      <Card className="bg-white shadow-sm">
        <ScrollArea className="h-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chats.map((chat) => (
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
                    {new Date(chat.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}
