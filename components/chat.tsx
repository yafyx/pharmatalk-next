"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: "user" | "other";
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status?: string;
}

export function Chat() {
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Jane Doe",
      avatar: "/placeholder.svg",
      status: "Aktif 2 menit yang lalu",
    },
  ]);

  const [messages] = useState<Message[]>([
    { id: 1, content: "Halo!", timestamp: "10:04", sender: "other" },
  ]);

  return (
    <Card className="w-full h-full">
      <div className="flex h-full">
        <div className="w-80 border-r hidden md:block">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Chat ({contacts.length})</h2>
          </div>
          <ScrollArea className="h-[calc(100%-69px)]">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-4 hover:bg-muted cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{contact.name}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={contacts[0].avatar} />
                <AvatarFallback>
                  {contacts[0].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{contacts[0].name}</h3>
                <p className="text-sm text-muted-foreground">
                  {contacts[0].status}
                </p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-end gap-2">
                    {message.sender === "other" && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={contacts[0].avatar} />
                        <AvatarFallback>
                          {contacts[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-md ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input placeholder="Ketik pesan..." className="flex-1" />
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
