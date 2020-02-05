// @Injectable({
//   providedIn: 'root' // same as if provided in app.module, you get only 1 instance
// })
export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
