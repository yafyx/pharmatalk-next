import { ChatMessage } from "@prisma/client";

export const connections = new Map<string, Set<(data: ChatMessage) => void>>();
