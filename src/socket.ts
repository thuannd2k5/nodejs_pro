// socket.ts
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

// Hàm setupSocket để thiết lập socket server
export function setupSocket(io: Server) {
    const prisma = new PrismaClient();

    io.on('connection', (socket) => {
        console.log('⚡ Client connected:', socket.id);

        // Lắng nghe sự kiện sendMessage từ client
        socket.on('sendMessage', async (msg) => {
            try {
                // Lưu tin nhắn vào database
                const saved = await prisma.message.create({
                    data: {
                        fromId: msg.fromId,
                        toId: msg.toId,
                        content: msg.content,
                        role: msg.role || "user",
                    },
                });

                // Phát lại tin nhắn tới tất cả client
                io.emit('newMessage', saved);
            } catch (error) {
                console.error('❌ Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('❌ Client disconnected:', socket.id);
        });
    });
}
