export type GetListByIdResponse = {
    id: string;
    name: string;
    closed: boolean;
    color: string | null;
    idBoard: string;
    pos: number;
  }
export type GetCardByIdResponse = {
  id: string;
  badges: any;
  checkItemStates: any[];
  closed: boolean;
  dueComplete: boolean;
  dateLastActivity: string; // Use string for ISO date format, convert to Date object as needed
  desc: string;
  descData: any ; // Simplified to a generic object
  due: null | string;
  dueReminder: null | number;
  email: null | string;
  idBoard: string;
  idChecklists: string[];
  idList: string;
  idMembers: string[];
  idMembersVoted: string[];
  idShort: number;
  idAttachmentCover: null | string;
  labels: any[]; // Assuming you don't need a detailed structure
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  shortUrl: string;
  start: null | string;
  subscribed: boolean;
  url: string;
  cover: any; // Generic object type for simplicity
  isTemplate: boolean;
  cardRole: null | string;
}
export interface TrelloDataQueryParams {
  listBacklogId: string;
  listActiveId: string;
  listDoneId: string;
  listOneName: string,
	listTwoName: string,
	listThreeName : string,
  idCardA: string;
  idCardB: string;
  idSticker: string;
}
export interface TrelloDataPathParameters {
  key: string;
  token: string;
  image?: string;
  left?: number;
  top?: number;
  zIndex?: number;
}