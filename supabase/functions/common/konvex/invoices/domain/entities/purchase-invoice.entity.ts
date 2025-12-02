interface InvoiceItem {
  // Otras propiedades de cada item que no son itemUnitPrice ni itemFxAmount
  [key: string]: any; // Se puede refinar si conoces más campos

  amount: number;
  rate: number;
}

interface FormattedItems {
  [key: string]: any; // Otras propiedades heredadas de receipt.item
  items: InvoiceItem[];
}

export interface PurchaseInvoiceRequest {
  tranDate: string;
  tranId: string;
  customForm: string;
  createdFrom: string | number;
  currency: string | number;
  entity: string | number;
  subsidiary: string | number;
  number: string;
  dueDate: string;
  netsuite: {
    location?: string | number;
    custbody_ubits_grni: {
      id: string | number;
      refName: string;
    };
    cseg_co_thirdparty: {
      id?: string | number;
      refName?: string;
    };
    custbody_bea_credit_cards_pay?: string;
    custbodycustbody_acs_pagotarjeta?: boolean;
    custbody_9997_is_for_ep_eft?: boolean;
    department: string;
  };
  item: FormattedItems;
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
