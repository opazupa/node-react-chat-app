/**
 * INotifyMessage
 *
 * @export
 * @interface INotifyMessage
 */
export interface INotifyMessage {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}
