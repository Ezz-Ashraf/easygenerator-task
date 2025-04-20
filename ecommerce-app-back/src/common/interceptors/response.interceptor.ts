// src/common/interceptors/response.interceptor.ts

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          success: true,
          timestamp: new Date().toISOString(),
          data,
        })),
      );
    }
  }
  