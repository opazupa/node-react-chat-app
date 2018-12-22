export interface INotifyMessage {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}
