"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: "user" | "other";
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  status?: string;
  lastMessage?: {
    content: string;
    timestamp: string;
    isOutgoing: boolean;
  } | null;
}

interface ApiUser {
  id: number;
  name: string;
  image?: string;
  role?: string;
}

export function Chat() {
  const { user } = useUser();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dokterApoteker, setDokterApoteker] = useState<Contact[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/chat/contacts");
        const data = await res.json();
        if (Array.isArray(data)) {
          setContacts(data);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }
    fetchContacts();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/chat?users=1");
        const data = await res.json();
        if (Array.isArray(data)) {
          const formattedUsers = data.map((user: ApiUser) => ({
            id: String(user.id),
            name: user.name,
            avatar: user.image || "/placeholder.svg",
            role: user.role,
          }));
          setDokterApoteker(formattedUsers);
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedContact || !user) return;

    async function fetchMessages() {
      if (!selectedContact) return;
      try {
        const res = await fetch(`/api/chat/messages/${selectedContact.id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000"}/api/ws`
    );

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "auth",
          userId: user.id,
          chatWith: selectedContact.id,
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "message") {
        setMessages((prev) => [
          ...prev,
          {
            id: msg.id,
            content: msg.content,
            sender: msg.senderId === selectedContact.id ? "other" : "user",
            timestamp: new Date(msg.createdAt).toLocaleTimeString(),
          },
        ]);

        setContacts((prev) => {
          const updatedContacts = [...prev];
          const contactIndex = updatedContacts.findIndex(
            (c) => c.id === selectedContact.id
          );
          if (contactIndex !== -1) {
            updatedContacts[contactIndex] = {
              ...updatedContacts[contactIndex],
              lastMessage: {
                content: msg.content,
                timestamp: new Date(msg.createdAt).toISOString(),
                isOutgoing: msg.senderId === user.id,
              },
            };
          }
          return updatedContacts;
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [selectedContact, user]);

  async function sendMessage() {
    if (!selectedContact || !inputValue.trim() || !user) return;

    const tempMessage = {
      id: Date.now(),
      content: inputValue,
      timestamp: new Date().toLocaleTimeString(),
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, tempMessage]);

    setContacts((prev) => {
      const updatedContacts = [...prev];
      const contactIndex = updatedContacts.findIndex(
        (c) => c.id === selectedContact.id
      );
      if (contactIndex !== -1) {
        updatedContacts[contactIndex] = {
          ...updatedContacts[contactIndex],
          lastMessage: {
            content: inputValue,
            timestamp: new Date().toISOString(),
            isOutgoing: true,
          },
        };
      }
      return updatedContacts;
    });

    setInputValue("");

    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: selectedContact.id,
          content: inputValue,
        }),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 7) {
      return date.toLocaleDateString();
    } else if (days > 0) {
      return `${days}d ago`;
    } else {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <Card className="w-full h-full">
      <div className="flex h-full">
        <div className="w-80 border-r hidden md:block">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Chat ({contacts.length})</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDialog(true)}
            >
              + Pesan Baru
            </Button>
          </div>
          <ScrollArea className="h-[calc(100%-69px)]">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex flex-col p-4 hover:bg-muted cursor-pointer ${
                  selectedContact?.id === contact.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center gap-3">
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
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium truncate">
                        {contact.name}
                      </p>
                      {contact.lastMessage && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(contact.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">
                        {contact.role}
                      </span>
                    </div>
                    {contact.lastMessage && (
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {contact.lastMessage.isOutgoing ? "You: " : ""}
                        {contact.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col h-full">
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.status}
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
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-end gap-2">
                        {message.sender === "other" && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedContact.avatar} />
                            <AvatarFallback>
                              {selectedContact.name
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
                  <Input
                    placeholder="Tulis pesan Anda..."
                    className="flex-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={sendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">
                  Selamat Datang di Percakapan
                </h3>
                <p className="text-muted-foreground">
                  Mulai konsultasi dengan dokter atau apoteker
                </p>
              </div>
              <Button onClick={() => setShowDialog(true)}>
                Mulai Percakapan Baru
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pilih Dokter atau Apoteker</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {dokterApoteker.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setSelectedContact(user);
                  setShowDialog(false);
                }}
                className="cursor-pointer hover:bg-muted p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
