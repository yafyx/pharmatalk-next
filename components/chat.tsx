"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronLeft, Pill, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: "user" | "other";
  pending?: boolean;
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

interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  desc?: string | null;
  dosage?: string | null;
}

export function Chat() {
  const { user } = useUser();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dokterApoteker, setDokterApoteker] = useState<Contact[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showContactList, setShowContactList] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [showMedicineDialog, setShowMedicineDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    setMessages([]);
    setIsLoading(true);

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
      } finally {
        setIsLoading(false);
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
      pending: true,
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
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, pending: false } : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    }
  }

  const handleSendMessage = async () => {
    if (!selectedContact || !inputValue.trim() || !user) return;
    await sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  const searchMedicines = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`/api/obat?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMedicines(data.data || []);
    } catch (error) {
      console.error("Error searching medicines:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMedicineSelect = async (medicine: Medicine) => {
    const medicineMessage = `🏥 *${medicine.name}*\n\n${
      medicine.category
    }\nHarga: Rp ${medicine.price.toLocaleString()}\n${
      medicine.desc || ""
    }\n\nDosis: ${medicine.dosage || "Sesuai petunjuk dokter"}`;
    setInputValue(medicineMessage);
    setShowMedicineDialog(false);
  };

  return (
    <Card className="w-full h-full">
      <div className="flex h-full">
        <div
          className={`w-full md:w-80 border-r ${
            !showContactList ? "hidden" : "block"
          } md:block`}
        >
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
                onClick={() => {
                  setSelectedContact(contact);
                  setShowContactList(false);
                }}
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

        <div
          className={`flex-1 flex flex-col h-full relative ${
            showContactList ? "hidden" : "block"
          } md:block`}
        >
          {selectedContact ? (
            <>
              <div className="absolute top-0 left-0 right-0 z-10 bg-background border-b">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden mr-2"
                      onClick={() => setShowContactList(true)}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
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
              </div>

              <ScrollArea
                className={`flex-1 p-4 pt-[85px] pb-[80px] ${
                  isLoading ? "flex items-center justify-center" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-32 h-32 relative">
                      <Image
                        src="/assets/illust/cat.gif"
                        alt="Loading..."
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <p className="text-muted-foreground text-sm animate-pulse">
                      Memuat pesan...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex transition-all duration-200 ease-in-out",
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start",
                          message.pending && "opacity-70"
                        )}
                      >
                        <div className="flex items-end gap-2 max-w-[80%]">
                          {message.sender === "other" && (
                            <Avatar className="w-8 h-8 shrink-0">
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
                            className={cn(
                              "rounded-2xl px-4 py-2 shadow-sm",
                              message.sender === "user"
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-100 dark:bg-gray-800 rounded-bl-none",
                              "transform transition-all duration-200 hover:scale-[1.02]"
                            )}
                          >
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.content}
                              {message.pending && (
                                <span className="ml-2 inline-block">
                                  <span className="animate-pulse">...</span>
                                </span>
                              )}
                            </p>
                            <p
                              className={cn(
                                "text-xs mt-1",
                                message.sender === "user"
                                  ? "text-white/70"
                                  : "text-gray-500 dark:text-gray-400"
                              )}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                          {message.sender === "user" && (
                            <Avatar className="w-8 h-8 shrink-0">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>ME</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Tulis pesan Anda..."
                    className="flex-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isLoading}
                    onClick={() => setShowMedicineDialog(true)}
                  >
                    <Pill className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-col items-center justify-center h-full gap-4 md:block hidden">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">Selamat Datang</h3>
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

      <Dialog open={showMedicineDialog} onOpenChange={setShowMedicineDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cari Obat</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Cari obat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchMedicines(searchQuery);
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => searchMedicines(searchQuery)}
                disabled={isSearching}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            {isSearching ? (
              <p className="text-muted-foreground">Mencari...</p>
            ) : (
              <div className="space-y-2">
                {medicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    onClick={() => handleMedicineSelect(medicine)}
                    className="cursor-pointer hover:bg-muted p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">{medicine.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {medicine.category}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Rp {medicine.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
