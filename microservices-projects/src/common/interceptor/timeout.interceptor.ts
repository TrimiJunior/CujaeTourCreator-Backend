import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { timeout } from 'rxjs/operators';
@Injectable()
export class TimeOutInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(timeout(120000));
    }
    
}