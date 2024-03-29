/**
 * IChat
 *
 * @export
 * @interface IChat
 */
export interface IChat {
  cleintId: string;
  userName: string;
  timestamp: Date;
  event?: string;
  message?: string;
}
