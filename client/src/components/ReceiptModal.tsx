import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import type { CartItemType } from "./CartItem";

export interface Receipt {
  orderId: string;
  timestamp: string;
  total: number;
  items: CartItemType[];
  customerName: string;
  customerEmail: string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: Receipt | null;
}

export default function ReceiptModal({ isOpen, onClose, receipt }: ReceiptModalProps) {
  if (!receipt) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <DialogTitle className="text-2xl">Order Confirmed!</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono text-sm font-medium" data-testid="text-order-id">{receipt.orderId}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Customer Details</p>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">Name: <span className="text-foreground">{receipt.customerName}</span></p>
              <p className="text-muted-foreground">Email: <span className="text-foreground">{receipt.customerEmail}</span></p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm font-medium">Order Items</p>
            {receipt.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total Paid</span>
            <span data-testid="text-receipt-total">${receipt.total.toFixed(2)}</span>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            {new Date(receipt.timestamp).toLocaleString()}
          </div>

          <Button
            className="w-full"
            onClick={onClose}
            data-testid="button-close-receipt"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
