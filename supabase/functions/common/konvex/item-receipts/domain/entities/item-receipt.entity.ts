export interface ItemReceiptItem {
  line: number;
  orderLine: number;
  quantity?: number;
  itemReceive: boolean;
  itemSubtype?: 'Purchase';
  itemType?: 'Service';
}

export interface ItemReceiptItems {
  items: ItemReceiptItem[];
}

export interface CustomForm {
  id: string;
}

export interface ItemReceiptRequest {
  createdFrom: string;
  customForm?: CustomForm;
  subsidiary: string;
  trandate: string;
  entity: string;
  exchangeRate?: number;
  item: ItemReceiptItems;
}

export interface ItemReceiptResponse {
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
