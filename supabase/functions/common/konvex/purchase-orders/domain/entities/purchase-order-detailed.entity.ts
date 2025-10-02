export interface PurchaseOrderDetailed {
  status: number;
  software: string;
  data: Data;
}

export interface Data {
  links: Link[];
  accountingBookDetail: AccountingBookDetail;
  appliedRules: AppliedRules;
  approvalStatus: ApprovalStatus;
  billAddress: string;
  billingAddress: IngAddress;
  billingAddress_text: string;
  createdDate: Date;
  currency: Currency;
  custbody2: boolean;
  custbody_ac_aplica_evento: boolean;
  custbody_ac_excepcion: CustbodyACExcepcion;
  custbody_ac_fechainiciobis: Date;
  custbody_acs_ad_rfc: CustbodyACExcepcion;
  custbody_acs_cstm_approvers: CustbodyACExcepcion;
  custbody_acs_cstm_sence_related_trans: CustbodyACExcepcion;
  custbody_acs_dollar_total: number;
  custbody_acs_email_employee: string;
  custbody_acs_email_vendor: string;
  custbody_acs_employee_job: string;
  custbody_acs_objcont: string;
  custbody_ad_cl_saved_debit: boolean;
  custbody_ad_cstm_total_in_letters: string;
  custbody_ad_gl_customform: string;
  custbody_ad_gl_debit_memo_saved: boolean;
  custbody_ad_mx_import_related_bill: CustbodyACExcepcion;
  custbody_co_dif_montos: boolean;
  custbody_co_isinternational: boolean;
  custbody_co_issupportdoc: boolean;
  custbody_co_override_thirdparty: boolean;
  custbody_co_related_records: CustbodyACExcepcion;
  custbody_co_succescertification: boolean;
  custbody_edoc_gen_trans_pdf: boolean;
  custbody_ei_ds_txn_identifier: boolean;
  custbody_mx_tax_effect_vendor_cfdi: boolean;
  custbody_psg_ei_edoc_recipient: CustbodyACExcepcion;
  custbody_psg_ei_inb_txn_po_valid_bypas: boolean;
  custbody_ste_alltaxregistrations: string;
  custbody_ste_rcs_applicable: boolean;
  custbody_ste_ship_vat_from_country: string;
  custbody_ste_transaction_type: Currency;
  custbody_ste_use_tax: boolean;
  custbodyac_category_proveedor: string;
  custbodycustbody_ac_tipotransoc: Currency;
  custbodycustbody_acs_pagotarjeta: boolean;
  custbodycustbody_acs_purchase_type: Currency;
  customForm: ApprovalStatus;
  department: Currency;
  dueDate: Date;
  email: string;
  employee: Currency;
  entity: Currency;
  entityTaxRegNum: string;
  exchangeRate: number;
  expense: AccountingBookDetail;
  id: string;
  item: DataItem;
  lastModifiedDate: Date;
  location: Currency;
  nextApprover: Currency;
  nexus: Currency;
  orderStatus: ApprovalStatus;
  prevDate: Date;
  shipAddress: string;
  shipDate: Date;
  shipIsResidential: boolean;
  shipOverride: boolean;
  shippingAddress: IngAddress;
  shippingAddress_text: string;
  status: ApprovalStatus;
  subsidiary: Currency;
  subsidiaryTaxRegNum: string;
  subtotal: number;
  taxDetails: TaxDetails;
  taxDetailsOverride: boolean;
  taxPointDate: Date;
  taxPointDateOverride: boolean;
  taxRegOverride: boolean;
  taxTotal: number;
  terms: Currency;
  toBeEmailed: boolean;
  toBeFaxed: boolean;
  toBePrinted: boolean;
  total: number;
  totalAfterTaxes: number;
  tranDate: Date;
  tranId: string;
  transactionNumber: string;
}

export interface AccountingBookDetail {
  links: Link[];
  items: AccountingBookDetailItem[];
  totalResults: number;
}

export interface AccountingBookDetailItem {
  links: Link[];
  accountingBook: Currency;
  currency: Currency;
  exchangeRate: number;
}

export interface Currency {
  links: Link[];
  id: string;
  refName: string;
}

export interface Link {
  rel: Rel;
  href: string;
}

export enum Rel {
  Self = "self",
}

export interface AppliedRules {
  links: Link[];
  items: AppliedRulesItem[];
  totalResults: number;
}

export interface AppliedRulesItem {
  links: any[];
  creationDate: Date;
  details: string;
  externalLogId: number;
  id: number;
  ruleType: string;
  ruleTypeTranslation: string;
  transactionVersion: number;
}

export interface ApprovalStatus {
  id: string;
  refName: string;
}

export interface IngAddress {
  links: Link[];
  addr1?: string;
  addressee: string;
  addrText: string;
  city: string;
  country: ApprovalStatus;
  custrecord_av_after_placeholder: string;
  custrecord_av_before_placeholder: string;
  custrecord_av_valid_status: Currency;
  override: boolean;
  state?: string;
  custrecord_province?: string;
  custrecord_streetname?: string;
}

export interface CustbodyACExcepcion {
  links: Link[];
  count: number;
  hasMore: boolean;
  items: any[];
  offset: number;
  totalResults: number;
}

export interface DataItem {
  links: Link[];
  items: ItemItem[];
  totalResults: number;
}

export interface ItemItem {
  links: Link[];
  amount: number;
  billVarianceStatus: ApprovalStatus;
  custcol_15529_eft_enabled: boolean;
  custcol_2663_isperson: boolean;
  custcol_acs_cstm_related_budget: string;
  custcol_acs_cstm_remaining_budget: number;
  custcol_acs_cstm_spent_budget: number;
  custcol_acs_cstm_total_month_budget: number;
  custcol_acs_cstm_total_year_budget: number;
  custcol_fte_i_line_sequence: number;
  department: Currency;
  description: string;
  expectedReceiptDate: Date;
  isBillable: boolean;
  isClosed: boolean;
  isOpen: boolean;
  item: Currency;
  itemSubtype: ApprovalStatus;
  itemType: ApprovalStatus;
  line: number;
  linked: boolean;
  linkedOrder: CustbodyACExcepcion;
  marginal: boolean;
  matchBillToReceipt: boolean;
  printItems: boolean;
  quantity: number;
  quantityBilled: number;
  quantityReceived: number;
  rate: number;
  taxAmount: number;
  taxDetailsReference: string;
  units: string;
}

export interface TaxDetails {
  links: Link[];
  items: TaxDetailsItem[];
  totalResults: number;
}

export interface TaxDetailsItem {
  links: any[];
  lineName: LineName;
  lineType: LineType;
  netAmount: number;
  taxAmount: number;
  taxBasis: number;
  taxCode: Currency;
  taxDetailsReference: ApprovalStatus;
  taxRate: number;
  taxType: string;
}

export enum LineName {
  AdmSoftwareComoServicioSaaS = "Adm Software como servicio (SaaS)",
}

export enum LineType {
  Artículo = "Artículo",
}
