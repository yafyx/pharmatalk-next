"use client";

import { Button } from "@/components/ui/button";
import { UserDialog } from "@/components/user/user-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Gagal memuat data pengguna");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = () => {
    setSelectedUser(undefined);
    setDialogOpen(true);
  };

  const handleSave = async (userData: Omit<User, "id"> & { id?: string }) => {
    try {
      const method = userData.id ? "PUT" : "POST";
      const response = await fetch("/api/user", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok)
        throw new Error(`Failed to ${userData.id ? "update" : "create"} user`);

      toast.success(
        `Berhasil ${userData.id ? "memperbarui" : "membuat"} pengguna`
      );
      setDialogOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(`Gagal ${userData.id ? "memperbarui" : "membuat"} pengguna`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/user?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      toast.success("Berhasil menghapus pengguna");
      setDeleteUserId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus pengguna");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-10 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Manajemen Pengguna
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola semua pengguna dalam sistem
            </p>
          </div>
          <Button
            onClick={handleCreate}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <PlusCircle size={18} />
            Tambah Pengguna
          </Button>
        </div>

        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Memuat data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Belum ada pengguna yang terdaftar
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: User) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          user.role === "ADMIN"
                            ? "bg-red-100 text-red-800"
                            : user.role === "DOKTER"
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "APOTEKER"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setDialogOpen(true);
                          }}
                          className="hover:bg-primary/10"
                        >
                          <Pencil size={16} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => user.id && setDeleteUserId(user.id)}
                          className="hover:bg-destructive/90"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <UserDialog
          user={selectedUser}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSave}
        />

        <Dialog
          open={!!deleteUserId}
          onOpenChange={() => setDeleteUserId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apakah Anda yakin?</DialogTitle>
              <DialogDescription>
                Tindakan ini tidak dapat dibatalkan. Data pengguna akan dihapus
                secara permanen.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteUserId(null)}>
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteUserId && handleDelete(deleteUserId)}
              >
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
