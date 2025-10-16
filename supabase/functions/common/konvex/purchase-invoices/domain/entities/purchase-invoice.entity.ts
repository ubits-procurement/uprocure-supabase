export interface PurchaseInvoiceItem {
  line: number;
  orderLine: number;
  quantity?: number;
  itemReceive: boolean;
  itemSubtype?: 'Purchase';
  itemType?: 'Service';
}

export interface PurchaseInvoiceItems {
  items: PurchaseInvoiceItem[];
}

export interface CustomForm {
  id: string;
}

export interface PurchaseInvoiceRequest {
  createdFrom: string;
  customForm?: CustomForm;
  subsidiary: string;
  trandate: string;
  entity: string;
  exchangeRate?: number;
  item: PurchaseInvoiceItems;
}

export interface PurchaseInvoiceResponse {
  id: string;
  type: string;
  status: string;
  tranId?: string;
  createdFrom?: string;
  subsidiary?: string;
  trandate?: string;
  entity?: string;
  exchangeRate?: number;
}
